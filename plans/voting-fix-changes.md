# Voting System Fix - Changes Plan

**Status**: To Be Implemented

---

## Problem

Ideas with 100+ votes all show **100% progress**, making it impossible to distinguish between them.

---

## Solution

Replace the fixed 100-vote target with a relative progress percentage based on the highest vote count in the current idea dataset.

The maximum vote count must be calculated once per response and passed into the resource layer. Do **not** call `Idea::max('votes_count')` inside each resource item, because list pages serialize many ideas and that would add repeated aggregate queries.

---

## Implementation Approach

1. Add a reusable helper method on the idea resources to calculate progress from a provided max vote count.
2. Pass the max vote count from controllers into resource collections using `additional()` or resource context.
3. Keep single-item responses safe by calculating the max once in the controller before creating the resource.
4. Preserve the existing API fields: `progress`, `target_votes`, and `funded`.
5. Treat `target_votes` as the current comparison maximum, not a fixed funding target.

---

## Files to Change

### 1. `app/Http/Resources/App/IdeaResource.php`

Add a max-vote context property and setter so the resource does not query the database per item.

**Add to class:**

```php
private int $maxVotes = 0;

public function withMaxVotes(int $maxVotes): self
{
    $this->maxVotes = $maxVotes;

    return $this;
}

private function progressFor(int $currentVotes): int
{
    if ($this->is_winner) {
        return 100;
    }

    if ($this->maxVotes <= 0) {
        return 0;
    }

    return (int) round(($currentVotes / $this->maxVotes) * 100);
}
```

**Update `toArray()`:**

```php
public function toArray(Request $request): array
{
    $locale = app()->getLocale();
    $countryName = $this->country ? $this->country->{'name_'.$locale} : null;
    $votesCount = (int) ($this->votes_count ?? $this->votes()->count());

    return [
        'id' => $this->id,
        'title' => $this->title,
        'description' => $this->description,
        'category' => $this->category?->{'name_'.$locale},
        'category_id' => $this->category_id,
        'category_icon' => $this->category?->icon,
        'country' => $countryName,
        'country_code' => $this->country?->code,
        'city' => $this->city,
        'image' => $this->image,
        'marketing_channel' => $this->marketing_channel,
        'target_audience' => $this->target_audience,
        'implementation_time' => $this->implementation_time,
        'votes_count' => $votesCount,
        'comments_count' => (int) ($this->comments_count ?? $this->comments()->count()),
        'user' => new PublicUserResource($this->whenLoaded('user')),
        'user_id' => $this->user_id,
        'status' => $this->is_winner ? 'winner' : $this->status,
        'rejection_reason' => $this->rejection_reason,
        'is_winner' => $this->is_winner,
        'created_at' => $this->created_at->format('d M Y'),
        'date' => $this->created_at->translatedFormat('d F Y'),
        'progress' => $this->progressFor($votesCount),
        'target_votes' => $this->maxVotes,
        'funded' => $this->is_winner,
    ];
}
```

---

### 2. `app/Http/Resources/App/CompactIdeaResource.php`

Apply the same pattern as `IdeaResource`, but keep the existing compact payload.

**Add to class:**

```php
private int $maxVotes = 0;

public function withMaxVotes(int $maxVotes): self
{
    $this->maxVotes = $maxVotes;

    return $this;
}

private function progressFor(int $currentVotes): int
{
    if ($this->is_winner) {
        return 100;
    }

    if ($this->maxVotes <= 0) {
        return 0;
    }

    return (int) round(($currentVotes / $this->maxVotes) * 100);
}
```

**Update `toArray()`:**

```php
public function toArray(Request $request): array
{
    $locale = app()->getLocale();
    $votesCount = (int) ($this->votes_count ?? 0);

    return [
        'id' => $this->id,
        'title' => $this->title,
        'category' => $this->category?->{'name_'.$locale},
        'category_id' => $this->category_id,
        'category_icon' => $this->category?->icon,
        'country' => $this->country ? $this->country->{'name_'.$locale} : null,
        'country_code' => $this->country?->code,
        'city' => $this->city,
        'image' => $this->image,
        'votes_count' => $votesCount,
        'comments_count' => (int) ($this->comments_count ?? 0),
        'user' => new PublicUserResource($this->whenLoaded('user')),
        'user_id' => $this->user_id,
        'status' => $this->is_winner ? 'winner' : $this->status,
        'is_winner' => $this->is_winner,
        'created_at' => $this->created_at->format('d M Y'),
        'date' => $this->created_at->translatedFormat('d F Y'),
        'progress' => $this->progressFor($votesCount),
        'target_votes' => $this->maxVotes,
        'funded' => $this->is_winner,
    ];
}
```

---

### 3. Controllers Returning Idea Collections

Update controllers that return idea collections so they calculate the max vote count once.

Known collection usages:

- `app/Http/Controllers/App/HomeController.php`
- `app/Http/Controllers/App/IdeaController.php`
- `app/Http/Controllers/App/ArchiveController.php`
- `app/Http/Controllers/Admin/IdeaController.php`

Use the same filtered query context as the list when possible. If the page is meant to compare against all public ideas, calculate the max from that public scope. If it is meant to compare only within the current filtered list, calculate the max from the filtered query before pagination.

**Preferred pattern:**

```php
$query = Idea::query()
    // existing filters, scopes, eager loading, and sorting
;

$maxVotes = (clone $query)->max('votes_count') ?? 0;

$ideas = $query->paginate();

'ideas' => IdeaResource::collection($ideas)->through(
    fn (IdeaResource $resource) => $resource->withMaxVotes((int) $maxVotes),
),
```

If `through()` is not suitable for the resource collection shape used in a controller, use a small custom collection helper or map the paginator collection before passing it into the resource. The key requirement is that `max('votes_count')` runs once per response, not once per idea.

---

### 4. Single Idea Response

For `app/Http/Controllers/App/IdeaController.php` single idea responses, calculate max votes once and pass it to the resource.

```php
$maxVotes = Idea::max('votes_count') ?? 0;

'idea' => (new IdeaResource($idea))->withMaxVotes((int) $maxVotes),
```

---

## What Changes

### Before

```text
Idea A: 150 votes -> progress: 100%, target_votes: 100
Idea B: 120 votes -> progress: 100%, target_votes: 100
Idea C: 95 votes  -> progress: 95%,  target_votes: 100
```

### After

```text
Idea A: 150 votes -> progress: 100%, target_votes: 150
Idea B: 120 votes -> progress: 80%,  target_votes: 150
Idea C: 95 votes  -> progress: 63%,  target_votes: 150
```

---

## How It Works

1. Controller calculates `maxVotes` once from the relevant idea query.
2. Each resource receives that max vote count.
3. Each idea calculates `progress` as `(currentVotes / maxVotes) * 100`.
4. Winners always show `100`.
5. If there are no votes, progress is `0`.

---

## Benefits

- Ideas with 100+ votes show different percentages.
- Ranking becomes visible in progress bars.
- No database changes are needed.
- Existing API fields remain available.
- Avoids repeated max-vote queries during collection serialization.



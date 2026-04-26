# Afkar100 Milestone 1 Plan
## Infrastructure, Authentication, Models, Factories, and Seeders

**Source:** `plans/afkar100_project_plan.md`  
**Scope:** Milestone 1 only  
**Duration:** Week 1 to Week 2

---

## Milestone

A complete authentication system, production-ready database structure, and a prepared development environment.

---

## 1. Project Setup

- [x] Create a new Laravel 13 project with Starter Kit (Fortify + Inertia + React)
- [x] Install and configure Inertia.js 3 with React
- [x] Configure TypeScript for the React side
- [x] Configure the MySQL database
- [x] Configure Laravel Sanctum for authentication
- [x] Add `CheckRole` middleware to verify user role (`admin` / `user`)
- [x] Configure Laravel Queue
- [x] Configure Laravel Scheduler
- [x] Configure email environment for development (`SMTP` / `Mailtrap`)
- [x] Configure Laravel Storage for file and image uploads
- [x] Configure `.env` environment variables
- [x] Initialize the Git repository and branch structure (`main` / `develop` / `feature`)

---

## 2. `resources/js` Structure

Each domain should remain isolated:

- Admin pages inside the admin directory
- App pages inside the app directory
- Shared code inside `shared/`

### Inertia Rendering Convention

```php
return Inertia::render('app/pages/Home');
return Inertia::render('admin/pages/Dashboard');
```

### Fortify View Convention

```php
Fortify::loginView(fn () => Inertia::render('admin/pages/auth/Login'));
Fortify::loginView(fn () => Inertia::render('app/pages/auth/Login'));
```

---

## 3. Database Migrations

- [x] Migration: `users`
- [x] Migration: `ideas`
- [x] Migration: `votes`
- [x] Migration: `comments`
- [x] Migration: `comment_likes`
- [x] Migration: `user_follows`
- [x] Migration: `idea_follows`
- [x] Migration: `notifications`
- [x] Migration: `sponsors`
- [x] Migration: `prize_records`
- [x] Add indexes on frequently queried fields
- [x] Add unique constraints:
  `(idea_id, voter_email)` on `votes`
  `(follower_id, following_id)` on `user_follows`
  `(user_id, idea_id)` on `idea_follows`

---

## 4. Authentication

### 4.1 Admin Authentication

- [ ] Move `pages/auth/login.tsx` to `admin/pages/auth/Login.tsx`
- [ ] Move `pages/auth/forgot-password.tsx` to `admin/pages/auth/ForgotPassword.tsx`
- [ ] Move `pages/auth/reset-password.tsx` to `admin/pages/auth/ResetPassword.tsx`
- [ ] Move `pages/auth/confirm-password.tsx` to `admin/pages/auth/ConfirmPassword.tsx`
- [ ] Move `pages/auth/two-factor-challenge.tsx` to `admin/pages/auth/TwoFactorChallenge.tsx`
- [ ] Move `pages/auth/verify-email.tsx` to `admin/pages/auth/VerifyEmail.tsx`
- [ ] Update Fortify view bindings in `FortifyServiceProvider.php` to use the admin auth pages

### 4.2 App Authentication

- [ ] Create `app/pages/auth/Login.tsx` with the site design
- [ ] Create `app/pages/auth/Register.tsx` with required fields: `phone`, `country`, `nationality`
- [ ] Create `app/pages/auth/VerifyEmail.tsx`
- [ ] Create `app/pages/auth/ForgotPassword.tsx`
- [ ] Create `app/pages/auth/ResetPassword.tsx`
- [ ] Add dedicated guest routes in `routes/web.php` for app auth pages using direct Inertia rendering
- [ ] Verify that Fortify accepts POST requests from the app auth pages and redirects correctly after login and registration

### 4.3 Fortify Customization for App

- [ ] Update `app/Actions/Fortify/CreateNewUser.php` to store site-specific fields: `phone`, `country`, `nationality`, and `role = user`
- [ ] Update `app/Actions/Fortify/UpdateUserProfileInformation.php` to support the new fields
- [ ] Add full validation in `CreateNewUser.php` for phone format, country, and unique email
- [ ] Send bilingual account verification email after registration (`ar` / `en`)
- [ ] Add rate limiting for login attempts

### 4.4 Middleware and Guards

- [ ] Create `CheckRole` middleware to validate `user->role === 'admin'`
- [ ] Register the middleware in `bootstrap/app.php`
- [ ] Apply `middleware(['auth', 'role:admin'])` to all `/admin` routes
- [ ] Apply `verified` middleware before allowing idea submission

### 4.5 Initial Admin Setup

- [ ] Add `AdminSeeder` to create a fixed admin account with `role = admin`
- [ ] Add a custom Artisan command: `php artisan admin:create`

---

## 5. Models and Relationships

- [x] Model: `User` with `hasMany` relationships for ideas, comments, follows, and notifications
- [x] Model: `Idea` with `belongsTo` and `hasMany` relationships
- [x] Model: `Vote` with a scope to prevent duplicate votes
- [x] Model: `Comment` with `hasMany` relationship for likes
- [x] Model: `CommentLike`
- [x] Model: `UserFollow`
- [x] Model: `IdeaFollow`
- [x] Model: `Notification`
- [x] Model: `Sponsor`
- [x] Model: `PrizeRecord`

---

## 6. Factories

### 6.1 `UserFactory`

- [x] Realistic Arabic first and last name fields
- [x] Unique email per user
- [x] Random phone number with country code
- [x] Random Arab country values
- [x] State: `admin()`
- [x] State: `unverified()`

### 6.2 `IdeaFactory`

- [x] Realistic Arabic idea titles
- [x] Detailed descriptions
- [x] Multiple categories: business, technology, services, food, education
- [x] Random `submission_day` from `0` to `6`
- [x] Auto-generated `week_number` and `year`
- [x] State: `pending()`
- [x] State: `approved()`
- [x] State: `rejected()`
- [x] State: `winner()`
- [x] State: `withImage()`

### 6.3 `VoteFactory`

- [x] Unique `voter_email` per idea
- [x] Filled `otp_verified_at`
- [x] Random `ip_address`

### 6.4 `CommentFactory`

- [x] Realistic Arabic comments
- [x] Random `likes_count` between `0` and `50`

### 6.5 `SponsorFactory`

- [x] Realistic Arabic company names
- [x] `day_of_week` from `0` to `6`
- [x] `contract_start` at the beginning of the current year
- [x] `contract_end` at the end of the current year
- [x] State: `active()`
- [x] State: `inactive()`

### 6.6 `NotificationFactory`

- [x] Covers all five notification types
- [x] State: `unread()`
- [x] State: `read()`

### 6.7 Other Factories

- [x] `UserFollowFactory`
- [x] `IdeaFollowFactory`
- [x] `PrizeRecordFactory`
- [x] `PrizeRecordFactory` state: `pending()`
- [x] `PrizeRecordFactory` state: `delivered()`

---

## 7. Seeders

### Seeder Execution Order

```text
AdminSeeder -> SponsorSeeder -> UserSeeder -> IdeaSeeder
-> VoteSeeder -> CommentSeeder -> FollowSeeder
-> PrizeRecordSeeder -> NotificationSeeder
```

### 7.1 `DatabaseSeeder`

- [x] Organize and call all seeders in the correct order

### 7.2 `AdminSeeder`

- [x] Create a fixed admin account: `admin@afkar100.com` / `password`
- [x] Create a demo admin account for sponsor demos

### 7.3 `SponsorSeeder`

- [x] Create 7 sponsors, one for each day of the week
- [x] Use realistic Arabic company names or a professional placeholder
- [x] Link each sponsor to its day using `day_of_week`

### 7.4 `UserSeeder`

- [x] Create 50 demo users using `UserFactory`
- [x] Create users across multiple countries: Jordan, Saudi Arabia, Egypt, UAE, Kuwait

### 7.5 `IdeaSeeder`

- [x] Create 7 approved ideas for the current week, one per day
- [x] Create 49 approved ideas for the previous seven weeks for archive data
- [x] Create 7 winning ideas, one winner for each day of the previous week
- [x] Create 10 pending ideas for the admin review dashboard
- [x] Create 5 rejected ideas with rejection reasons

### 7.6 `VoteSeeder`

- [x] Create demo votes for current ideas, between `50` and `500` votes per idea
- [x] Update `votes_count` on ideas after creation
- [x] Ensure uniqueness of `(idea_id + voter_email)`

### 7.7 `CommentSeeder`

- [x] Create `3` to `8` comments for each approved idea
- [x] Use realistic Arabic comments with practical feedback
- [x] Create random likes on comments using `CommentLike`

### 7.8 `FollowSeeder`

- [x] Create random user follow relationships
- [x] Create random idea follow relationships

### 7.9 `PrizeRecordSeeder`

- [x] Create a prize record for each winning idea and link it to the matching sponsor
- [x] Set half of the records to `delivered` and half to `pending`

### 7.10 `NotificationSeeder`

- [x] Create demo notifications of different types for users
- [x] Mark some notifications as read and others as unread

---

## 8. Milestone 1 Exit Criteria

Milestone 1 is complete when:

- [ ] Authentication flows are separated correctly between app and admin
- [ ] Fortify is customized for the app registration and profile fields
- [ ] Role-based admin protection is working
- [ ] Database schema is fully in place
- [ ] Core models and relationships are ready
- [ ] Factories generate realistic development and test data
- [ ] Seeders populate the platform with consistent demo data
- [ ] Admin creation is available through seeding or Artisan

---

## 9. Notes

- A single `users` table serves both normal users and admins
- Admin access depends on role checks, not a separate admin table
- Queue and scheduler setup should be validated early because later milestones depend on them
- Seeder order matters and should remain coordinated through `DatabaseSeeder`


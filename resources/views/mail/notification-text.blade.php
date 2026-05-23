{{ $subject ?? config('app.name') }}

@if (! empty($greeting))
{{ $greeting }}

@endif
@foreach ($lines ?? [] as $line)
{{ $line }}

@endforeach
@isset($panelValue)
@isset($panelLabel)
{{ $panelLabel }}
@endisset
{{ $panelValue }}

@endisset
@if (! empty($actionText) && ! empty($actionUrl))
{{ $actionText }}
{{ $actionUrl }}

{{ $subcopy ?? __('messages.notifications.subcopy', ['actionText' => $actionText], $locale ?? null) }}
{{ $actionUrl }}

@endif
{{ $salutation ?? __('messages.notifications.regards', [], $locale ?? null)."\n".config('app.name') }}

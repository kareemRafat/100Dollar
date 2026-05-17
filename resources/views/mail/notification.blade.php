<x-mail.layout :title="$subject ?? config('app.name')" :preheader="$preheader ?? ($lines[0] ?? $subject ?? config('app.name'))">
    @if (! empty($greeting))
        <p class="greeting">{{ $greeting }}</p>
    @endif

    @foreach ($lines ?? [] as $line)
        <p class="line">{!! nl2br(e($line)) !!}</p>
    @endforeach

    @isset($panelValue)
        <div class="panel">
            @isset($panelLabel)
                <p class="panel-label">{{ $panelLabel }}</p>
            @endisset
            <p class="panel-value">{{ $panelValue }}</p>
        </div>
    @endisset

    @if (! empty($actionText) && ! empty($actionUrl))
        @include('mail.partials.button', ['url' => $actionUrl, 'text' => $actionText])
    @endif

    <p class="line">{!! nl2br(e($salutation ?? __('messages.notifications.regards')."\n".config('app.name'))) !!}</p>

    @if (! empty($actionText) && ! empty($actionUrl))
        <div class="subcopy">
            <p class="line">{{ $subcopy ?? __('messages.notifications.subcopy', ['actionText' => $actionText]) }}</p>
            <p class="line"><a href="{{ $actionUrl }}">{{ $actionUrl }}</a></p>
        </div>
    @endif
</x-mail.layout>

<!DOCTYPE html>
@php
    $isAdmin = request()->is('admin') || request()->is('admin/*');
    $locale = $isAdmin ? 'ar' : app()->getLocale();
    $direction = $isAdmin ? 'rtl' : ($locale === 'ar' ? 'rtl' : 'ltr');
@endphp
<html dir="{{ $direction }}" lang="{{ $locale }}" @class([
    'dark' => ($appearance ?? 'system') == 'dark',
    'theme-gold' => ! $isAdmin,
])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="robots" content="noindex, nofollow">
        @php
            $shareMeta = $shareMeta ?? null;
        @endphp
        @if (is_array($shareMeta))
            <meta name="description" content="{{ $shareMeta['description'] }}">

            <meta property="og:type" content="article">
            <meta property="og:site_name" content="{{ config('app.name') }}">
            <meta property="og:url" content="{{ $shareMeta['url'] }}">
            <meta property="og:title" content="{{ $shareMeta['title'] }}">
            <meta property="og:description" content="{{ $shareMeta['description'] }}">

            <meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:url" content="{{ $shareMeta['url'] }}">
            <meta name="twitter:title" content="{{ $shareMeta['title'] }}">
            <meta name="twitter:description" content="{{ $shareMeta['description'] }}">

            @if (! empty($shareMeta['image']))
                <meta property="og:image" content="{{ $shareMeta['image'] }}">
                <meta property="og:image:secure_url" content="{{ $shareMeta['image'] }}">
                @if (! empty($shareMeta['image_type']))
                    <meta property="og:image:type" content="{{ $shareMeta['image_type'] }}">
                @endif
                <meta property="og:image:width" content="1200">
                <meta property="og:image:height" content="630">
                <meta name="twitter:image" content="{{ $shareMeta['image'] }}">
            @endif
        @endif

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme variables --}}
        <style>
            html {
                background-color: var(--background, #ffffff);
            }
        </style>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Cairo:wght@400;600;700;800;900&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" as="style" onload="this.rel='stylesheet'" />
        <noscript><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Cairo:wght@400;600;700;800;900&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" /></noscript>

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        @inertiaHead
    </head>
    <body class="font-body antialiased">
        @inertia
    </body>
</html>

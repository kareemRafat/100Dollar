<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? config('app.name') }}</title>
    @isset($preheader)
        <meta name="description" content="{{ $preheader }}">
    @endisset
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f1f2f6;
            color: #2d3436;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
        }

        table { border-collapse: collapse; }

        .wrapper {
            width: 100%;
            background-color: #f1f2f6;
            padding: 40px 16px;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
        }

        .card {
            background-color: #ffffff;
            border-top: 6px solid #f97316;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        .header-content {
            padding: 35px 40px 0;
            text-align: {{ app()->getLocale() === 'ar' ? 'right' : 'left' }};
            border-top: 2px solid #e2e8f0;
            margin-top: 8px;
        }

        .brand-eyebrow {
            display: block;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #f97316;
            margin-bottom: 8px;
        }

        .hero-title {
            margin: 0;
            font-size: 22px;
            line-height: 1.3;
            font-weight: 800;
            color: #2d3436;
        }

        .hero-subtitle {
            margin: 12px 0 0;
            padding: 4px 16px;
            font-size: 14px;
            line-height: 1.6;
            color: #64748b;
            border-{{ app()->getLocale() === 'ar' ? 'right' : 'left' }}: 3px solid #e2e8f0;
        }

        .content {
            padding: 24px 40px 35px;
            text-align: {{ app()->getLocale() === 'ar' ? 'right' : 'left' }};
        }

        .greeting {
            margin: 0 0 16px;
            font-size: 16px;
            line-height: 1.5;
            font-weight: 700;
            color: #2d3436;
        }

        .line {
            margin: 0 0 16px;
            font-size: 16px;
            line-height: 1.6;
            color: #2d3436;
        }

        .panel {
            margin: 24px 0;
            padding: 20px;
            border-radius: 0;
            background-color: #fffaf0;
            border: none;
            border-{{ app()->getLocale() === 'ar' ? 'right' : 'left' }}: 4px solid #f97316;
        }

        .panel-rejected {
            background-color: #fff5f5;
            border-{{ app()->getLocale() === 'ar' ? 'right' : 'left' }}: 4px solid #ef4444;
        }

        .panel-label {
            margin: 0 0 4px;
            font-size: 13px;
            line-height: 1.4;
            font-weight: 800;
            color: #c2410c;
        }

        .panel-rejected .panel-label {
            color: #b91c1c;
        }

        .panel-value {
            margin: 0;
            font-size: 15px;
            line-height: 1.6;
            color: #9a3412;
            font-weight: 700;
        }

        .panel-rejected .panel-value {
            color: #991b1b;
        }

        .otp-panel {
            text-align: center;
            background-color: #f8fafc;
            border: 1px dashed #cbd5e1;
        }

        .otp-value {
            font-size: 32px;
            font-weight: 800;
            letter-spacing: 0.25em;
            color: #0f172a;
        }

        .button-wrap {
            padding: 16px 0 24px;
            text-align: {{ app()->getLocale() === 'ar' ? 'right' : 'left' }};
        }

        .button {
            display: inline-block;
            padding: 12px 32px;
            border-radius: 4px;
            background-color: #f97316;
            color: #ffffff !important;
            font-size: 15px;
            font-weight: 700;
            text-decoration: none;
        }

        .subcopy {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #f1f5f9;
            font-size: 12px;
            line-height: 1.6;
            color: #636e72;
            word-break: break-word;
        }

        .footer {
            padding: 24px 40px;
            text-align: center;
        }

        .footer-text {
            margin: 0 0 8px;
            font-size: 13px;
            line-height: 1.5;
            color: #94a3b8;
        }

        @media only screen and (max-width: 600px) {
            .wrapper { padding: 20px 12px; }
            .header-content, .content, .footer { padding-left: 20px !important; padding-right: 20px !important; }
            .hero-title { font-size: 20px; }
            .button { display: block; width: 100%; box-sizing: border-box; text-align: center; }
        }
    </style>
</head>
<body>
    <table role="presentation" class="wrapper" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table role="presentation" class="container" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="card">
                            <div class="header-content">
                                <span class="brand-eyebrow">{{ __('messages.mail.brand_badge') }}</span>
                                <h1 class="hero-title">{{ $title ?? config('app.name') }}</h1>
                                @php
                                    $summary = $preheader ?? __('messages.mail.brand_summary');
                                @endphp
                                @if(!empty($summary))
                                    <p class="hero-subtitle">{{ $summary }}</p>
                                @endif
                            </div>

                            <div class="content">
                                {{ $slot }}
                            </div>

                            <div class="footer">
                                <p class="footer-text">&copy; {{ date('Y') }} {{ config('app.name') }}. {{ __('messages.footer.rights_reserved') }}</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>

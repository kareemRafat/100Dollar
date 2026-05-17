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
            background-color: #f4f4f5;
            color: #18181b;
            font-family: Arial, Helvetica, sans-serif;
        }

        table { border-collapse: collapse; }

        .wrapper {
            width: 100%;
            background-color: #f4f4f5;
            padding: 32px 16px;
        }

        .container {
            width: 100%;
            max-width: 640px;
            margin: 0 auto;
        }

        .card {
            background-color: #ffffff;
            border: 1px solid #e4e4e7;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 12px 32px rgba(24, 24, 27, 0.08);
        }

        .hero {
            padding: 32px 40px 24px;
            background: linear-gradient(135deg, #f97316, #ea580c);
            color: #ffffff;
        }

        .hero-badge {
            display: inline-block;
            margin-bottom: 12px;
            padding: 6px 12px;
            border-radius: 999px;
            background-color: rgba(255, 255, 255, 0.18);
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        .hero-title {
            margin: 0;
            font-size: 28px;
            line-height: 1.3;
            font-weight: 700;
        }

        .hero-subtitle {
            margin: 12px 0 0;
            font-size: 15px;
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.92);
        }

        .content {
            padding: 36px 40px 20px;
            text-align: {{ app()->getLocale() === 'ar' ? 'right' : 'left' }};
        }

        .greeting {
            margin: 0 0 20px;
            font-size: 22px;
            line-height: 1.5;
            font-weight: 700;
            color: #111827;
        }

        .line {
            margin: 0 0 16px;
            font-size: 15px;
            line-height: 1.9;
            color: #3f3f46;
        }

        .panel {
            margin: 24px 0;
            padding: 20px 24px;
            border-radius: 18px;
            background-color: #fff7ed;
            border: 1px solid #fdba74;
            text-align: center;
        }

        .panel-label {
            margin: 0 0 8px;
            font-size: 12px;
            line-height: 1.4;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #c2410c;
        }

        .panel-value {
            margin: 0;
            font-size: 32px;
            line-height: 1.2;
            font-weight: 700;
            color: #9a3412;
        }

        .button-wrap {
            padding: 12px 0 24px;
            text-align: center;
        }

        .button {
            display: inline-block;
            padding: 14px 24px;
            border-radius: 999px;
            background-color: #f97316;
            color: #ffffff !important;
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
        }

        .subcopy {
            margin-top: 24px;
            padding-top: 20px;
            border-top: 1px solid #e4e4e7;
            font-size: 13px;
            line-height: 1.8;
            color: #71717a;
            word-break: break-word;
        }

        .footer {
            padding: 0 40px 36px;
            text-align: {{ app()->getLocale() === 'ar' ? 'right' : 'left' }};
        }

        .footer-card {
            padding: 20px 24px;
            border-radius: 18px;
            background-color: #fafafa;
            border: 1px solid #e4e4e7;
        }

        .footer-title {
            margin: 0 0 8px;
            font-size: 15px;
            line-height: 1.5;
            font-weight: 700;
            color: #18181b;
        }

        .footer-text {
            margin: 0;
            font-size: 13px;
            line-height: 1.8;
            color: #71717a;
        }

        @media only screen and (max-width: 640px) {
            .wrapper { padding: 16px 8px; }
            .hero, .content, .footer { padding-left: 20px !important; padding-right: 20px !important; }
            .hero-title { font-size: 24px; }
            .panel-value { font-size: 28px; }
            .button { display: block; }
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
                            <div class="hero">
                                <div class="hero-badge">{{ __('messages.mail.brand_badge') }}</div>
                                <h1 class="hero-title">{{ $title ?? config('app.name') }}</h1>
                                <p class="hero-subtitle">{{ $preheader ?? __('messages.mail.brand_summary') }}</p>
                            </div>

                            <div class="content">
                                {{ $slot }}
                            </div>

                            <div class="footer">
                                <div class="footer-card">
                                    <p class="footer-title">{{ config('app.name') }}</p>
                                    <p class="footer-text">{{ __('messages.mail.brand_summary') }}</p>
                                    <p class="footer-text">&copy; {{ date('Y') }} {{ config('app.name') }}. {{ __('messages.footer.rights_reserved') }}</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>

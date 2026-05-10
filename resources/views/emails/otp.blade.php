<x-mail::message>
<div dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}" style="text-align: {{ app()->getLocale() === 'ar' ? 'right' : 'left' }}; font-family: sans-serif;">
# {{ __('Verification Code') }}

{{ __('Hello,') }}

{{ __('Your verification code for voting on the idea is:') }}

<x-mail::panel>
# {{ $otp }}
</x-mail::panel>

{{ __('This code is valid for 10 minutes.') }}

{{ __('If you did not request this code, please ignore this email.') }}

{{ __('Thanks,') }}<br>
{{ config('app.name') }}
</div>
</x-mail::message>

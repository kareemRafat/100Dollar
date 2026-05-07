<x-mail::message>
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
</x-mail::message>

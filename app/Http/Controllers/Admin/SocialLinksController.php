<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Settings\SocialLinksUpdateRequest;
use App\Models\Setting;
use Inertia\Inertia;
use Inertia\Response;

class SocialLinksController extends Controller
{
    /**
     * Show the social links settings page.
     */
    public function edit(): Response
    {
        return Inertia::render('admin/pages/social-links', [
            'settings' => [
                'social_whatsapp' => Setting::get('social_whatsapp'),
                'social_x' => Setting::get('social_x'),
                'social_facebook' => Setting::get('social_facebook'),
                'social_instagram' => Setting::get('social_instagram'),
            ],
        ]);
    }

    /**
     * Update the social links settings.
     */
    public function update(SocialLinksUpdateRequest $request)
    {
        $validated = $request->validated();

        foreach ($validated as $key => $value) {
            Setting::set($key, $value);
        }

        return back()->with('success', 'تم تحديث روابط التواصل الاجتماعي بنجاح');
    }
}

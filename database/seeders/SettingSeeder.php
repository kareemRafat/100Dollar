<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            'social_whatsapp' => 'https://wa.me/1234567890',
            'social_x' => 'https://x.com/afkar100',
            'social_facebook' => 'https://facebook.com/afkar100',
            'social_instagram' => 'https://instagram.com/afkar100',
        ];

        foreach ($settings as $key => $value) {
            Setting::set($key, $value);
        }
    }
}

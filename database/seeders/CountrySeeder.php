<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $countries = [
            ['code' => 'SA', 'name_en' => 'Saudi Arabia', 'name_ar' => 'المملكة العربية السعودية'],
            ['code' => 'EG', 'name_en' => 'Egypt', 'name_ar' => 'مصر'],
            ['code' => 'AE', 'name_en' => 'United Arab Emirates', 'name_ar' => 'الإمارات العربية المتحدة'],
            ['code' => 'KW', 'name_en' => 'Kuwait', 'name_ar' => 'الكويت'],
            ['code' => 'QA', 'name_en' => 'Qatar', 'name_ar' => 'قطر'],
            ['code' => 'BH', 'name_en' => 'Bahrain', 'name_ar' => 'البحرين'],
            ['code' => 'OM', 'name_en' => 'Oman', 'name_ar' => 'عمان'],
            ['code' => 'JO', 'name_en' => 'Jordan', 'name_ar' => 'الأردن'],
            ['code' => 'LB', 'name_en' => 'Lebanon', 'name_ar' => 'لبنان'],
            ['code' => 'MA', 'name_en' => 'Morocco', 'name_ar' => 'المغرب'],
            ['code' => 'DZ', 'name_en' => 'Algeria', 'name_ar' => 'الجزائر'],
            ['code' => 'TN', 'name_en' => 'Tunisia', 'name_ar' => 'تونس'],
            ['code' => 'IQ', 'name_en' => 'Iraq', 'name_ar' => 'العراق'],
            ['code' => 'YE', 'name_en' => 'Yemen', 'name_ar' => 'اليمن'],
            ['code' => 'LY', 'name_en' => 'Libya', 'name_ar' => 'ليبيا'],
            ['code' => 'SD', 'name_en' => 'Sudan', 'name_ar' => 'السودان'],
            ['code' => 'PS', 'name_en' => 'Palestine', 'name_ar' => 'فلسطين'],
            ['code' => 'SY', 'name_en' => 'Syria', 'name_ar' => 'سوريا'],
        ];

        foreach ($countries as $country) {
            Country::create($country);
        }
    }
}

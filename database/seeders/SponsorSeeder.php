<?php

namespace Database\Seeders;

use App\Models\Sponsor;
use Illuminate\Database\Seeder;

class SponsorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sponsors = [
            ['name' => 'شركة الرواد للاستثمار', 'day_of_week' => 0],
            ['name' => 'مؤسسة التنمية العربية', 'day_of_week' => 1],
            ['name' => 'بنك الأفكار', 'day_of_week' => 2],
            ['name' => 'صندوق تمويل المشاريع', 'day_of_week' => 3],
            ['name' => 'هيئة دعم الابتكار', 'day_of_week' => 4],
            ['name' => 'مجموعة التقدم الصناعي', 'day_of_week' => 5],
            ['name' => 'شركة النهضة للحلول الرقمية', 'day_of_week' => 6],
        ];

        foreach ($sponsors as $sponsor) {
            Sponsor::factory()->create($sponsor);
        }
    }
}

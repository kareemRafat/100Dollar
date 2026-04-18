<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $countries = ['الأردن', 'السعودية', 'مصر', 'الإمارات', 'الكويت'];

        foreach ($countries as $country) {
            User::factory()->count(10)->create([
                'country' => $country,
                'nationality' => $country,
            ]);
        }
    }
}

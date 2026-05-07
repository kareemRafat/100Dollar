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
        $countries = \App\Models\Country::all();

        foreach ($countries as $country) {
            User::factory()->count(10)->create([
                'country_id' => $country->id,
                'nationality' => $country->name_ar,
            ]);
        }
    }
}

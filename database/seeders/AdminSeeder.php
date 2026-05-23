<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'مدير المنصة',
            'email' => 'admin@admin.com',
            'password' => Hash::make('12345678'),
            'role' => UserRole::ADMIN,
        ]);

        User::factory()->create([
            'name' => 'موظف المنصة',
            'email' => 'user@admin.com',
            'password' => Hash::make('12345678'),
            'role' => UserRole::USER,
        ]);

        User::factory()->admin()->create([
            'name' => 'Demo Admin',
            'email' => 'demo@afkar100.com',
        ]);
    }
}

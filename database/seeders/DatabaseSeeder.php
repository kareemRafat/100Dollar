<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            SponsorSeeder::class,
            UserSeeder::class,
            CategorySeeder::class,
            IdeaSeeder::class,
            VoteSeeder::class,
            CommentSeeder::class,
            FollowSeeder::class,
            PrizeRecordSeeder::class,
            NotificationSeeder::class,
        ]);
    }
}

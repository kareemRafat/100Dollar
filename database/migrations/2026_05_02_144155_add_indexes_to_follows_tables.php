<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('user_follows', function (Blueprint $table) {
            $table->unique(['follower_id', 'following_id'], 'user_follows_follower_following_unique');
        });

        Schema::table('idea_follows', function (Blueprint $table) {
            $table->unique(['user_id', 'idea_id'], 'idea_follows_user_idea_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_follows', function (Blueprint $table) {
            $table->dropUnique('user_follows_follower_following_unique');
        });

        Schema::table('idea_follows', function (Blueprint $table) {
            $table->dropUnique('idea_follows_user_idea_unique');
        });
    }
};

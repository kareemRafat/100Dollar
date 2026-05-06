<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First change to string to allow non-enum values
        Schema::table('ideas', function (Blueprint $table) {
            $table->string('marketing_channel')->nullable()->change();
        });

        // Convert existing data to JSON array format
        DB::table('ideas')->whereNotNull('marketing_channel')->get()->each(function ($idea) {
            DB::table('ideas')
                ->where('id', $idea->id)
                ->update(['marketing_channel' => json_encode([$idea->marketing_channel])]);
        });

        // Now change to json
        Schema::table('ideas', function (Blueprint $table) {
            $table->json('marketing_channel')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ideas', function (Blueprint $table) {
            $table->string('marketing_channel')->nullable()->change();
        });

        // Convert back from JSON array to first element
        DB::table('ideas')->whereNotNull('marketing_channel')->get()->each(function ($idea) {
            $channels = json_decode($idea->marketing_channel, true);
            $channel = is_array($channels) && !empty($channels) ? $channels[0] : null;
            DB::table('ideas')
                ->where('id', $idea->id)
                ->update(['marketing_channel' => $channel]);
        });

        Schema::table('ideas', function (Blueprint $table) {
            $table->enum('marketing_channel', ['social_media', 'word_of_mouth', 'physical', 'whatsapp', 'other'])->nullable()->change();
        });
    }
};

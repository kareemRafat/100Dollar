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
        Schema::table('ideas', function (Blueprint $table) {
            $table->enum('marketing_channel', ['social_media', 'word_of_mouth', 'physical', 'whatsapp', 'other'])->nullable()->after('description');
            $table->json('target_audience')->nullable()->after('marketing_channel');
            $table->string('implementation_time')->nullable()->after('target_audience');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ideas', function (Blueprint $table) {
            $table->dropColumn(['marketing_channel', 'target_audience', 'implementation_time']);
        });
    }
};

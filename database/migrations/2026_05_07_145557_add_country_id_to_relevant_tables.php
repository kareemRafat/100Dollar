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
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('country_id')->nullable()->after('phone')->constrained('countries')->onDelete('set null');
        });

        Schema::table('ideas', function (Blueprint $table) {
            $table->foreignId('country_id')->nullable()->after('category_id')->constrained('countries')->onDelete('set null');
        });

        Schema::table('sponsorship_requests', function (Blueprint $table) {
            $table->foreignId('country_id')->nullable()->after('website')->constrained('countries')->onDelete('set null');
        });

        // Drop old columns
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('country');
        });

        Schema::table('ideas', function (Blueprint $table) {
            $table->dropColumn('country');
        });

        Schema::table('sponsorship_requests', function (Blueprint $table) {
            $table->dropColumn('country');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['country_id']);
            $table->dropColumn('country_id');
            $table->string('country')->nullable()->after('phone');
        });

        Schema::table('ideas', function (Blueprint $table) {
            $table->dropForeign(['country_id']);
            $table->dropColumn('country_id');
            $table->string('country')->nullable()->after('category_id');
        });

        Schema::table('sponsorship_requests', function (Blueprint $table) {
            $table->dropForeign(['country_id']);
            $table->dropColumn('country_id');
            $table->string('country')->nullable()->after('website');
        });
    }
};

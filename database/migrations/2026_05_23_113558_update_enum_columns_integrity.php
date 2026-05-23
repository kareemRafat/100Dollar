<?php

use App\Enums\IdeaStatus;
use App\Enums\PrizeStatus;
use App\Enums\SponsorshipStatus;
use App\Enums\UserRole;
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
        // Update Users Table
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default(UserRole::USER->value)->comment('user, admin')->change();
        });

        // Update Ideas Table
        Schema::table('ideas', function (Blueprint $table) {
            $table->string('status')->default(IdeaStatus::PENDING->value)->comment('pending, approved, rejected')->change();
        });

        // Update Prize Records Table
        Schema::table('prize_records', function (Blueprint $table) {
            $table->string('status')->default(PrizeStatus::PENDING->value)->comment('pending, delivered')->change();
        });

        // Update Sponsorship Requests Table
        Schema::table('sponsorship_requests', function (Blueprint $table) {
            $table->string('status')->default(SponsorshipStatus::PENDING->value)->comment('pending, approved, rejected')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default(UserRole::USER->value)->comment(null)->change();
        });

        Schema::table('ideas', function (Blueprint $table) {
            $table->string('status')->default(IdeaStatus::PENDING->value)->comment(null)->change();
        });

        Schema::table('prize_records', function (Blueprint $table) {
            $table->string('status')->default(PrizeStatus::PENDING->value)->comment(null)->change();
        });

        Schema::table('sponsorship_requests', function (Blueprint $table) {
            $table->string('status')->default(SponsorshipStatus::PENDING->value)->comment(null)->change();
        });
    }
};

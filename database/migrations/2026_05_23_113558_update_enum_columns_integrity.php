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
        // Update Users Table
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('user')->comment('user, admin')->change();
        });

        // Update Ideas Table
        Schema::table('ideas', function (Blueprint $table) {
            $table->string('status')->default('pending')->comment('pending, approved, rejected')->change();
        });

        // Update Prize Records Table
        Schema::table('prize_records', function (Blueprint $table) {
            $table->string('status')->default('pending')->comment('pending, delivered')->change();
        });

        // Update Sponsorship Requests Table
        Schema::table('sponsorship_requests', function (Blueprint $table) {
            $table->string('status')->default('pending')->comment('pending, approved, rejected')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('user')->comment(null)->change();
        });

        Schema::table('ideas', function (Blueprint $table) {
            $table->string('status')->default('pending')->comment(null)->change();
        });

        Schema::table('prize_records', function (Blueprint $table) {
            $table->string('status')->default('pending')->comment(null)->change();
        });

        Schema::table('sponsorship_requests', function (Blueprint $table) {
            $table->string('status')->default('pending')->comment(null)->change();
        });
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('user')->after('email');
            $table->string('phone')->nullable()->after('role');
            $table->string('country')->nullable()->after('phone');
            $table->string('nationality')->nullable()->after('country');
            $table->boolean('is_active')->default(true)->after('nationality');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->index('role');
            $table->index('country');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['country']);
            $table->dropIndex(['role']);
            $table->dropColumn(['role', 'phone', 'country', 'nationality', 'is_active']);
        });
    }
};

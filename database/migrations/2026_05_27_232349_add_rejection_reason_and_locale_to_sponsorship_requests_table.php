<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sponsorship_requests', function (Blueprint $table) {
            $table->text('rejection_reason')->nullable()->after('message');
            $table->string('locale', 5)->default('ar')->after('rejection_reason');
        });
    }

    public function down(): void
    {
        Schema::table('sponsorship_requests', function (Blueprint $table) {
            $table->dropColumn(['rejection_reason', 'locale']);
        });
    }
};

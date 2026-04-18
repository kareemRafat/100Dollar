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
        Schema::create('sponsors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('logo')->nullable();
            $table->unsignedTinyInteger('day_of_week')->unique(); // 0-6 (Sunday-Saturday)
            $table->date('contract_start');
            $table->date('contract_end');
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index('day_of_week');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sponsors');
    }
};

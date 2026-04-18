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
        Schema::create('prize_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idea_id')->constrained()->cascadeOnDelete();
            $table->foreignId('sponsor_id')->constrained()->cascadeOnDelete();
            $table->decimal('amount', 10, 2)->default(100.00);
            $table->string('status')->default('pending'); // pending/delivered
            $table->timestamp('delivered_at')->nullable();
            $table->timestamps();

            $table->index('status');
            $table->index('idea_id');
            $table->index('sponsor_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prize_records');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ideas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('sponsor_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->text('description');
            $table->string('category');
            $table->string('country');
            $table->string('city')->nullable();
            $table->unsignedSmallInteger('submission_day')->default(0);
            $table->unsignedInteger('week_number');
            $table->unsignedSmallInteger('year');
            $table->string('status')->default('pending');
            $table->unsignedInteger('votes_count')->default(0);
            $table->boolean('is_winner')->default(false);
            $table->text('rejection_reason')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('winner_announced_at')->nullable();
            $table->timestamps();

            $table->index('status');
            $table->index('submission_day');
            $table->index(['week_number', 'year']);
            $table->index('is_winner');
            $table->index('user_id');
            $table->index('sponsor_id');
            $table->index('votes_count');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ideas');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ideas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('sponsor_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('country_id')->nullable()->constrained('countries')->nullOnDelete();
            $table->string('title');
            $table->text('description');
            $table->json('marketing_channel')->nullable();
            $table->json('target_audience')->nullable();
            $table->string('implementation_time')->nullable();
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

            $table->index('submission_day');
            $table->index(['week_number', 'year']);
            $table->index('is_winner');
            $table->index('votes_count');
            $table->index(['status', 'submission_day', 'week_number', 'year', 'votes_count'], 'ideas_directory_optimized_index');
            if (DB::getDriverName() !== 'sqlite') {
                $table->fullText(['title', 'description'], 'ideas_search_fulltext');
            }
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ideas');
    }
};

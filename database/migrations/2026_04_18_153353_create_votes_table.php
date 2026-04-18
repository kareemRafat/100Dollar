<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('votes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idea_id')->constrained()->cascadeOnDelete();
            $table->string('voter_email');
            $table->string('otp', 6)->nullable();
            $table->timestamp('otp_expires_at')->nullable();
            $table->timestamp('otp_verified_at')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->timestamps();

            $table->unique(['idea_id', 'voter_email']);
            $table->index('voter_email');
            $table->index('idea_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('votes');
    }
};

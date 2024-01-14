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
        Schema::create('seats', function (Blueprint $table) {
            $table->id();
            $table->string('seat_name')->nullable();
            $table->string('seat_type_id')->nullable();
            // $table->foreignId('room_id')->nullable();
            $table->foreignId('showtime_id');
            $table->enum('status', ['unbook', 'booked', 'booking'])->default('unbook')->nullable();
            $table->integer('price');
            $table->foreignId('user_id')->nullable()->default(NULL);
            $table->foreignId('booking_id')->nullable()->default(NULL);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seats');
    }
};

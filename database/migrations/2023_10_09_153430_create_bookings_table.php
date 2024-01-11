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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_id');
            $table->foreignId('user_id');
            $table->foreignId('showtime_id');
            $table->integer('total_price');
            $table->string('coupon_code')->nullable();
            $table->enum('status', ['not_yet','satisfied','cancel'])->default('not_yet'); // Chưa lấy vé, đã lấy vé
            $table->enum('level', ['show','hide'])->default('show'); // cho vào thùng rác
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};

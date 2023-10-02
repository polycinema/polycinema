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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');// Khóa ngoại tham chiếu đến bảng Users
            $table->integer('reservations_id');// Khóa ngoại tham chiếu đến bảng Reservations
            $table->bigInteger('total_amount'); // Tổng tiền
            $table->dateTime('payment_date'); // Ngày thanh toán 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments_tables');
    }
};

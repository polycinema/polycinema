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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');// tham chiếu đến bảng Users
            $table->interger('seat_id');// tham chiếu đến bảng Seats
            $table->integer('showtimes_id'); // tham chiếu đến bảng Showtimes
            $table->integer('products_id');  // tham chiếu đến bảng Products
            $table->integer('total_producs_number'); // Tổng số sản phẩm để tính tổng tiền ?? CẦN THAM KHẢO
            $table->time('reservation_date'); // Ngày đặt chỗ
            $table->integer('coupons_id')->nullable(); // Mã khuyến mãi
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations_tables');
    }
};

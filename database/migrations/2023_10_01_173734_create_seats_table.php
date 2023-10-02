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
            $table->string('name'); // Tên ghế
            $table->integer('seat_type'); // Loại ghế 0:Thường, 1:Ghế Đôi
            $table->integer('theaters'); // Ghế thuộc ID phòng
            $table->integer('status')->nullable(); // Trạng thái 0: Chưa đặt, 1: Đang đặt, 2: Đã đặt
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seats_tables');
    }
};

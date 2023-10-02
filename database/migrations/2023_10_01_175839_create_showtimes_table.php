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
        Schema::create('showtimes', function (Blueprint $table) {
            // bảng hỗ trợ bảng reservations
            $table->id();
            $table->integer('movie_id'); // Tên Phim
            $table->integer('theaters_id'); // ID Phòng 
            $table->time('start_time'); // Thời gian bắt đầu chiếu
            $table->time('end_time'); // thời gian kết thúc
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('showtimes_tables');
    }
};

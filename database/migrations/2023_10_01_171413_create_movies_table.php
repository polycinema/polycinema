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
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Têm phim
            $table->string('description'); // Mô tả
            $table->datetimes('release_date'); // Thời gian công chiếu
            $table->integer('genre_id'); // ID Thể loại phim
            $table->integer('movie_duration'); // Thời lượng phim
            $table->string('cast'); // Dàn diễn viên
            $table->integer('evaluate')->nullable(); // Điểm đánh giá
            $table->string('language'); // Ngôn ngữ phim
            $table->integer('subtitle'); // Phụ đề 0: VietSub , 1: Lồng Tiếng
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies_tables');
    }
};

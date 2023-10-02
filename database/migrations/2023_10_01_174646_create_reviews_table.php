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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id'); // ID Người dùng
            $table->integer('movie_id'); // ID Phim 
            $table->integer('rating_point')->max(5); // Điểm đánh giá
            $table->longText('comment')->nullable(); // có hoặc không Commet 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews_tables');
    }
};

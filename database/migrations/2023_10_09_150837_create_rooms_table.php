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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('room_name');
            $table->integer('single_seat');
            $table->integer('double_seat');
            $table->integer('special_seat');
            // $table->bigInteger('single_seat_price');
            // $table->bigInteger('double_seat_price');
            // $table->bigInteger('special_seat_price');
            $table->integer('capacity');
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
        Schema::dropIfExists('rooms');
    }
};

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
        Schema::create('theaters', function (Blueprint $table) { // Phòng chiếu
            $table->id();
            $table->string('name'); // Tên phòng chiếu
            $table->integer('capacity'); // Sức chứa đơn vị: số người
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('theaters_tables');
    }
};

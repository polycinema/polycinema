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
    {   // Sản phẩm đi kèm
        Schema::create('products', function (Blueprint $table) { 
            $table->id();
            $table->string('name'); // Tên sản phẩm 
            $table->bigInteger('price'); // Giá sản phẩm 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products_tables');
    }
};

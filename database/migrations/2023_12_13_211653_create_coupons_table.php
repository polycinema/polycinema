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
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('coupon_code');
            $table->string('description'); 
            $table->enum('type', ['discount_percentage', 'discount_amount'])->nullable(); 
            $table->bigInteger('discount'); 
            $table->timestamp('expires_at'); // ngày hết hạn
            $table->bigInteger('quantity')->nullable(); // số lượng
            $table->bigInteger('min_order_value')->nullable();
            $table->enum('level', ['show','hide'])->default('show');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupons');
    }
};

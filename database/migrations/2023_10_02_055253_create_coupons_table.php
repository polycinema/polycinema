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
            $table->string('coupons_name');
            $table->string('coupons_code');
            $table->enum('type', ['percentage', 'numeric']); // Giảm cố định số tiền, giảm phần trăm
            $table->bigInteger('value'); // số giá trị giảm
            $table->date('expired_at'); // hết hạn
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

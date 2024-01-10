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
            $table->string('name');
            $table->string('title');
            $table->string('image');
            $table->string('trailer');
            $table->text('description');
            $table->timestamp('release_date');
            $table->integer('duration');
            $table->foreignId('director_id');
            $table->enum('status', ['screening','unscreen','upcoming'])->default('upcoming');
            $table->enum('level', ['show','hide'])->default('show');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};

<?php

use App\Http\Controllers\API\V1\Admin\DirectorController;
use App\Http\Controllers\API\V1\Admin\ActorController;
use App\Http\Controllers\API\V1\Admin\GenreController;
use App\Http\Controllers\API\V1\Admin\MovieController;
use App\Http\Controllers\API\V1\Admin\PostController;
use App\Http\Controllers\API\V1\Admin\ProductController;
use App\Http\Controllers\API\V1\Admin\RoomController;
use App\Http\Controllers\API\V1\Admin\SeatController;
use App\Http\Controllers\API\V1\Admin\ShowTimeController;
use App\Http\Controllers\API\V1\Admin\UserController;


use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group(function () {
    Route::resource('movies', MovieController::class)->except(['edit']);

    Route::resource('seats', SeatController::class)->except(['create', 'edit']);

    Route::resource('rooms', RoomController::class)->except(['create', 'edit']);

    Route::resource('products', ProductController::class)->except(['create', 'edit']);

    Route::resource('directors', DirectorController::class)->except('create', 'edit');

    Route::resource('users', UserController::class)->except('create', 'edit');

    Route::resource('genres', GenreController::class)->except(['edit', 'create']);

    Route::resource('actors', ActorController::class)->except(['edit', 'create']);

    Route::resource('showtime', ShowTimeController::class)->except(['edit', 'create']);

    Route::resource('posts', PostController::class)->except(['edit', 'create']);

});


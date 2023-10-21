<?php

use App\Http\Controllers\API\V1\Admin\DirectorController;
use App\Http\Controllers\API\V1\Admin\MovieController;
use App\Http\Controllers\API\V1\Admin\ProductController;
use App\Http\Controllers\API\V1\Admin\RoomController;
use App\Http\Controllers\API\V1\Admin\SeatController;
use App\Http\Controllers\API\V1\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group(function() {

    Route::resource('movies', MovieController::class)->except(['edit']);

    Route::resource('seats', SeatController::class)->except(['create', 'edit']);

    Route::resource('rooms', RoomController::class)->except(['create', 'edit']);

    Route::resource('products', ProductController::class)->except(['create', 'edit']);

    Route::resource('directors', DirectorController::class)->except('create', 'edit');

    Route::resource('users', UserController::class)->except('create', 'edit');


});

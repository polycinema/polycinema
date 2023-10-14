<?php

use App\Http\Controllers\API\V1\Admin\DirectorController;
use App\Http\Controllers\API\V1\Admin\MovieController;
use App\Http\Controllers\API\V1\Admin\ProductController;
use App\Http\Controllers\API\V1\Admin\RoomController;
use App\Http\Controllers\API\V1\Admin\SeatController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group(function() {

    Route::resource('movies', MovieController::class)->except(['edit']);

    // Route::group(['prefix' => 'seats'], function(){
        
    //     // Route::resource('/', SeatController::class);

    //     // Route::post('add', [SeatController::class, 'store']);
    
    //     // Route::get('{id}', [SeatController::class, 'show']);

    //     // Route::put('edit/{id}', [SeatController::class, 'update']);

    //     // Route::delete('delete/{id}', [SeatController::class, 'destroy']);
    // });

    Route::resource('seats', SeatController::class)->except('create', 'edit');

    Route::group(['prefix' => 'rooms'], function (){
        Route::get('/', [RoomController::class, 'index']);

        Route::post('add', [RoomController::class, 'store']);

        Route::get('{id}', [RoomController::class, 'show']);

        Route::put('edit/{id}', [RoomController::class, 'update']);

        Route::delete('delete/{id}', [RoomController::class, 'destroy']);
    });

    Route::group(['prefix' => 'products'], function (){
        Route::get('/', [ProductController::class, 'index']);

        Route::post('add', [ProductController::class, 'store']);

        Route::get('{id}', [ProductController::class, 'show']);

        Route::post('edit/{id}', [ProductController::class, 'update']);

        Route::delete('delete/{id}', [ProductController::class, 'destroy']);
    });

    Route::group(['prefix' => 'directors'], function (){
        Route::get('/', [DirectorController::class, 'index']);

        Route::post('add', [DirectorController::class, 'store']);

        Route::get('{id}', [DirectorController::class, 'show']);

        Route::post('edit/{id}', [DirectorController::class, 'update']);

        Route::delete('delete/{id}', [DirectorController::class, 'destroy']);
    });

});

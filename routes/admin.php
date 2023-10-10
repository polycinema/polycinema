<?php

use App\Http\Controllers\API\V1\Admin\MovieController;
use App\Http\Controllers\API\V1\Admin\SeatController;
use App\Models\Seat;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group(function() {

    Route::resource('movies', MovieController::class)->except(['edit']);

    Route::group(['prefix' => 'seats'], function(){
        Route::resource('/', SeatController::class);

        Route::post('add', [SeatController::class, 'store']);
    
        Route::get('{id}', [SeatController::class, 'show']);

        Route::put('edit/{id}', [SeatController::class, 'update']);

        Route::delete('delete/{id}', [SeatController::class, 'destroy']);
    });

});

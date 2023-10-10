<?php

use App\Http\Controllers\API\V1\Admin\MovieController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group(function() {

    Route::resource('movies', MovieController::class)->except(['edit']);
});

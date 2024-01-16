<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return [
        'Laravel' => app()->version(),
        'Locale' => app()->getLocale()
    ];
});

Route::get('mail', function() {
    return view('mails.welcome-new-user');
});

Route::get('mail-booking', function() {
    return view('mails.test');
});

<?php

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


//Place all other routes before this one.
Route::get('/', 'HomeController@serveStatic')->where('all', '^(?!api).*$');
Route::get('/{any}', 'HomeController@serveStatic')->where('any', '^(?!api).*$');

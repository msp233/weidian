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
//http://localhost:8080/blog/public/index.php
Route::get('/', function () {
    return view('welcome');
});

//web首页路由
Route::namespace('Wap')->group(function(){
    Route::get('/','IndexController')->name('index');
});
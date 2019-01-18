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

use Illuminate\Http\Request;

//http://localhost:8080/blog/public/index.php
Route::get('/', function () {
    return view('welcome');
});

//web首页路由
Route::namespace('Wap')->group(function(){
    Route::get('/','IndexController')->name('index');
});

Route::get('oauth',function(){
    return view('welcome');
});
//微信网页授权登录
//https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
//https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx05b20198f8b779fb&redirect_uri=https://www.spalcw.com/weidian/public/index.php/oauth&response_type=code&scope=snsapi_base&state=msp#wechat_redirect
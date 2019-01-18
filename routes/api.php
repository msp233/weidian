<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
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
//微信测试账号地址：https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index
//授权地址
Route::get('wechat',function(Request $request){
    return redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6e52a80f1867ce9c&redirect_uri=https://www.spalcw.com/weidian/public/index.php/oauth&response_type=code&scope=snsapi_userinfo&state=msp#wechat_redirect');
});
//获取code
Route::get('oauth',function(Request $request){
    return $request->input();
});
//通过code换取网页授权access_token
//https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
Route::get('access_token',function(){});
//刷新access_token（如果需要）
//https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=APPID&grant_type=refresh_token&refresh_token=REFRESH_TOKEN
//拉取用户信息(需scope为 snsapi_userinfo)
//https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
//微信网页授权登录
//https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
//https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx05b20198f8b779fb&redirect_uri=https://www.spalcw.com/weidian/public/index.php/oauth&response_type=code&scope=snsapi_base&state=msp#wechat_redirect
//https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx05b20198f8b779fb&redirect_uri=https%3a%2f%2fwww.spalcw.com%2fweidian%2fpublic%2findex.php%2foauth&response_type=code&scope=snsapi_base&state=msp#wechat_redirect
//https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6e52a80f1867ce9c&redirect_uri=https://www.spalcw.com/weidian/public/index.php/oauth&response_type=code&scope=snsapi_userinfo&state=msp#wechat_redirect
//https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6e52a80f1867ce9c&redirect_uri=https%3a%2f%2fwww.spalcw.com%2fweidian%2fpublic%2findex.php%2foauth&response_type=code&scope=snsapi_base&state=msp#wechat_redirect
//https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
//https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx6e52a80f1867ce9c&secret=ff9260426455eead10ac77622bf7d11e&code=021IryBo0kusVl1E0EBo0w0fBo0IryBE&grant_type=authorization_code
/*
{
"access_token":"17_sGawhqpvBUrERTtdK5vHd5uav4n5TdFxNOqfLmkNhmcXwynifHtvd37Lxu7eUd3jAvfyUM04srB7lSdf8dacbA",
"expires_in":7200,
"refresh_token":"17_WAW_26rqB_fjHm4beQeFkCsA1-YjL96w8KKKGOkgx-Dm72bHP1UqroE9N7GbPCscW8iIdo_j1z5QlLk9TFM1hQ",
"openid":"o869U55RxGxR6bvylVM5IbE8wDkI",
"scope":"snsapi_userinfo"
}
*/
//https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
//https://api.weixin.qq.com/sns/userinfo?access_token=17_sGawhqpvBUrERTtdK5vHd5uav4n5TdFxNOqfLmkNhmcXwynifHtvd37Lxu7eUd3jAvfyUM04srB7lSdf8dacbA&openid=o869U55RxGxR6bvylVM5IbE8wDkI&lang=zh_CN

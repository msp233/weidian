<?php
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//分组
/*Route::group(['prefix'=>'v1','namespace'=>'Api\V1'],function(){
    Route::resource('user','UserController');
    Route::resource('user/{create}','UserController');
});*/
Route::group(['prefix'=>'v1','namespace'=>'Api\V1'],function(){
    Route::post('login','AuthController@login');
    Route::post('refresh','AuthController@refresh');
    Route::post('logout','AuthController@logout');
    Route::get('user','AuthController@user')->middleware('auth:api');
});

$api = app('Dingo\Api\Routing\Router');

//https://localhost/api/test
/*$api->version('v1', function ($api) {
    $api->get('test',function(){
        return 'this is dingo api !';
    });
});*/
$api->version('v1', [
    'namespace' => 'App\Http\Controllers\Api\V1',
    'middleware' => ['bindings'],
], function ($api) {
    $api->post('login','AuthController@login');
    $api->post('refresh','AuthController@refresh');
    $api->post('logout','AuthController@logout');
    $api->post('user','AuthController@user');
});

//https://localhost/api/test2
//header
//  Accept = application/prs.myapp.v2+json
// 跨版本访问
$api->version('v2', function ($api) {
    $api->get('test2',function(){
        return 'this is dingo api test2!';
    });
});

//对接微信公众号
$api->version('v1',[
    'namespace' => 'App\Http\Controllers\Api\V1',
    'middleware' => ['api'],
],function($api){
    $api->post('authorizations','AuthorizationsController@store');
    $api->get('socials/authorizations','AuthorizationsController@socialStore')->middleware('wechat.oauth');
    //2019-1-22 对接微信公众号菜单设置
    $api->resource('wechatmenu','WechatMenuController');
});
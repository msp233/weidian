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
    Route::post('user','AuthController@user');
});

$api = app('Dingo\Api\Routing\Router');

//https://localhost/api/test
$api->version('v1', function ($api) {
    $api->get('test',function(){
        return 'this is dingo api !';
    });
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

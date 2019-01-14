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
Route::get('index', function () {
    return 'index route text';
});

//http://localhost:8080/blog/public/index.php/store-my/食品/abc?aa=bb&cc=dd
/*路由参数的注入*/
Route::get('store-my/{type_id}/{agent_id}',function($type_id,$agent_id){
    dd($type_id,$agent_id,$_GET);
    return '我已经进入到'.$type_id.'分类，'.$agent_id.'店铺了！';
});

//http://localhost:8080/blog/public/index.php/test2?aa=bb&cc=dd
//http://localhost:8080/blog/public/index.php/test2/食品?aa=bb&cc=dd
//http://localhost:8080/blog/public/index.php/test2/食品/abc?aa=bb&cc=dd
/*路由参数的获取  ? 是可选参数  上面的三个地址都可以正常访问 */
Route::get('test2/{type_id?}/{agent_id?}',function(Request $request){
    //dd($request);
    //dd($request::url());
    //dd($request::ip());
    //dd($request::all());
    //dd($request::route());
    dd($request::route('agent_id'));
    dd($request::route()->parameters());//获取所有的路由参数
    //dd($_SERVER);
});

//http://localhost:8080/blog/public/index.php/test?aa=bb&cc=dd
//普通参数的获取方式
Route::get('/test', function (Request $request) {
    dd($request::all());
});


//http://localhost:8080/blog/public/index.php/user/456daf
/*路由参数的限制，利用正则限制参数的类型*/
Route::get('user/{name}',function($name) {
    return '通过参数检测';
    //dd($name);
})->where('name','\d+[a-zA-Z]+');




//用post访问，
Route::get('form/',function(){
    return '<form action="login" method="post">' . csrf_field() . '
        <input type="text" name="username"/><br/>
        <input type="password" name="password"/><br/>
        <input type="submit" value="提交"/>
        </form>';
});

Route::post('login/',function(Request $request){
    dd($_SESSION);
    dd('已经接收到post提交的数据了',$request::all());
    //return '已经接收到post提交的数据了';
});
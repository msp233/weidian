<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Dingo\Api\Routing\Helpers;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\User;

class AuthorizationsController extends Controller
{
    use Helpers;

    //网页账号密码登录
    public function store(Request $request){
        if(!($token = auth('api')->attempt($request->only(['email','password'])))){
            return [
                'error'     => 4000,
                'message'   => '用户名或密码错误',
            ];
        }else{
            return [
                'error'     => 0,
                'token'   => $token,
                'message'   => '用户登录成功',
                'redirect'   => route('wap.member.index',['token'=>$token]),
            ];
        }
    }
    //微信登录
    public function socialStore(Request $request){
        //获取授权用户信息
        $wechatuser = session('wechat.oauth_user.default');

        $user = User::where('weixin_openid',$wechatuser->id)->first();
        //校验用户是否存在，不存在则记录至数据库
        if(!$user){
            $user = User::create([
                'name' => $wechatuser->name,
                'weixin_openid' => $wechatuser->id,
            ]);
        }
        return $this->response->array(['token'=>JWTAuth::fromUser($user)]);
    }

}

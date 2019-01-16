<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Controllers\Api\Traits\TraitsFormatData;

class AuthController extends Controller
{
    use TraitsFormatData;
    //用户登录，获取jwt
    public function login(Request $request){
        $data = $request->only('email','password');
        if(!($token = auth('api')->attempt($data))){
            return $this->TransFormat(40000,'email or password error ','登录错误');
        }else{
            return $this->TransFormat(10000,'login success',['token' => $token] );
        }
    }
    //重置令牌 刷新jwt
    public function refresh(Request $request){

        return $this->TransFormat(10000,'refresh success',['token' => auth('api')->refresh()] );
    }
    //退出登录，注销jwt
    public function logout(Request $request){
        auth('api')->logout();
        return $this->TransFormat(10000,'logout success');
    }
    //获取当前jwt对应的用户
    public function user(Request $request){
        return auth('api')->user();
    }
}

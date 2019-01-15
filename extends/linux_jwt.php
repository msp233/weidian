<?php
/**
 * Created by PhpStorm.
 * User: msp
 * Date: 2019/1/15
 * Time: 上午8:50
 */
$key = 'msp';
$time = time();
$payload = array(
    'data' => [
        'name' => 'tomcat',
        'email' => 'tomcat@163.com',
        'update_at' => '2019-01-01 00:00:01',
    ],
    'iss' => 'msp',//jwt签发者
    'sub' => '0987123',//jwt面向的用户
    'aud' => 'www.baidu.com',//接收jwt的地方
    'iat' => $time,//签名时间
    'nbf' => $time,//开始生效时间
    'exp' => $time+10,//过期时间，用unix时间戳
    'jti' => md5('id'),
);

//加密
$token = jwt_encode($payload,$key);
//echo $token;

try{
    $decoded = jwt_decode($token,$key,['jti'=>md5('id')]);
}catch (\Exception $e){
    $decoded = ['msg'=>'token不对'];
}
file_put_contents('logs.txt','token'.date('Y-m-d H:i:s',$time). "\n" . $token . "\n",8);
echo json_encode($decoded);
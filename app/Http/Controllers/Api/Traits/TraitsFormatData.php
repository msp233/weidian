<?php
/**
 * Created by PhpStorm.
 * User: msp
 * Date: 2019/1/14
 * Time: 下午3:22
 */

namespace App\Http\Controllers\Api\Traits;


Trait TraitsFormatData
{
    public function TransFormat($code,$msg,$data)
    {
        return [
            'code' => $code,
            'msg' => $msg,
            'data' => $data,
        ];
    }
}
<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class WechatMenuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $response = app('wechat.official_account')->server->serve();
        //输出
        $response->send();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id = 1)
    {
        //
        $buttons = [
            [
                'type' => 'view',
                'name' => '微店项目',
                'url' => 'https://www.spalcw.com/weidian/public/index.php'
            ],
            [
                'name' => '菜单',
                'sub_button' => [
                    [
                        'type' => 'view',
                        'name' => '搜索',
                        'url' => 'https://www.google.com/'
                    ],
                    [
                        "type" => "miniprogram",
                        "name" => "wxa",
                        "url" => "http://mp.weixin.qq.com",
                        "appid" => "wx286b93c14bbf93aa",
                        "pagepath" => "pages/lunar/index"
                    ],
                    [
                        "type" => "click",
                        "name" => "今日歌曲",
                        "key" => "V1001_TODAY_MUSIC"
                    ],
                ],
            ],
        ];
        return app('wechat.official_account')->menu->create($buttons);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

/*	卓研信息，公共方法
 */
var $_ZYXX = {

	/*	腾讯地图key
	 */
    //qqmap:'SJYBZ-RUA6I-DW5GN-5IIEE-6A5SV-VNBLL',  // 这是文世祥或者谢兴中的qq地图秘钥
    qqmap:'QJ6BZ-ILBWU-MGSV7-4YE3I-MI2U7-XIF5F',    // 这是友阿自己的qq地图秘钥

	/*	作者：陈明、谢兴中
	 * 	时间：2017-08-23
	 * 	功能：缓存当前会员的经纬度
	 * 	参数：	lat：纬度,
	 * 			lng：经度，
	 * 	返回值：无
	 */

    //判断是否支持localStorage 如果不支持抛出异常

    setLocation:function(lat,lng){
        // 获得当前时间
        var t = new Date().getTime()/1000;
        // 存储会员的经纬度到localStorage
        var cookieVlaue={
            "lat":lat,
            "lng":lng
        };
        if(window.localStorage){
            localStorage.setItem('positionLoc','{"lat":'+lat+',"lng":'+lng+',"time":'+t+'}');
        }else{
            $_ZYXX.setCookie('positionLoc',cookieVlaue);
        }
    },
    //	 * 	功能：cookie存储地理位置，存储时间5分钟认为合法   ---- 地理位置的名字

    setCookie:function (name,value){

        var Minutes=5;
        var exp  = new Date();    //new Date("December 31, 9998");
        var strCookie=JSON.stringify(vlaue);
        exp.setTime(exp.getTime() + Minutes*5*60*1000);
        document.cookie = name + "="+ strCookie + ";expires=" + exp.toGMTString();
    },
    getCookie:function (name)//取cookies函数
    {
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        if(arr != null) return (arr[2]);
        return null;
    },

	/*	作者：陈明、谢兴中
	 * 	时间：2017-08-23
	 * 	功能：获得localStorage里面存储的会员经纬度
	 * 	参数：无
	 * 	返回值：
	 * 		失败，（无数据或者经纬度已过期）返回false
	 * 		成功，返回object，包含：
	 * 			{
	 * 				lat：纬度,
	 * 				lng：经度，
	 * 				time：经纬度存储时的时间戳（精确到秒）
	 * 			}
	 */
    getLocation:function(){
        // 获取缓存里面存储的会员经纬度
        if(window.localStorage){
            var getPos	= localStorage.getItem('positionLoc');
        }else{
            var getPos=$_ZYXX.getCookie('positionLoc');
        }

        // 如果缓存里面没有，返回false
        if(!getPos) return false;
        // 将缓存的经纬度字符串转换为JSON
        getPos	= JSON.parse(getPos);
        // 判断是否缓存了时间，如果没有缓存时间，那么可以认为该数据不合法，返回false
        if(typeof(getPos.time) == 'undefined' || isNaN(getPos.time)) return false;
        // 得到当前的时间,方便下面对比
        var newdate = new Date().getTime()/1000;
        // 如果缓存已经过期，那么返回false
        if( (newdate-getPos.time) > 1800) return false;
        // 返回当前会员的经纬度
        return getPos;
    },


	/*	作者：陈明、文世祥
	 * 	时间：2017-08-31
	 * 	功能：存储会员的地理位置 --- 地理位置的名字
	 * 	参数：地理位置
	 *
	 * 	返回值：null
	 */
    bufferUserCurrLoc:function(addr){
        // 获得当前时间
        var t = new Date().getTime()/1000;
        // 存储会员地理位置
        localStorage.setItem('userCurrLoc','{"currloc":"'+addr+'","time":'+t+'}');
    },


	/*	作者：陈明、文世祥
	 * 	时间：2017-08-31
	 * 	功能：获取会员的地理位置，缓存5分钟认为合法   ---- 地理位置的名字
	 * 	参数：无
	 *
	 * 	返回值：正确，返回用户地理位置，否则返回false
	 */
    getUserCurrLoc:function(){
        // 获取缓存里面的会员的地理位置
        var getPos	= localStorage.getItem('userCurrLoc');
        // 如果缓存里面没有，返回false
        if(!getPos) return false;
        // 将缓存的字符串转换为JSON
        getPos = JSON.parse(getPos);
        // 判断是否缓存了时间，如果没有缓存时间，那么可以认为该数据不合法，返回false
        if(typeof(getPos.time) == 'undefined' || isNaN(getPos.time)) return false;
        // 得到当前的时间,方便下面对比
        var newdate = new Date().getTime()/1000;
        // 如果缓存已经过期，那么返回false
        if( (newdate-getPos.time) > 300) return false;
        // 返回当前会员的地理位置
        return getPos;
    },


	/*	作者：陈明
	 * 	时间：2017-08-23
	 * 	功能：通过两个位置的经纬度，获得他们之间的距离
	 * 	参数：lat1 	【必传】float	位置1的纬度
	 * 		lng1	【必传】float	位置1的经度
	 * 		lat2 	【必传】float	位置2的纬度
	 * 		lng3	【必传】float	位置2的经度
	 * 	返回值：
	 * 		失败，参数错误，返回空字符串：''
	 * 		成功，返回字符串，类似于：1.8千米、136米，这种体现距离的字符串
	 */
    distance:function(lat1, lng1, lat2, lng2) {
        // 如果参数错误，返回空字符
        if(!lat1 || !lng1 || !lat2 || !lng2) return '';
        // 圆周率整除
        var radLat1 = $_ZYXX.toRad(lat1);
        var radLat2 = $_ZYXX.toRad(lat2);
        var a = radLat1 - radLat2;
        var b = $_ZYXX.toRad(lng1) - $_ZYXX.toRad(lng2);
        // 通过计算得到两个点相对于地球中心点的比例
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        // 通过比例达到两点之间的距离
        s = s * 6378137;
        // 如果大于1000，那么取千米
        if(s>1000){
            s = s/10;
            s = parseInt(s);
            return (s/100)+'千米';
        }
        // 距离仅保留两位小数
        s = Math.round(s * 100) / 100;
        return s+'米'
    },


	/*	作者：陈明
	 * 	时间：2017-08-23
	 * 	功能：圆周率整除
	 * 	参数：d 	【必传】float	位置数据
	 * 	返回值：
	 * 		失败，参数错误，返回空字符串：''
	 * 		成功，返回字符串，类似于：1.8千米、136米，这种体现距离的字符串
	 */
    toRad:function(d) {
        return d * Math.PI / 180;
    },


	/*	作者：陈明
	 * 	时间：2017-09-09
	 * 	功能：使用浏览器获取当前会员的经纬度
	 * 	参数：	callBack 	【可选】object	回调函数
	 * 	返回值：无（会直接执行传递的回调函数）
	 */
    navigatorGeolocation:function(callBack) {
        // 如果微信没有获取到，那么用浏览器获取
        if (navigator.geolocation)  {
            // 如果当前浏览器支持经纬度获取
            navigator.geolocation.getCurrentPosition(callBack,function(error){
                // 20171208 添加 调试
                info = '';
                switch(error.code)
                {
                    case error.PERMISSION_DENIED:
                        info="User denied the request for Geolocation."
                        break;
                    case error.POSITION_UNAVAILABLE:
                        info="Location information is unavailable."
                        break;
                    case error.TIMEOUT:
                        info="The request to get user location timed out."
                        break;
                    case error.UNKNOWN_ERROR:
                        info="An unknown error occurred."
                        break;
                }

                // 如果会员拒绝获取当前位置
                callBack && callBack({coords:{latitude:false,longitude:false,info:info,weixin:1}});
            });
        } else {
            // 如果当前浏览器【不支持】经纬度获取
            // window[callBack]({coords:{latitude:false,longitude:false}});
            callBack && callBack({coords:{latitude:false,longitude:false,weixin:1}});
        }
    },


	/*
	 功能：获取微信公众号的基本信息，例如，appId,timestamp,nonceStr,signature
	 注意：使用之前要加载jquery文件
	 参数：	callBack 	【可选】string	回调函数名
	 返回：正确，返回数据对象，错误，返回false
	 修改为回调处理
	 */
    getWeixinBasicInfo:function (callBack) {
        $.ajax({
            url: '/wap/wxshare.html?url='+encodeURIComponent(document.location.href),
            type: 'get',
            dataType: 'json',
            success: function(rs){
                //var agentid = rs.agentid;
                var resArr = {
                    appid: rs.appId,
                    timestamp: rs.timestamp,
                    noncestr: rs.nonceStr,
                    signature: rs.signature
                };
                window[callBack](resArr);
            },
            error: function() {
                window[callBack](false);
            }
        });
    },

	/*
	 功能：通过微信获取经纬度
	 注意：要HTML文件里引入<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
	 参数：对象微信基本信息
	 返回：正确，返回数据对象，错误，返回false
	 修改为回调处理
	 */
    getLocationByWeixin:function(info, callBack) {
        // 如果不存在wx对象，那么直接执行callback方法
        if(typeof wx == 'undefined') window[callBack](false);

        //配置信息
        wx.config({
            debug		: false,
            appId		: info.appid,
            timestamp	: info.timestamp,
            nonceStr	: info.noncestr,
            signature	: info.signature,
            jsApiList	: 	[	// 接口列表
                'checkJsApi',
                'openLocation',
                'getLocation',
            ]
        });

        //通过ready接口处理成功验证
        wx.ready(function(){
            //判断当前客户端版本是否支持指定JS接口
            wx.checkJsApi({	// 需要检测的JS接口列表
                jsApiList: [
                    'getLocation'
                ],
                success: function(result) {
                    // 以键值对的形式返回，可用的api值true，不可用为false
                    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                    if (result.checkResult.getLocation == true){
                        //微信接口获取成功
                        wx.getLocation({
                            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                            success: function (res) {
                                var resArr = {
                                    // 纬度，浮点数，范围为90 ~ -90
                                    latitude: res.latitude,
                                    // 经度，浮点数，范围为180 ~ -180
                                    longitude: res.longitude,
                                    // 速度，以米/每秒计
                                    speed: res.speed,
                                    // 位置精度
                                    accuracy: res.accuracy,
                                };
                                window[callBack](resArr);
                            }
                        });
                    } else {
                        window[callBack](false);
                    }
                },
                error: function() {
                    window[callBack](false);
                }
            });
        });
    },


	/*
	 功能：通过经纬度，腾讯webservice_api逆地址解析，获取地理位置信息
	 参数：经纬度 ---- 保证数据是GPS的数据，其他类型的数据需要转换
	 参数：key ---- 腾讯位置服务开发者密钥 ----- 有域名访问限制
	 参数：设置返回数据类型或者形式 format
	 返回：正确，且format = 0 , 返回整个数据对象，获取format = 1 ，返回recommend的地址，否则返回false
	 修改为回调处理
	 */
    getAddrInfoByQQmapLocation:function(loc, key, format, callBack) {
        format = parseInt(format);
        var pointAddr = loc.latitude + ',' + loc.longitude;
        $.ajax({
            type : 'get',
            url : 'http://apis.map.qq.com/ws/geocoder/v1',
            dataType:'jsonp',
            jsonp:'callback',
            jsonpCallback: 'QQmap',
            data : {
                key:key,//开发密钥
                location: pointAddr,//位置坐标
                get_poi:'0',//是否返回周边POI列表：1.返回；0不返回(默认)
                coord_type: '1',	//gps
                output:"jsonp"
            },
            success : function(data) {
                var result = '';
                if(data.status == 0){
                    var address = data.result.formatted_addresses.recommend;
                    switch (format){
                        case 0 :
                            result = data;
                            break;
                        case 1 :
                            result = address;
                            break;
                        default :
                            result = false;
                    }
                }else {
                    result = false;
                }
                window[callBack](result);
            },
            error : function() {
                window[callBack](false);
            }
        });
    },

    //作者：谢兴中
    //时间：2017/9/4
    //功能：判断PC端，移动端设备
    //PC端返回true 移动端返回false
    IsPC:function(){
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
        }
        return flag;
    }
}
   
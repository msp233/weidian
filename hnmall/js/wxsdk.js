/**
 * 微信分享 -- 友阿微店
 * @param {Object} options 参数
 * @author <278500368@qq.com> 蛙哥
 *调用方法： 
 *          var wxsdk = YA_WX_SDK({
 *			    appUrl：'参数获取的url'
 *			});
 *			wxsdk.shareToTimeLine({
 *				//参数是官方要求的参数
 *			}) 分享到朋友圈
 *
 */
function YA_WX_SDK(options) {
	var canUseWeixinSDK = false;
	var title=options.title;
	var link = options.link;
	var desc = options.desc;
	var type = options.type||'news';
	var checkIsWeixin = function (){
		var ua = window.navigator.userAgent;
		var reg = /MicroMessenger/i;
		return reg.test(ua);
	};
	var checkSDKisExist = function(){
		if(typeof wx !=="undefined" && wx.config){
			return;
		}
		var weixin = document.createElement('script'); 
		weixin.type = 'text/javascript'; 
		weixin.async = true; 
		weixin.src = '//res.wx.qq.com/open/js/jweixin-1.1.0.js'; 
		var head = document.getElementsByTagName('head')[0]; 
		head.appendChild(weixin);	
	};
	var isFunction = function(target){
		var type = ({}).toString.call(target);
		return type === '[object Function]';
	}
	var checkAgentId=function(url){
		var str = url.split('?');
		var result = false;
		if(str.length<2||str[1]===''){
			return result;
		}
		var arr = str[1].split('&');
		for(var i=0,length=arr.length;i<length;i++){
			if(arr[i].indexOf('agentid')!== -1){
				result = true;
			}
		}
		return result;
	}
	var sharelog = function(data){
		$.ajax({
            url: '/wap/wxaddsharelog.html',
            type: 'post',
            data:data,
            dataType: 'json',
            success: function(rs) {
            //分享日志成功
            	//alert(rs)
            }
        });
	}
	var jsApiList = [
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ',
			'onMenuShareWeibo',
			'onMenuShareQZone'
		];
	var shareConfig = {
		title: '', // 分享标题
		desc: '', // 分享描述
		link: '', // 分享链接
		imgUrl: '', // 分享图标
		success: function() {
			// 用户确认分享后执行的回调函数
			sharelog({
				type :type,
				title:title,
				link:link,
				desc:desc
			});
		},
		cancel: function() {
			// 用户取消分享后执行的回调函数
			//isFunction(opt.cancel)&&opt.cancel();
		}
	}
	
	for(var name in options){
		if(options.hasOwnProperty(name)){
			shareConfig[name] = options[name];
		}
	}
 
	if (checkIsWeixin()) {
		checkSDKisExist();
		$.ajax({
	        url: '/wap/wxshare.html?url='+encodeURIComponent(link),
	        type: 'get',
	        dataType: 'json',
	        success: function(rs) {
		        var appId = rs.appId;
		        var timestamp = rs.timestamp;
		        var nonceStr = rs.nonceStr;
		        var signature = rs.signature;
		        var _link = shareConfig.link;
		        if(!checkAgentId(_link)){
		        	if(_link.indexOf('?')!== -1){
						link = _link+'&agentid='+rs.agentid;
		        	}else{
		        		link = _link+'?agentid='+rs.agentid;
		        	}
				}
		        wx.config({
		            debug: false,
		            appId: appId,
		            timestamp: timestamp,
		            nonceStr: nonceStr,
		            signature: signature,
		            jsApiList: [
		              'checkJsApi',
		              'onMenuShareTimeline',
		              'onMenuShareAppMessage',
		              'onMenuShareQQ',
		              'onMenuShareWeibo',
		              'onMenuShareQZone'
		            ]
		        });
		       	wx.ready(function () {
			        //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
					wx.onMenuShareTimeline(shareConfig);
					//获取“分享给朋友”按钮点击状态及自定义分享内容接口
					wx.onMenuShareAppMessage(shareConfig);
					//获取“分享到QQ”按钮点击状态及自定义分享内容接口
					wx.onMenuShareQQ(shareConfig);
					//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
					wx.onMenuShareWeibo(shareConfig);
					//获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
					wx.onMenuShareQZone(shareConfig);
		        });
			}
		}); 
	}
}
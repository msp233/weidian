"use strict";

$(document).ready(function(){
	bootstrap();
});


var lock = false;
var totalPages = 3;
var pageIndex = 1;

function bootstrap(){
	gotop();
	scrollLoad(fetchData);
}

function fetchData(){
	var url = 'http://192.168.0.95:81/test.php';//替换成线上url
	if(pageIndex>=totalPages){
		document.getElementById('end').style.display = 'block';
		return;
	}
	spinner.show();
	if(lock) return;
	lock = true;
	//模拟ajax  
	setTimeout(function(){
		var d = {
	        	id:'NO20161110124934',
	        	imgsrc:'http://youam.yunyiwd.com/user_res/upload/temp/201611/02/7655136872970692060_thumbnail.jpg',
	        	title:'【限量100组&nbsp;买一送一】杨记老豆秘制豆辣酱原味买210g送90g&nbsp;味道醇厚&nbsp;席卷味蕾&nbsp;口感鲜香&nbsp;美味开胃&nbsp;包邮',
	        	price:'5700.0',
	        	num:1,
	        	total:'5999.0',
	        	status:'已完成'
	        };
        var res={data:[d,d,d,d,d,d,d,d]} //模拟ajax结果
        setGoodsList(res.data);
        pageIndex++;
        lock = false;
        spinner.hide();
	},1000)
}

function setGoodsList(data){
	var oFrag = document.createDocumentFragment();
	var container = document.getElementById('page-box');
	data.forEach(function(item){
		var div = document.createElement('div');
		div.className='order-list';
		div.innerHTML= setInnerHtml(item);
		oFrag.appendChild(div);
	});
	container.appendChild(oFrag);
}

function setInnerHtml(data){
	return (
		'<div class="order-id">订单号：'+data.id+'</div>'+
			'<ul>'+
				'<li><a href="orderdetails.html">'+
				'<div class="pic">'+
					'<img src="'+data.imgsrc+'">'+
					'<em>'+data.status+'</em>'+
				'</div>'+
				'<p class="name">'+data.title+'</p>'+
				'<p class="txt"></p>'+
				'<p class="pricebox"><em class="price">￥'+data.price+'</em><em class="num">数量：'+data.num+'</em></p>'+
			'</a></li>'+
		'</ul>'+
		'<div class="totelprice">总价:<em>￥'+data.total+'</em></div>'+
		'<div class="viewlogistics"><a href="logistics.html">查看物流</a></div>');
}

 
 
"use strict";

$(document).ready(function(){
	bootstrap();
});


var lock = false;
var totalPages = 3;
var pageIndex = 1;

function bootstrap(){
	switchItems();
	gotop();
	scrollLoad(fetchData);
}

function switchItems(){
	var nav = $('.orders-nav');
	var items = nav.children();
	var activeIndex = 0;
	$('.orders-nav').on('click',function(e){
		var index = e.target.dataset.id;
		if(index !== activeIndex){
			items.eq(activeIndex).removeClass('active');
			items.eq(index).addClass('active');
			activeIndex = index;
			fetchItemList(activeIndex)
		}
	});
}

function fetchItemList(type){
	var container = document.getElementById('order-list');
	spinner.show();
	container.style.display = 'none';
	//模拟ajax
	setTimeout(function(){
		container.style.display = 'block';
		//ajax....
		spinner.hide();
	},1000);
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
	        	id:'NO2016102076033',
	        	buyer:'张良',
	        	imgsrc:'http://youam.yunyiwd.com/user_res/upload/temp/201607/28/476513704833221395_thumbnail.jpg',
	        	title:'【顺丰全国包邮&nbsp;6个尝鲜装】国家地理标志商品&nbsp;四川蒲江黄心猕猴桃&nbsp;中、大、特大果各2个&nbsp;蒲江基地直发',
	        	price:'5700.0',
	        	bouns:'33.4',
	        	total:'88.8',
	        	date:'2016-10-20 11:04:35',
	        	status:'已完成',
	        	type:'分销',
	        	num:1
	        };
        var res={data:[d,d,d,d,d,d,d,d]} //模拟ajax结果
        setDataList(res.data);
        pageIndex++;
        lock = false;
        spinner.hide();
	},1000)
}

function setDataList(data){
	var oFrag = document.createDocumentFragment();
	var container = document.getElementById('order-list');
	data.forEach(function(item){
		var li = document.createElement('li');
		li.innerHTML= setInnerHtml(item);
		oFrag.appendChild(li);
	});
	container.appendChild(oFrag);
}

function setInnerHtml(data){
	return('<div class="box">'+'<span>买家:'+data.buyer+'</span>'+'<span class="status">'+data.status+'</span></div>'+
				'<div class="box ui-color-1">'+
					'<span>订单号：'+data.id+'</span>'+
					'<span class="order-time">'+data.date+'</span>'+
				'</div>'+
				'<div class="goods">'+
					'<div class="pic-box">'+
						'<img src="'+data.imgsrc+'" alt="">'+
						'<span>'+data.type+'</span>'+
					'</div>'+
					'<div class="info">'+
						'<p class="goods-desc">'+data.title+'</p>'+
						'<p>售价:'+
							'<em class="ui-color-9">￥'+data.price+'</em>'+
						'</p>'+
						'<p>奖金:'+
							'<em class="ui-color-9">￥'+data.bouns+'</em>'+
						'</p>'+
						'<span class="tag">×'+data.num+'</span>'+
					'</div>'+
				'</div>'+
				'<div class="box2">'+
					'<span class="ui-color-10">总奖金:<em class="ui-color-9">￥'+data.total+'</em></span>'+
				'</div>'+
				'<div class="box3">'+
					'<a href="logistics.html">查看物流</a>'+
					'<a href="logistics.html">查看详情</a>'+
				'</div>');
}
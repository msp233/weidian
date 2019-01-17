"use strict";


$(document).ready(function(){
	bootstrap();
});

var DATA = {
	lock:false,
	totalPages:3,
	pageIndex:1,
	images:[]
}

function bootstrap(){
	initSlideBanner();
	new SwiperNav('nav-box',function(index){
		sortGoodsList(index)
	});
	initSortOrder();
	scrollLoad(fetchGoods);
	handleClickSaleOn();
	gotop();
	lazyload();
}

function initSortOrder(){
	var nav = document.getElementById('sort-nav');
	var sort = new Sortplan(nav,function(type,order){
		sortGoodsList(type,order)
	});
}

function initSlideBanner(){
	var mySwiper = new Swiper ('#banner', {
    	loop: true
  })      
}

function lazyload() {
	var winHeight = $(window).height();
	window.addEventListener('scroll', function(e) {
		var scrollTop = $(window).scrollTop();
		if (DATA.images.length > 0) {
			DATA.images.forEach(function(item, i) {
				var offsetTop = $(item).parent().offset().top;
				var src = item.dataset.src;
				if (winHeight + scrollTop > offsetTop && src) {
					item.src = src;
					item.style.opacity = 1;
					DATA.images.splice(i, 1);
				}
			});
		}
	});
}

function sortGoodsList(type,order){
	spinner.show();
	document.getElementById('end').style.display = 'none';
	var container = document.getElementById('goods-list');
	container.style.display = 'none';
	console.log(type,order);
	//模拟ajax
	setTimeout(function(){
		spinner.hide();
		container.style.display = 'block';
	},1000);
}

function fetchGoods(){
	var url = 'http://192.168.0.95:81/test.php';//替换成线上url
	if(DATA.pageIndex>=DATA.totalPages){
		document.getElementById('end').style.display = 'block';
		return;
	}
	spinner.show();
	if(DATA.lock) return;
	DATA.lock = true;
	//模拟ajax  
	setTimeout(function(){
		var d = {
	        	id:'1',
	        	imgsrc:'http://youam.yunyiwd.com/user_res/upload/temp/201607/28/476513704833221395_thumbnail.jpg',
	        	title:'远大空气净化机TB400&nbsp;专业净化&nbsp;静电除菌&nbsp;消除甲醛&nbsp;三层过滤&nbsp;&nbsp;缺氧监测使用面积40-60方&nbsp;包邮',
	        	price:5700.0,
	        	saler:4697,
	        	bonus:490.0,
	        	remain:5999
	        };
        var res={data:[d,d,d,d,d,d,d,d]} //模拟ajax结果
        setGoodsList(res.data);
        DATA.pageIndex++;
        DATA.lock = false;
        spinner.hide();
	},1000)
}

function setGoodsList(data){
	var oFrag = document.createDocumentFragment();
	var container = document.getElementById('goods-list');
	data.forEach(function(item){
		var li = document.createElement('li');
		li.innerHTML= setInnerHtml(item);
		var img = li.querySelector('.lazy');
		DATA.images.push(img);
		oFrag.appendChild(li);
	});
	container.appendChild(oFrag);
}

function setInnerHtml(data){
	return ('<div class="pic" data-id="'+data.id+'" data-url="'+data.url+'">'+
			'<img class="lazy" src="data:image/gif;base64,R0lGODdhAQABAPAAAP%2F%2F%2FwAAACwAAAAAAQABAEACAkQBADs%3D" data-src="'+data.imgsrc+'" alt=""></div>'+
    			'<p class="goods-desc">'+data.title+'</p>'+
    			'<p><span class="red-color">￥'+data.price+'</span>'+
    				'<span class="sale-num">有<em class="red-color">'+data.saler+'</em>人在卖</span></p>'+
    			'<p><span>奖金总额<em class="red-color">￥'+data.bonus+'</em></span>'+
    				'<span class="sale-num">剩余'+data.remain+'件</span></p>'+
    			'<p class="btn-box"><i class="icon-sale-up"></i></p>');
}

/**
 * 确认选品上架
 */
function handleClickSaleOn(){
	var list = document.getElementById('goods-list');
	var guide = document.getElementById('guide');
	var ercode = document.getElementById('ercode');
	var mask = document.getElementById('mask');
    var item = null;
    var showbox = function(text){
		var box = mask.children[0];
		var content = box.children[1];
		content.innerHTML = text;
		mask.style.display = 'block';
	}
	list.addEventListener('click',function(e){
		var type = e.target.className;
		var text = '';
		item = e.target.parentNode.parentNode;
		switch(type){
			case 'icon-sale-up':
				text = item.children[1].innerHTML;
				showbox('确认上架 '+text);
				break;
			case 'icon-sale-down':
				text = item.children[1].innerHTML;
				showbox('确认下架 '+text);
				break;
			case 'icon-share':
				guide.style.display='block';
				break;
			case 'icon-text-scheme':
				location.href='spreading.html';
				break;
			case 'icon-er-code':
				var url = e.target.dataset.url;
				ercode.querySelector('img').src='images/pages/mmexport1487757957079.jpg';
				ercode.style.display='block';
				break;
			default:
				var url = lookback(e.target,list);
				if(url){
					location.href=url;
				}
				break;
		}
	});

	guide.addEventListener('click',function(){
		guide.style.display = 'none';
	});
	ercode.addEventListener('click',function(e){
		if(e.target.className==='close'){
			ercode.style.display='none';
		}
	});
	mask.addEventListener('click',function(e){
		var name = e.target.className;
		if(name=='sure'){
			if(item){
				var id = item.children[0].dataset.id;
				list.removeChild(item);
				console.log(item);
				//ajax ...
			}
			mask.style.display='none';
		}else if(name=='close'||name=='cancel'){
			mask.style.display='none';
		}
		return false;
	},false); 
}

/**
 * 反向查找
 */
function lookback(target,parent){
	var url = '';
	while(target !== parent){
		if(target.tagName.toLowerCase()==='li'){
			url = target.children[0].dataset.url;
			break;
		}
		target = target.parentNode;
	}
	return url;
}
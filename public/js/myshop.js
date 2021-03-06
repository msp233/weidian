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
	        	id:'3',
	        	imgsrc:'http://youam.yunyiwd.com/user_res/upload/temp/201610/27/115396241508081982.jpg',
	        	title:'【顺丰全国包邮&nbsp;6个尝鲜装】国家地理标志商品&nbsp;四川蒲江黄心猕猴桃&nbsp;中、大、特大果各2个&nbsp;蒲江基地直发',
	        	price:'570.0',
	        	marketPrice:'1333.4'
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
	var container = document.getElementById('goods-list');
	data.forEach(function(item){
		var li = document.createElement('li');
		li.innerHTML= setInnerHtml(item);
		oFrag.appendChild(li);
	});
	container.appendChild(oFrag);
}

function setInnerHtml(data){
	return('<a href="#">'+
			'<span><img src="'+data.imgsrc+'" alt=""></span>'+
			'<p>'+data.title+'</p>'+
					'<b>￥'+data.price+'</b>'+
					'<em>￥'+data.marketPrice+'</em>'+
					'<i>马上抢</i>'+
				'</a>');
}
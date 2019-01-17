var lock = false;
var totalPages = 3;
var pageIndex = 1;

$(document).ready(function(){
	gotop();
	scrollLoad(fetchData);
});


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
	        	imgsrc:'http://youam.yunyiwd.com/user_res/upload/temp/201609/18/7852381289710419501_small.jpg',
	        	title:'HanSir推销了1个商品',
	        	date:'2016-10-27 19:13:25',
	        	status:'待收货',
	        	bouns:'0.59',
	        	type:'奖金'
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
	var container = document.getElementById('income-list');
	data.forEach(function(item){
		var li = document.createElement('li');
		li.innerHTML= setInnerHtml(item);
		oFrag.appendChild(li);
	});
	container.appendChild(oFrag);
}

function setInnerHtml(data){
	return('<div class="icpic"><img src="'+data.imgsrc+'" alt=""></div>'+
			'<div class="middle">'+
				'<p class="color-5">'+data.title+'</p>'+
				'<p class="color-7">'+data.date+'</p>'+
				'<p class="color-6">'+data.status+'</p>'+
			'</div>'+
			'<div class="money">'+
				'<span class="kz">+'+data.bouns+'</span>'+
				'<span class="kz">'+data.type+'</span>'+
			'</div>');
}

$(document).ready(function(){
	gotop();
	scrollLoad(fetchData);
	if(DATA.totalPages<1){
		document.getElementById('no-data').style.display = 'block';
	}
});

function fetchData(){
	var url = 'http://192.168.0.95:81/test.php';//替换成线上url
	var pageIndex = DATA.pageIndex +1;
	if(pageIndex>DATA.totalPages){
		document.getElementById('end').style.display = 'block';
		return;
	}
	spinner.show();
	if(DATA.lock) return;
	DATA.lock = true;
	//模拟ajax  
	setTimeout(function(){
		var d = {
	        	id:'3',
	        	date:'2016-10-27 19:13:25',
	        	bouns:'0.59'
	        };
        var res={data:[d,d,d,d,d,d,d,d]} //模拟ajax结果
        setDataList(res.data);
        DATA.pageIndex=pageIndex;
        DATA.lock = false;
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
	return(
			'<div class="middle">'+
				'<p class="color-1">微信提现</p>'+
				'<p class="color-7">'+data.date+'</p>'+
			'</div>'+
			'<div class="money">'+
				'<span class="color-2">+'+data.bouns+'</span>'+
				'<span class="color-3">已提现</span>'+
			'</div>');
}
"use strict";
/**
 * 重写原型方法
 */
Sortplan.prototype.init=function(){
	var node = this.node.children[1];
	var icon = node.querySelector('i');
	var order = this.order;

	icon.className = this.classNames[order];
	this.icon = icon;
	this.node.addEventListener('click',this,false);
}


$(document).ready(function(){
	DATA.lock=[false,false]; //忙碌锁
	DATA.atEnd = [false,false];//到底
	DATA.activeIndex=0;//默认显示粉丝
	bootstrap();
});


function bootstrap(){
	var nav = document.getElementById('sort-nav');
	var slider=document.getElementById('slider-wrap');
	var sort = new Sortplan(nav,function(type,order){
		var activeIndex = DATA.activeIndex;
		var activeItem = slider.children[activeIndex];
		DATA.orderBy = filterType(type,order);
		activeItem.innerHTML = '';
		DATA.pageIndex[activeIndex]=0;
		DATA.lock[activeIndex] = false;
		//console.log(type,order)
		fetchGoods();
	});
	DATA.slider = slider;
	navSwitch();
	searchFans();
	gotop();
	scrollLoad(fetchGoods);
}

function searchFans(){
	var slider = DATA.slider;
	var activeIndex = DATA.activeIndex;
	var activeItem = slider.children[activeIndex];
	$('.fans-search').on('click',function(e){
		if(e.target.className==='ss'){
			var value = this.querySelector('input').value;
			if(value===''){
				return;
			}
			DATA.pageIndex[activeIndex] = 1;
			DATA.lock[activeIndex] = false;
			spinner.show();
			activeItem.innerHTML = '';
			$.ajax({
				url:'http://192.168.0.95:81/test.php',
				dataType:'json',
				data:{
					keyword:value
				},
				success:function(res){
					var list = formatData(res.result);
					DATA.totalPages[activeIndex] = res.totalPages;
	 				setGoodsList(list);
			        DATA.lock[activeIndex] = false;
			        spinner.hide();
				}
			});
		}
	})
}

function filterType(type,order){
	var orderBy = 0;
	switch(type){
		case 0:
			orderBy=(order==='asc')?0:1;break;
		case 1:
			orderBy=(order==='asc')?2:3;break;
		case 2:
			orderBy=(order==='asc')?4:5;break;
		break;
	}
	return orderBy;
}

/**
 * 切换TAB
 */
function navSwitch(){
	var fans = $('.fans-nav');
	var activeItem = fans.children('.active');
	var activeIndex = DATA.activeIndex;
	var slider = $(DATA.slider);
	hideLazyItem(slider);
	$('.fans-nav').on('click',function(e){
		if(e.target.tagName=='LI'){
			var index = parseInt(e.target.dataset.id);
			var type = (index === 0) ? '1' : '1,2';
			if(index === activeIndex){
				return;
			}
			slider.children().eq(index).css('height','auto');
			activeIndex = index;
			DATA.type = type;
			DATA.activeIndex = activeIndex;
			DATA.lock[activeIndex] = false;
			activeItem.removeClass('active');
			activeItem = $(e.target).addClass('active');
			if(activeIndex===1){
				slider.removeClass('in').addClass('out');
			}else{
				slider.removeClass('out').addClass('in');
			}
			hideLazyItem(slider);
		}
	});
}

/**
 * 数据格式化
 */
function formatData(data) {
	var list = [];
	if($.isArray(data)&&data.length > 0){
		data.forEach(function(item){
			list.push({
				id:item.id,
				//aid:item.agent_id,
				//fid:item.fans_id,
		 		nick:item.fans_name,
		 		total:item.paymenttotal,
		 		sold:item.itemnumtotal,
				level:item.lv_name
			})
		});
	}
	return list;
}

/**
 * 获取数据
 */
function fetchGoods(){
	var url = 'http://192.168.0.95:81/test.php';//测试api
	//var url = 'http://wd.hnmall.com/index.php/api';
	var activeIndex = DATA.activeIndex;
	var pageIndex = DATA.pageIndex[activeIndex];
	if(pageIndex>=DATA.totalPages[activeIndex]){
		showEnd(activeIndex);
		return;
	}
	pageIndex++;
	spinner.show();
	if(DATA.lock[activeIndex]) return;
	DATA.lock[activeIndex] = true;
 	$.ajax({
 		url:url,
 		type:'POST',
 		dataType:'json',
 		timeout:3000,
 		data:{
 			format:'json',
 			v:'v1',
 			level:DATA.type,
 			p:pageIndex,
 			cnt:DATA.pageSize,
 			order_by:DATA.orderBy
 		},
 		success:function(res){
 			if(res && res.result){
 				var list = formatData(res.result);
 				setGoodsList(list);
 				DATA.pageIndex[activeIndex]=pageIndex;
		        DATA.lock[activeIndex] = false;
		        spinner.hide();
 			}
 		},
 		error:function(err){
 			console.log(err.error)
 			DATA.lock[activeIndex] = false;
		    spinner.hide();
 		}
 	});
}

function setGoodsList(data){
	var oFrag = document.createDocumentFragment();
	var slider = DATA.slider;
	var container = slider.children[DATA.activeIndex];
	data.forEach(function(item){
		var li = document.createElement('ul');
		li.className='sort-nav';
		li.innerHTML= setInnerHtml(item);
		oFrag.appendChild(li);
	});
	container.appendChild(oFrag);
}

function setInnerHtml(data){
	return ('<li>'+data.nick+'</li>'+
			'<li>'+data.total+'</li>'+
			'<li>'+data.sold+'</li>'+	
	        '<li>'+data.level+'</li>');
}

function showEnd(activeIndex){
	if(DATA.atEnd[activeIndex]||DATA.totalPages[activeIndex]===1){
		return;
	}
	var slider = DATA.slider;
	var container = slider.children[activeIndex];
	var node = document.createElement('div');
	node.className='no-more';
	node.style.display='block';
	node.innerHTML='没有更多数据';
	container.appendChild(node);
	DATA.atEnd[activeIndex]=true;
}

function hideLazyItem(slider){
	var activeIndex = DATA.activeIndex;
	var index = Math.abs(activeIndex-1);
	slider.children().eq(index).css('height','100px');
}
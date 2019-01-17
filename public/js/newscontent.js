"use strict";


$(document).ready(function(){
	bootstrap();
});

function bootstrap(){
	giveALike();
}

/**
 * 点赞
 */
function giveALike(){
	var node = $('#give-a-like');
	var items = node.children();
	var read = items.eq(0);
	var like = items.eq(1);
	var mount = read.find('span');
	var count = parseInt(mount.text(),10)||0;
	var isActive = like.hasClass('active');
	node.on('click',function(){
		if(isActive){
			Dialog.tips('已经赞过了哦');
			return;
		}
		//模拟ajax
		setTimeout(function(){
			like.addClass('active');
			mount.text(++count);
			isActive = true;
		},1000);
	});
}


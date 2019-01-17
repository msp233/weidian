"use strict";

$(document).ready(function(){
	 bootstrap();
});

function bootstrap(){
	hideBox();
	activeFooter(3);
}

function myfans(){
	var level = 10;
	if(level){
		location.href="share.html";
	}else{
		$('#mask').show(); 
	}
	
}

function hideBox(){
	$('#mask').on('click',function(e){
		if(e.target.className==='read'){
			$(this).hide();
		}
	});
}

function activeFooter(index){
	var footer = $('.nav-bar');
	var items = footer.children();
	var activeItem = items.eq(index);
	activeItem.addClass('active');
}
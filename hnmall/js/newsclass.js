"use strict";

$(document).ready(function(){
	bootstrap();
});

function bootstrap(){
	var app = document.getElementById('app');
	var isActive = true;
	var activeItem = app.children[0];
	app.addEventListener('click',function(e){
		if(e.target.className==='newslist-nav'){
			if(activeItem !== e.target.parentNode){
				activeItem.className='';
				isActive = false;
			}
			activeItem = e.target.parentNode;
			if(isActive){
				activeItem.className='';
				isActive = false;
			}else{
				activeItem.className='active';
				isActive = true;
			}
		}
	})
}
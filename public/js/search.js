"use strict";

$(document).ready(function(){
	bootstrap();
});

function bootstrap(){
	$('header').on('click',function(e){
		if(e.target.className==='icon-x'){
			$(this).find('input').val('');
		}else if(e.target.className==='search-btn'){
			alert($(this).find('input').val())
		}
	})
}
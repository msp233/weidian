"use strict";

var Data = {
	needInvoice:false
};

$(document).ready(function(){
	bootstrap();
});

function bootstrap(){
	var picker = document.querySelector('.number-picker');
	new Picker({
		element:picker,
		value:1,//默认数量
		callback:function(num){
			ajaxUpdate(num);
		}
	});

	if(Data.needInvoice){
		//如果开票则展开
		$('#switch').addClass('open').parent().parent().next().show();
	}

	$('#app').on('click',function(e){
		if(e.target.id==='switch'){
			return handleSwitch($(e.target));
		}
	});
}

/**
 * 是否开票
 */
function handleSwitch(target){
	if(Data.needInvoice){
		target.removeClass('open');
		target.parent().parent().next().hide();
		Data.needInvoice = false;
	}else{
		target.addClass('open');
		target.parent().parent().next().show();
		Data.needInvoice = true;
	}
}

/**
 * 异步更新数量变化
 */
function ajaxUpdate(num){
	$('#buyed').text(num);
	//ajax.post(url,{num:num},function(res){....})
	$('#total').text(num*100);
}
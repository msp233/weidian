"use strict";

$(document).ready(function(){
	handleChangeItem();
	handleSubmit();
})

function handleChangeItem(){
	var node = $('.withdrawal-rmb');
	var activeItem = node.children().eq(0);
	var input = $('#total');
	node.on('click',function(e){
		activeItem.removeClass('active');
		activeItem = $(e.target);
		activeItem.addClass('active');
		input.val(activeItem.data('v'));
	});
}

function handleSubmit(){
	var input = $('#total');
	var node = $('#max');
	$('.btn-save').on('click',function(e){
		var total = parseFloat(input.val());
		var max = parseFloat(node.text());
		if(!total){
			new Dialog('请输入正确的金额！',{
				onlyConfirm:true
			});
		}else if(total<1){
			new Dialog('提取金额必须大于1元',{
				onlyConfirm:true
			});
		}else if(total>max){
			new Dialog('提取余额不够',{
				onlyConfirm:true
			});
		}else{
			new Dialog('确认提现'+total+'元',{
				onConfrim:function(){
					handleConfirm();
				}
			});
		}
	})
}

function handleConfirm(){
	new Dialog('申请成功，请等待审核',{
		onlyConfirm:true,
		onConfrim:function(){
			$('#max').text(0);
			$('#total').val(0);
			$('.withdrawal-rmb li').last().data('v',0);
		}
	});
}
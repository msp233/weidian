"use strict";

$(document).ready(function(){
	bootstrap();
});

function bootstrap(){
	$('#photo').on('change',function(e){
		preview(e.target);
	});

	$('#backimg').on('change',function(e){
		preview(e.target);
	});
}

function preview(target){
	var file = target.files[0];
	var type = file.type.split("/")[0];
	if(type!=='image'){
		Dialog.tips('无法识别的图片格式!');
		return;
	}
	var fileUrl = window.URL.createObjectURL(file);
	$(target).parent().find('img').attr('src',fileUrl)
}

function upload(file, pos) {
    var formData = new FormData();
     
}
                 
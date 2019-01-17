var spinner = {
	show:function(){
		if(!this.node){
			this.node = document.querySelector('.spinner-box');
		}
		this.node.style.display='block';
	},
	hide:function(){
		this.node.style.display='none';
	}
}
/**
 * 可滑动和下拉展开的菜单
 * @param {string} id 滑动菜单包裹元素的id
 * @param {Function} callback 点击回调函数
 * @auuthor <278500368@qq.com> 蛙哥
 */

function SwiperNav(id,callback){
	this.navBox = document.getElementById(id);
	this.menu =  this.navBox.children[0];
	this.activeIndex=0;
	this.navSwiper = new Swiper(this.menu, {				
		slidesPerView: 4
		//slideToClickedSlide:true
    });
    this.callback = callback || function(){};
    this.bindEvent();
}

/**
 * 邦定事件
 */
SwiperNav.prototype.bindEvent=function(){
	this.clickMenuArrow();
	this.clickMenuItem();
	this.clickGirdItem();
}

/**
 * 标记当前选择的菜单
 */
SwiperNav.prototype.updateActiveItem=function(index){
	var activeIndex = this.activeIndex;
	var slides = this.navSwiper.slides;
	if(index !== activeIndex){
		slides[activeIndex].children[0].className='';
		slides[index].children[0].className='active';
		this.activeIndex = index;
		this.callback(index);
	}
}

/**
 * 点击菜单项
 */
SwiperNav.prototype.clickMenuItem=function(index){
	var that = this;
	var nav = $(this.navBox.children[1]);
	var grid = $(this.navBox.children[2]);
	this.menu.addEventListener('click',function(e){
    	if(e.target.dataset.id){
    		var index = parseInt(e.target.dataset.id);
    		that.updateActiveItem(index);
    		if(nav.hasClass('active')){
    			nav.removeClass('active');
    			grid.hide();
    		}
    	}
    });
}

/**
 * 点击菜单按钮
 */
SwiperNav.prototype.clickMenuArrow=function(){
	var that = this;
	$(this.navBox.children[1]).on('click',function(){
		that.toggleNavMenu();
	});
}

/**
 * 菜单展开和收缩
 */
SwiperNav.prototype.toggleNavMenu=function(){
	var nav = $(this.navBox.children[1]);
	var grid = $(this.navBox.children[2]);
	if(nav.hasClass('active')){
		nav.removeClass('active');
		grid.hide();
	}else{
		nav.addClass('active');
		grid.show();
	}
} 
/**
 * 点击菜单展开项
 */
SwiperNav.prototype.clickGirdItem=function(){
	var grid = $(this.navBox.children[2]);
	var that = this;
	var prevActive = grid.children().eq(0);
 	that.setGirdActiveItem(prevActive,true);
 	grid.on('click',function(e){
 		var target = $(e.target);
 		var index = parseInt(target.data('id'));
 		if(index>-1){
 			if(prevActive){
 				that.setGirdActiveItem(prevActive,false);
 			}
 			that.setGirdActiveItem(target,true);
 			prevActive = target;
			that.updateActiveItem(index);
			that.navSwiper.slideTo(index);
			that.toggleNavMenu();
		}
 	});
}
/**
 * 高亮选择中项
 */
SwiperNav.prototype.setGirdActiveItem=function(item,isActive){
	var color = isActive?'#e21742':null;
	item.css('color',color);
}

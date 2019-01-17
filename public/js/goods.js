"use strict";

var N = {};

$(document).ready(function(){
	var node = $('.goods-tools').children().eq(1);
	N.toolbar = new Toolbar('.popsize');
	N.collect = new Collect(node);
	N.numberpicker = new NumberPicker('.noptem-size');
	bindEvent();
	initSwiper();
	gotop();
})

function initSwiper(){
	var mySwiper = new Swiper ('.swiper-container', {
    loop: true
  })      
}

function Toolbar(tag){
	this.node = $(tag);
	this.isReady=false;
	this.active='active';
}

Toolbar.prototype = {
	show:function(){
		this.node.addClass(this.active);
		this.isReady=true;
	},
	hide:function(){
		this.node.removeClass(this.active);
		this.isReady = false;
	},
	buy:function(){
		window.location.href='orderdetails.html';
	}
}

function Collect(tag){
	this.node = $(tag);
	this.active = 'active';
	this.isActive = this.node.hasClass(this.active)?true:false;
}

Collect.prototype={
	save:function(){
		this.isActive = true;
		this.node.addClass(this.active);
	},
	cancel:function(){
		this.isActive = false;
		this.node.removeClass(this.active);
	}
}

function NumberPicker(tag){
	var node = $(tag);
	var btns = node.children();
	this.node = node;
	this.buyed = 1;
	this.plus = btns.eq(0);
	this.input = btns.eq(1);
	this.minus = btns.eq(2);
	this.max = 1000;
	this.min = 1;
	this.bindEvent();
}

NumberPicker.prototype={
	bindEvent:function(){
		var self = this;
		this.node.on('click',function(e){
			if(e.target.value==='+'){
				self.handlePlus();
			}else if(e.target.value==='-'){
				self.handleMinus();
			}
		});
	},
	handlePlus:function(){
		if(this.buyed>=this.max){
			return;
		}
		var buyed = this.buyed+1;
		this.input.val(buyed);
		this.buyed = buyed;
	},
	handleMinus:function(){
		if(this.buyed<=this.min){
			return;
		}
		var buyed = this.buyed-1;
		this.input.val(buyed);
		this.buyed = buyed;
	}
}

function tosell(){
	alert('接口开发中')
}

function bindEvent(){
	var b = N.toolbar,
		c = N.collect;
	document.body.addEventListener('click',function(e){
		var event = e.target.getAttribute('data-event');
		if(!event){
			return;
		}
		switch(event){
			case 'buy':
				b.isReady ? b.buy() : b.show();
				break;
			case 'back':
				b.hide();
				break;
			case 'save':
				c.isActive ? c.cancel():c.save();
				break;
			case 'sell':
				tosell();
				break;
			default:
				break;
		}
	})
	 
}

 
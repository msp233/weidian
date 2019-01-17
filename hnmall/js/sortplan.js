"use strict";

var ASC = 'asc';
var DESC = 'desc';
var NONE = 'none';

/**
 * 排序指示器
 * @param {Element} element 
 */
function Sortplan(element,callback){
	this.node = element;
	this.order = ASC;
	this.classNames = {};
	this.classNames[ASC] = 'icon-arrow-down';
	this.classNames[DESC]= 'icon-arrow-up';
 	this.classNames[NONE] = 'icon-arrow';
 	this.callback=callback;
	this.init();
}

Sortplan.prototype.init=function(){
	var node = this.node.children[0];
	var icon = node.querySelector('i');
	var order = this.order;

	icon.className = this.classNames[order];
	this.icon = icon;
	this.node.addEventListener('click',this,false);
}

/**
 * 事件监听
 */
Sortplan.prototype.handleEvent=function(e){
	var node = e.target;
	var icon = node.querySelector('i');
	if(!icon){
		return;
	}
	this.type = icon.dataset.id;
	this.icon.className = this.classNames[NONE];
	this.icon = icon;
	if(this.order === ASC){
		this.filterByDesc();
	}else if(this.order===DESC){
		this.filterByAsc();
	}
}

/**
 * 降序
 */
Sortplan.prototype.filterByDesc=function(){
	this.icon.className = this.classNames[DESC];
	this.order = DESC;
	this.handleClick();
}

/**
 * 升序
 */
Sortplan.prototype.filterByAsc=function(){
	this.icon.className = this.classNames[ASC];
	this.order = ASC;
	this.handleClick();
}

Sortplan.prototype.handleClick = function(){
	if(this.callback){
		this.callback(this.type,this.order)
	}
}

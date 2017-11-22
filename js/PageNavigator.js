function PageNavigator(callback){
	//当前页面，这个属性是让大组件直接修改的。修改之后记得reRender。
	this.page = 1;
	//总页数，这个属性是让大组件直接修改的。修改之后记得reRender。
	this.pageamount = 1;
	//回调
	this.callback = callback;
	//初始化
	this.init();
	//重绘
	this.reRender();
	//绑定监听
	this.bindEvent();
}
//初始化
PageNavigator.prototype.init = function(){
	//创建DOM
	this.$dom = $("<div class='pagenavigator'></div>");
	this.$ul = $("<ul></ul>");
	this.$dom.append(this.$ul);
	
	//测试上树，自己要上到app上，一会儿删除掉
	this.$dom.appendTo('#app');
}
//重新渲染reRender
//就是让视图和属性统一起来。
PageNavigator.prototype.reRender = function(){
	//根据用户的总页数大于9还是小于9，决定一共有多少个li标签。
	if(this.pageamount < 9){
		//当用户的总页数小于9
		this.$ul.empty();
		var count = 0;
		//有多少页就上多少个li标签
		while(count != this.pageamount){
			this.$ul.append($('<li><a href="javascript:void(0)">' + (count + 1) +'</a></li>'));
			count++;
		}
		this.$ul.find("li").eq(this.page - 1).addClass('cur').siblings('').removeClass('cur');

		return;
	}else{
		//当用户的总页数大于9
		this.$ul.empty();
		//不管有多少页都上9个li标签
		var count = 9;
		while(count--){
			this.$ul.append($('<li><a href="javascript:void(0)"></a></li>'));
		}
	}

	if(this.page  <= 3){
		this.$ul.find("li").eq(0).html('<a href="javascript:void(0);">1</a>');
		this.$ul.find("li").eq(1).html('<a href="javascript:void(0);">2</a>');
		this.$ul.find("li").eq(2).html('<a href="javascript:void(0);">3</a>');
		this.$ul.find("li").eq(3).html('<a href="javascript:void(0);">4</a>');
		this.$ul.find("li").eq(4).html('...');
		this.$ul.find("li").eq(5).html('<a href="javascript:void(0);">' + (this.pageamount - 3) + '</a>');
		this.$ul.find("li").eq(6).html('<a href="javascript:void(0);">' + (this.pageamount - 2) + '</a>');
		this.$ul.find("li").eq(7).html('<a href="javascript:void(0);">' + (this.pageamount - 1) + '</a>');
		this.$ul.find("li").eq(8).html('<a href="javascript:void(0);">' + (this.pageamount - 0) + '</a>');

		this.$ul.find("li").eq(this.page - 1).addClass('cur').siblings().removeClass('cur');
	}else if(this.page == 4){
		this.$ul.find("li").eq(0).html('<a href="javascript:void(0);">1</a>');
		this.$ul.find("li").eq(1).html('<a href="javascript:void(0);">2</a>');
		this.$ul.find("li").eq(2).html('<a href="javascript:void(0);">3</a>');
		this.$ul.find("li").eq(3).html('<a href="javascript:void(0);">4</a>');
		this.$ul.find("li").eq(4).html('<a href="javascript:void(0);">5</a>');
		this.$ul.find("li").eq(5).html('<a href="javascript:void(0);">6</a>');
		this.$ul.find("li").eq(6).html("...");
		this.$ul.find("li").eq(7).html('<a href="javascript:void(0);">' + (this.pageamount - 1) +'</a>');
		this.$ul.find("li").eq(8).html('<a href="javascript:void(0);">' + (this.pageamount - 0) +'</a>');

		this.$ul.find("li").eq(3).addClass('cur').siblings().removeClass('cur');
	}else if(this.page <= this.pageamount - 4){
		this.$ul.find("li").eq(0).html('<a href="javascript:void(0);">1</a>');
		this.$ul.find("li").eq(1).html('...');
		this.$ul.find("li").eq(2).html('<a href="javascript:void(0);">' + (this.page - 2) + '</a>');
		this.$ul.find("li").eq(3).html('<a href="javascript:void(0);">' + (this.page - 1) + '</a>');
		this.$ul.find("li").eq(4).html('<a href="javascript:void(0);">' + this.page + '</a>');
		this.$ul.find("li").eq(5).html('<a href="javascript:void(0);">' + (this.page + 1) + '</a>');
		this.$ul.find("li").eq(6).html('<a href="javascript:void(0);">' + (this.page + 2) + '</a>');
		this.$ul.find("li").eq(7).html('...');
		this.$ul.find("li").eq(8).html('<a href="javascript:void(0);">' + this.pageamount + '</a>');

		this.$ul.find("li").eq(4).addClass('cur').siblings().removeClass('cur');
	}else if(this.page == this.pageamount - 3){
		this.$ul.find("li").eq(0).html('<a href="javascript:void(0);">1</a>');
		this.$ul.find("li").eq(1).html('<a href="javascript:void(0);">2</a>');
		this.$ul.find("li").eq(2).html('...');
		this.$ul.find("li").eq(3).html('<a href="javascript:void(0);">' + (this.pageamount - 5) +'</a>');
		this.$ul.find("li").eq(4).html('<a href="javascript:void(0);">' + (this.pageamount - 4) +'</a>');
		this.$ul.find("li").eq(5).html('<a href="javascript:void(0);">' + (this.pageamount - 3) +'</a>');
		this.$ul.find("li").eq(6).html('<a href="javascript:void(0);">' + (this.pageamount - 2) +'</a>');
		this.$ul.find("li").eq(7).html('<a href="javascript:void(0);">' + (this.pageamount - 1) +'</a>');
		this.$ul.find("li").eq(8).html('<a href="javascript:void(0);">' + (this.pageamount - 0) +'</a>');

		this.$ul.find("li").eq(5).addClass('cur').siblings().removeClass('cur');
	}else{
		this.$ul.find("li").eq(0).html('<a href="javascript:void(0);">1</a>');
		this.$ul.find("li").eq(1).html('<a href="javascript:void(0);">2</a>');
		this.$ul.find("li").eq(2).html('<a href="javascript:void(0);">3</a>');
		this.$ul.find("li").eq(3).html('<a href="javascript:void(0);">4</a>');
		this.$ul.find("li").eq(4).html('...');
		this.$ul.find("li").eq(5).html('<a href="javascript:void(0);">' + (this.pageamount - 3) +'</a>');
		this.$ul.find("li").eq(6).html('<a href="javascript:void(0);">' + (this.pageamount - 2) +'</a>');
		this.$ul.find("li").eq(7).html('<a href="javascript:void(0);">' + (this.pageamount - 1) +'</a>');
		this.$ul.find("li").eq(8).html('<a href="javascript:void(0);">' + (this.pageamount - 0) +'</a>');
		
		this.$ul.find("li").eq(this.page - this.pageamount - 1).addClass('cur').siblings().removeClass('cur');
	}
}
PageNavigator.prototype.bindEvent = function(){
	var self = this;
	this.$dom.delegate('a', 'click', function(event) {
		self.callback($(this).html());
	});
}
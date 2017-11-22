function CommentBox(){
	//当前的页数（从1开始，当然后台从0开始，所以发请求的时候，减去1）
	this.page = 1;
	//当前的score值
	this.scoreNumber = 0;
	//自己的分页条
	var self = this;
	this.pn = new PageNavigator(function(number){
		//让大组件的当前页改变
		self.page = number;
		//拉取数据，拉取数据结束之后，会有语句让pn条的page、pageamount变化并且reRender。
		self.fetchData(number);
		//浏览器回滚
		$("body,html").animate({"scrollTop" : 0} , 300);
	});
	//初始化
	this.init();
	//绑定事件
	this.bindEvent();
}
CommentBox.prototype.init = function(){
	//自己的DOM
	this.$dom = $(
		[
			'<div>',
			'	<div class="hd">',
			'		<a data-score="0" href="javascript:void(0);" class="cur">全部评论</a>',
			'		<a data-score="5" href="javascript:void(0);">好评</a>',
			'		<a data-score="2" href="javascript:void(0);">中评</a>',
			'		<a data-score="1" href="javascript:void(0);">差评</a>',
			'	</div>',
			'	<div class="itembox"></div>',
			'	<div class="navbox" style="margin-top:40px;"></div>',
			'</div>'
		].join("")
	);

	//拉取数据第1页
	this.fetchData(1);
	//得到自己的hd中的a标签
	this.$hd_as= this.$dom.find(".hd a");

	//让自己的分页条上树
	this.$dom.find(".navbox").append(this.pn.$dom);
	//上树
	$("#app").append(this.$dom)
}
//拉取数据
CommentBox.prototype.fetchData = function(page){
	var self = this;
	//这里是jQuery的JSONP的跨域请求，请求数据之后在回调函数中实例化CommentItem。
	$.ajax({
		"dataType" : "JSONP" ,
		"url" 	   : "https://club.jd.com/comment/productPageComments.action?callback=?",
		"data" 	   : {
			"productId" 	: 4424350 ,
			"score"  		: this.scoreNumber ,
			"sortType" 		: 5 ,
			"page"	 		: page - 1,
			"pageSize" 		: 10,
			"isShadowSku" 	: 0 ,
			"fold" 			: 1
		},
		"success" : function(data){
			//清空DOM
			self.$dom.find(".itembox").empty();
			//遍历10个评论的字典
			$.each(data.comments , function(){
				//this表示你遍历到的人。this就是字典，子组件CommentItem要字典，此时就给他字典！
				var commentitem = new CommentItem(this);
				//让子组件上树
				self.$dom.find(".itembox").append(commentitem.$dom);
			});

 			//改变分页条的属性，并且重绘它
 			self.pn.pageamount =  Number(data.maxPage);
 			self.pn.page = Number(self.page);
 			self.pn.reRender();
		}
	});
}
//改变好评、中评、差评、全部显示
CommentBox.prototype.changeScore = function(scoreNumber){
	this.scoreNumber = scoreNumber;
	//恢复页码为1
	this.page = 1;
	//拉取
	this.fetchData(this.page);

	//这是一个映射关系
	//你传入的数组 : 和要有cur的a标签的eq值
	var eqidx = {
		"0" : 0,
		"1" : 3,
		"2" : 2,
		"5" : 1
	};

	//改变数据之后，别忘了改变DOM！！！
	this.$hd_as.eq(eqidx[scoreNumber]).addClass('cur').siblings('').removeClass('cur');
}


CommentBox.prototype.bindEvent = function(){
	var self = this;
	this.$dom.find(".hd").delegate('a', 'click', function(event) {
		//在jQuery3.*.*中，新增了$().date(attr)方法，表示读取标签身上的data-attr属性的值。
		self.changeScore($(this).data("score"));
	});
}
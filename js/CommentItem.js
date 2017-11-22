function CommentItem(dictionary){
	 
	//接受传入的字典
	this.dictionary = dictionary;
	//实例化自己的picbox
	if(this.dictionary.images){
		this.picbox = new PicBox(this.dictionary.images);
	}
	//初始化
	this.init();
}
CommentItem.prototype.init = function(){
	var domstr = [
		'<div class="commentItem">',
		'			<div class="leftPart">',
		'				<div class="avatar">',
		'					<img src="http://' + this.dictionary.userImageUrl + '" class="avatarimg">',
		'				</div>',
		'				<div class="idbox">' + this.dictionary.nickname + '</div>',
		'				<div class="vip">' + this.dictionary.userLevelName + '</div>',
		'			</div>',
		'			<div class="rightPart">',
		'				<div class="starbox"></div>',
		'				<div class="content">' + this.dictionary.content + '</div>',
		'				<div class="pics"></div>',
		'				<div class="infos">',
		'					<div class="info1">' + this.dictionary.productColor + '</div>',
		'					<div class="info2">' + this.dictionary.creationTime + '</div>',
		'					<div class="info3">',
		'						<span>举报</span>',
		'						<span><i class="z"></i>' + this.dictionary.usefulVoteCount + '</span>',
		'						<span><i class="c"></i>' + this.dictionary.replyCount + '</span>',
		'					</div>',
		'				</div>',
		'			</div>',
		'		</div>'
	].join("");

	//自己的DOM
	this.$dom = $(domstr);

	//星星盒子
	this.$starbox = this.$dom.find(".starbox");
	//根据用户传入的得分，来决定要background-postion多少
	this.$starbox.css("background-position" , -16 * (5 - this.dictionary.score) + "px 0px");
	//vip名字
	this.$vip = this.$dom.find(".vip");
	//根据用户的身份（什么奖牌）决定颜色
	var self = this;
	this.$vip.addClass((function(){
		switch(self.dictionary.userLevelName){
			case "金牌会员" :
				return "l1";
			case "银牌会员" :
				return "l2" ;
			case "铜牌会员" : 
				return "l3";
			case "PLUS会员" :
				return "plus";
			default :
				return "";
		}
	})());

	//如果自己有儿子，让儿子上树（儿子就是picbox组件）
	if(this.picbox){
		this.picbox.$dom.appendTo(this.$dom.find(".pics"));
	}
}
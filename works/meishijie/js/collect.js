$(function(){
//	查看是否登录
		var loc =location.search.replace(/\?/,"").split(/\&/);
		var cook =$.cookie('Username');
		if(cook){
			$(".login_item").html("<a href='###' class='welcom'>亲爱的："+cook+"</a><span class='favorite'><a href='collect.html'>我的收藏</a></span>")
		}
		$(".welcom").click(function(){
			$.cookie("Username",cook,{expires:-7})
			$(".login_item").html('<a href="###" class="left logologin qqlogo">QQ登录</a><a href="###" class="left logologin webologo">微博登录</a><a href="register.html?register" class="left">注册</a><a href="register.html?login" class="left">登录</a>')
		})
		$(".info_detail h1").html('<b>'+cook+'</b> <span></span> <a href="">我的私信</a>')
})
$(function(){
//	查看是否加入了收藏		
	//	读取cook的值
	var like_str=""
	var cookieStr = $.cookie("joinlike");
	if(!cookieStr){
		$(".collect_list ul").html("<p class='nolike'>收藏中还没有任何菜谱哦~</p>")
	}else{
		var like_str=""
		var cookieObj = JSON.parse($.cookie("joinlike"));
		$.each(cookieObj,function(key,value){		
			var name="data=id="+key;
			$.ajax({
				type:"POST",
				url:"php/detail.php",
				data:name
			}).done(function(data){
				var data = JSON.parse(data).result.data[0]
				like_str+='<li del="'+data.id+'">'+
							'<a href="">'+
							'<a href="detail.html?id='+ data.id +'"><img src="'+data.albums[0]+'" alt="" /></a>'+
								'<div class="coll_info">'+
									'<h3>'+data.title+'</h3>'+
									'<p><span>69评论</span><span class="hot">喜爱值：'+value+'</span></p>'+
									'<p>梦小夕</p>'+
								'</div>'+
							'</a>'+
						'<p class="del">取消收藏</p>'+
					'</li>'	
				$(".collect_list ul").html(like_str)
//					鼠标移入显示取消收藏
				$(".collect_list ul").on("mouseenter","li",function(){
					$(this).find(".del").addClass("dblock");
					$(this).siblings().find(".del").removeClass("dblock")
				})
				$(".del").mousedown(function(){
					var del = $(this).parents().attr("del")
					delete cookieObj[del];
					var objTostr = JSON.stringify(cookieObj);	//把对象转换为字符串
					$.cookie("joinlike",objTostr);			//创建cook，名为joinlike，值为转换为字符串的对象
					$(this).parent().remove();				//删除li
				})
			})
		})	
	}	
})


$(function(){
	var loc =location.search.replace(/\?/,"").split(/\&/)
	var name = "";
	for (var x=0;x<loc.length;x++) {
		for (var y=0;y<loc[x].split(/\=/).length;y++) {
			if(loc[x].split(/\=/)[y]=="id"){
				name = "data="+loc[x]
				$.ajax({
					type:"POST",
					url:"php/detail.php",
					data:name
				}).done(function(data){
					var data = JSON.parse(data)
					var data = data.result.data[0]
					detail(data)			
				})	
			}
		}		
	}
//	菜品请求ajax
		

		function detail(data){
//		pathstlye 头部标题导航
			var pathstlye_type = data.tags.split(";")
			var len = pathstlye_type.length
			var show_tit=new Array();
			var str=""
			$.each(pathstlye_type, function(index1,el1) {
				var pathstlye_typp_sp = el1.split("");
				$.each(pathstlye_typp_sp, function(index2,el2) {
					if(el2=="菜"){
						show_tit.push(pathstlye_type[index1])
					}
					if(el2=="人"){
						$(".detail_taste3 a").html(pathstlye_type[index1])
						var people=pathstlye_type[index1].split(/\-/)
						if(people[0]<=1){
							$(".detail_taste3 span").css({"background-position-y": '-60px'})
						}
						else if(people[0]>1&&people[0]<=2){
							$(".detail_taste3 span").css({"background-position-y":'-120px'})
						}
						else if(people[0]>2&&people[0]<=4){
							$(".detail_taste3 span").css({"background-position-y":'-160px'})
						}
						else if(people[0]>4&&people[0]<=6){
							$(".detail_taste3 span").css({"background-position-y":'-100px'})
						}
						else if(people[0]>6&&people[0]<=8){
							$(".detail_taste3 span").css({"background-position-y":'-240px'})
						}
						else{
							$(".detail_taste3 span").css({"background-position-y":'-280px'})
						}
					}
					if(el2=="钟"){
						var time=pathstlye_type[index1].split(/\-/)
						if(time[1]){
							$(".detail_taste5 a").html(time[0]+"分钟")
							$(".detail_taste6 a").html("<"+time[1])
							if(time[0]<=5){
								$(".detail_taste5 span").css({"background-position-y": '-60px'})
								$(".detail_taste6 span").css({"background-position-y": '-120px'})
							}
							else if(time[0]>5&&time[0]<=30){
								$(".detail_taste5 span").css({"background-position-y":'-80px'})
								$(".detail_taste6 span").css({"background-position-y": '-160px'})
							}
							else if(time[0]>30&&time[0]<=60){
								$(".detail_taste5 span").css({"background-position-y":'-200px'})
								$(".detail_taste6 span").css({"background-position-y": '-240px'})
							}
							else{
								$(".detail_taste5 span").css({"background-position-y":'-280px'})
								$(".detail_taste6 span").css({"background-position-y": '-320px'})
							}
						}
					}
				});
//	detail_top
//			detail_top_left
			$(".detail_top_left").html("<img src='"+ data.albums[0]+"' alt='' />")
//			detail_top_right
			$(".detail_mane h3").html(data.title);//菜名
			$(".detail_share").html('<a href="###" class="detail_fav" did="'+data.id+'">收藏</a><div><span>分享到:</span><a href="" class="little1"></a><a href="" class="little2"></a><a href="" class="little3"></a></div>')
			//二维码开始
			$(".code2 i,.code2_hide").mouseenter(function(){
				$(".code2 i").css({"border":"1px solid #ddd","border-bottom":"none"})
				$(".code2_hide").css({"display":"block"})
			})
			$(".code2 i,.code2_hide").mouseleave(function(){
				$(".code2 i").css({"border":"none"})
				$(".code2_hide").css({"display":"none"})
			})
			//二维码结束	
		//工艺
				$.ajax({
					type:"post",
					url:"json/gongyi.json",
				}).done(function(gongyidata){
					$.each(gongyidata, function(index,el) {
						if(el.name == el1){
							$(".detail_taste1 div").html(el1);
						}
					});
				})
		//口味
				$.ajax({
					type:"post",
					url:"json/taste.json",
				}).done(function(tasteidata){
					$.each(tasteidata, function(index,el) {
						if(el.name == el1){
							$(".detail_taste4 div").html(el1);
						}
					});
				})				
			});			
			$.each(show_tit, function(index,el) {
				str+="#"+el+"#"
			});
			$(".pathstlye_type").html(str);
			$(".imtro").html("<b>“</b>"+data.imtro+"<b>”</b>")
			
//			用料
			var main_mater_str="";
			var help_mater_str="";
			var main_mater_arr = data.ingredients.split(";")
			var help_mater_arr = data.burden.split(";")
			$.each(main_mater_arr, function(index,el) {
				var main_mater_li = el.split(",");
				main_mater_str+="<li><span>"+main_mater_li[0]+"</span><b>"+main_mater_li[1]+"</b><i class='iconfont'>&#xe60b;</i></li>"
			});
			$.each(help_mater_arr, function(index,el) {
				var help_mater_li = el.split(",");
				help_mater_str+="<li><span>"+help_mater_li[0]+"</span><b>"+help_mater_li[1]+"</b><i class='iconfont'>&#xe60b;</i></li>"
			});
			$(".main_mater ul").html(main_mater_str)
			$(".help_mater ul").html(help_mater_str)
//			步骤
			$(".step_tit").html(data.title+"的做法")
			var step_obj=data.steps;
			var step_str=""
			$.each(step_obj, function(index,el) {
				var ind = el.step.split(".")
				step_str+="<li class='clear'><b>"+ind[0]+"、</b><p>"+ind[1]+"</p><p><img src='"+ el.img+"' alt='' /></p></li>"
			});
			$(".step_detail ul").html(step_str)
			//	加入购物车
			$(".detail_fav").mousedown(function(){
				var cook =$.cookie('Username');
				if(cook){
		//				判断购物车是否有内容
					if($.cookie("joinlike")){
						var obj = JSON.parse($.cookie("joinlike"))//有，获取内容
					}else{
						var obj = {};//没有，内容为空
					}
					
					var num = obj[$(this).attr("did")]||0;//数量，obj中的did的值或者0；
					
					var did = $(this).attr("did");		//did为数据的did值
					obj[did] = ++num;					//没有did的话，存入并数量加1，如果有的话，改变数值
					var objTostr = JSON.stringify(obj);	//把对象转换为字符串
					$.cookie("joinlike",objTostr);			//创建cook，名为joinlike，值为转换为字符串的对象
					var cookieObj = JSON.parse($.cookie("joinlike"));
				}else{
					alert("登录后才可以收藏哦~")
				}
			})
		}  
		var dv = $('.detail_main_right'), st,top;
		var top = $('.detail_main_right').offset().top;
		$(window).scroll(function () {
			var max_top = $("#footer_wrap").offset().top-1000;
			st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);			
			if(st>=top&&st<max_top){
				dv.addClass("position")
			}
			else{
				dv.removeClass("position")
			}
		});
		
//		评论回复
		$(".tag span").on("click",function(){
			$(this).addClass("clicked").siblings().removeClass("clicked")
			$(".push_box textarea").val("["+$(this).html()+"]:")
			$(".push_box textarea").focus()
		})
		$(".push_box input[type=submit]").on("click",function(){
			var date = new Date();
			var date1 = date.toLocaleDateString();//年月日
			var date2 = date.toLocaleDateString();//时分秒
			var str0 = $(".push_box textarea").val();//文本框内容
			var str1 = str0.split(/\:/)[0];//标签
			var str2 = str0.split(/\:/)[1];//内容
			if($.cookie('Username')){
				if(str1=="[随意吐槽]"||str1=="[提问求解]"){
					if(!str2){
						alert("请输入评论内容后发表")
					}else{
						$('<li class="clear"><p><img src="images/chat_head1.jpg"/><span>小耗子。。</span></p><div class="chat_right"><p><span>'+str1+'</span>'+str2+'</p><div class="chat_info clear"><p>'+date1+"&nbsp;"+date2+'来自<span>美食杰</span></p><span><i class="iconfont">&#xe669;</i><a href="###" class="repeat">回复</a></span></div><div class="repeat1 clear"><textarea class="repeat1_text" placeholder="我也说一句"></textarea><input type="button" value="回复" class="repeat1_btn"/></div></div></li>').prependTo(".chat");
						$(".push_box textarea").val("")
					}
				}else{
					alert("请给内容选择一个标签。")
				}
			}else{
				alert("登录后才可以评论哦~")
			}
		})		
		$(".chat").off("mousedown").on("mousedown",".repeat",function(){
			var ind = $(this).parent().parent().parent().parent().index()
			$(".repeat1").removeClass("active")
			$(".repeat1").eq(ind).addClass("active")
			var str = ""			
			$(".repeat1").off("mousedown").on("mousedown",".repeat1_btn",function(){
				str = $(".repeat1_text").eq(ind).val();	
				$('<li class = "repeat_chat clear"><p><img src="images/chat_head.jpg"/></p><div class="chat_right1"><p><span>吃不胖的小胖妞：</span>'+str+'</p><div class="chat_info clear"><p>2016/9/9 下午9:41:54来自<span>美食杰</span></p></div></div></li>').appendTo($(".chat_right").eq(ind));
				$(".repeat1_text").eq(ind).val("");
				$(".repeat1").eq(ind).removeClass("active")
			})
		})
		$(".chat_right").off("moousedown").on("mousedown",".iconfont",function(){
			var good = $(this).next().html();
			good++;
			$(this).next().html(good)
		})
})
$(function(){

})

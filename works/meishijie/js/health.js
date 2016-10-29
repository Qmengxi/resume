$(function(){
	var loc =location.search.replace(/\?/,"").split(/\&/)//地址栏
	var name="";
	var pid="";//家常菜谱
	var cid="";//快手菜
	var id="";//蚂蚁上树
	var cidstr="";
//	判断是否是菜单详情页
	for (var x=0;x<loc.length;x++) {
		for (var y=0;y<loc[x].split(/\=/).length;y++) {
			var reg1 = /menu/
			var reg2 = /cid/
			var reg3 = /tit/
			var idmenu = reg1.test(location.search.replace(/\?/,""))
			var cidmenu =  reg2.test(location.search.replace(/\?/,""))
			var tith3 =  reg3.test(location.search.replace(/\?/,""))
			if(!idmenu&&!cidmenu){//不是菜单详情页
				name ="data=cid=28";
				cidajax()	//cid ajax
			}
			else if(idmenu){ //是菜单详情页
				name = "data="+loc[x];
				var h3Html =decodeURI(loc[x].split(/\=/)[1])//转码，解密
				$(".list_main_tit h3:first-child").html(h3Html)
				reajax()	//搜索ajax
			}
			else if(cidmenu){ //是菜单详情页
				name = "data="+loc[x];
				cidajax()	//搜索ajax
			}
		}		
	}	
	//搜索ajax
	function reajax(){
		$.ajax({
			type:"POST",
			url:"php/search.php",
			data:name
		}).done(function(data){
			var data = JSON.parse(data)
			list_menu(data)//菜单导航
			list(data)//列表分页
		})
	}
	//cid ajax
	function cidajax(){
		$.ajax({
			type:"POST",
			url:"php/cidlist.php",
			data:name
		}).done(function(data){
			var data = JSON.parse(data)	
			list_menu(data)//菜单导航
			list(data)//列表分页
		})
	}
	//导航菜单部分
	function list_menu(data){
//		刚进入页面
		$.ajax({
			type:"POST",
			url:"php/pidlist.php",
			data:"data=parentid=10012"
		}).done(function(data){
			var data = JSON.parse(data)
			cidstr=""
			var cidlist_arr = data.result[0].list;
			$.each(cidlist_arr, function(index,el) {
				cidstr +="<li cid='"+ el.id +"'><a href='####'>"+el.name +"</a></li>" 
			});
			$(".list_tit_box ul").eq(0).html(cidstr)
		})
	//	大标题鼠标滑过
		$(".list_tit").on("mouseenter","li",function(){
			$(this).addClass("lihover").siblings().removeClass("lihover")
		})
	//	大标题鼠标离开
		$(".list_tit").on("mouseleave","li",function(){
			$(this).removeClass("lihover").siblings().removeClass("lihover")
		})
	//	大标题鼠标点击
		$(".list_tit").off("mousedown").on("mousedown","li",function(){
	//		改变主要内容的标题
			$(".list_main_tit h3").html($(this).html())
			var index = $(this).index();
	//		改变样式
			$(this).addClass("liclick").siblings().removeClass("liclick")
	//		改变内容标题
			$(".list_tit_box h3").html($(this).html())
			$(".list_tit_box ul").eq($(this).index()).addClass("dis").siblings().removeClass("dis")		
	//		改变主要内容
			cid = $(this).attr("cid")
			name ="data=cid="+cid
			cidajax();
//			获取列表
			pid = $(this).attr("pid")
			name="data=parentid="+pid;
			$.ajax({
				type:"POST",
				url:"php/pidlist.php",
				data:name
			}).done(function(data){
				var data = JSON.parse(data)
				cidstr=""
				var cidlist_arr = data.result[0].list;
				$.each(cidlist_arr, function(index,el) {
					cidstr +="<li cid='"+ el.id +"'><a href='####'>"+el.name +"</a></li>" 
				});
				$(".list_tit_box ul").eq(index).html(cidstr)
			})
			
		})
		$(".list_tit_box ul ").on("mousedown","li",function(){
			$(".list_main_tit h3").html($(this).html())
			name ="data=cid="+$(this).attr("cid")
			cidajax()
		})
	}
	//分页详情
	function list(data){	
		var list_arr = data.result.data;
		var list_len = list_arr.length;		//总个数
		var num =8; 					 	//每一页的个数
		var page = 1; 						//第几页
		var pagestr=""
		var boxstr=""
		if(list_len>num){					//如果总个数小于每页个数
	//			分页
			page=parseInt(Math.ceil(list_len/num));		//总页数
			for (var i=1;i<=page;i++) {
				pagestr+="<li>"+i+"</li>";
				boxstr+="<ul class='clear'>"+i+"</ul>"
			}
			$("#page").find("ul").html(pagestr);
			$("#box").html(boxstr)
		}else{
	//			不分页
			$("#page").find("ul").html("<li>1</li>");
			$("#box").html("<ul class='clear'>1</ul>")
		}
	//	默认显示第一页的内容
		var str1=""
		for (var x=0;x<num;x++) {
			if(x<list_len){					
				str1+=
						'<li>'+
						'<a href="detail.html?id='+ list_arr[x].id +'"><img src="'+list_arr[x].albums[0]+'" alt="" /></a>'+
						'<div class="right_list">'+
						'<p class="right_info1">'+
						'<span class="carousel2_name"><a href="">'+list_arr[x].title+'</a></span>'+
						'<span class="carousel2_support">110评论，1999人气</span>'+
						'<span class="carousel2_writer">梦小夕</span>'+
						'</p>'+
						'<p class="right_info2">'+
						'<span><a href="###" class="shoucang" did = '+list_arr[x].id+'>收藏</a></span>'+
						'<span><a href="detail.html?id='+ list_arr[x].id +'" class="lookinfo">查看详情</a></span>'+
						'</p>'+
						'</div>'+
						'</li>'
			}else{
				break;
			}
		}	
		$("#box ul").eq(0).html(str1);
		$("#box ul li").each(function(index,el){
			$(this).mouseenter(function(){
				$(this).find(".right_info1").stop().animate({"margin-top":"-100px"})
			})
			$(this).mouseleave(function(){
				$(this).find(".right_info1").stop().animate({"margin-top":"0"})
			})
		})
//			加入购物车
		$("#box ul li").on("mousedown",".shoucang",function(){
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
		$("#page li:first-child").addClass("bor").siblings().removeClass("bor");
		$("#box ul:first-child").addClass("dis").siblings().removeClass("dis");	
	//	点击时,点击那一页,显示那一页
		$("#page").on("mousedown","li",function(){
			var ind= $(this).index()*num-1;
			$(this).addClass("bor").siblings().removeClass();
			$("#box ul").eq($(this).index()).addClass("dis").siblings().removeClass("dis");
			var strcont="";
			for (var k=0;k<num;k++) {
				if(ind<list_len-1){
					ind++;
				strcont+=
						'<li>'+
						'<a href="detail.html?id='+ list_arr[ind].id +'"><img src="'+list_arr[ind].albums[0]+'" alt="" /></a>'+
						'<div class="right_list">'+
						'<p class="right_info1">'+
						'<span class="carousel2_name"><a href="">'+list_arr[ind].title+'</a></span>'+
						'<span class="carousel2_support">110评论，1999人气</span>'+
						'<span class="carousel2_writer">梦小夕</span>'+
						'</p>'+
						'<p class="right_info2">'+
						'<span><a href="###" class="shoucang" did = '+list_arr[ind].id+' >收藏</a></span>'+
						'<span><a href="detail.html?id='+ list_arr[ind].id +'" class="lookinfo">查看详情</a></span>'+
						'</p>'+
						'</div>'+
						'</li>'
				}else{
					break;
				}
			}
			$("#box ul").eq($(this).index()).html(strcont)
			$("#box ul li").each(function(index,el){
				$(this).mouseenter(function(){
					$(this).find(".right_info1").stop().animate({"margin-top":"-100px"})
				})
				$(this).mouseleave(function(){
					$(this).find(".right_info1").stop().animate({"margin-top":"0"})
				})
			})	
		//			加入购物车
			$("#box ul li").on("mousedown",".shoucang",function(){
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
		})		
	}
})



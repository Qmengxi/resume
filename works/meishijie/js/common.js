$(window).ready(function(){	
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
	//AJAX请求
//			搜索AJAX请求
			var name=""
			$("#header").find("input[type=button]").click(function(){
				menu =$("#header").find("input[type=text]").val();
				location.href="list.html?menu="+menu
			})
			$("#bottom_search_wrap").find("input[type=button]").click(function(){
				menu =$("#bottom_search_wrap").find("input[type=text]").val()
				location.href="list.html?menu="+menu
			})

//			navAJAX请求  
				$.ajax({
					url:"php/menutype.php",
					type:"POST"
				}).done(function(data){
					var data = JSON.parse(data);			
					type_list(data);				
				})	
				function type_list(data){
					var menuStr=""//菜谱大全
					var healthStr=""//饮食健康
					var menulistStr=""
					var listStr=""
					var typelist = data.result
					$.each(typelist,function(index,typelist){
						if(index==0){//菜式菜品
							var menulist=typelist.list
							menulistStr=""
							$.each(menulist,function(mindex,menulist){
								if(mindex>=0&&mindex<=8){
									menulistStr+='<li cid="'+menulist.id+'"><a href="list.html?cid='+menulist.id+'">'+menulist.name+'</a></li>'
								}
							})
							menuStr+='<li><h4>'+typelist.name+'</h4><ul>'+menulistStr+'</ul></li>'
						}
						if(index==1){//菜系
							menulistStr=""
							menulistStr1=""
							listStr=""
							var menulist=typelist.list
							$.each(menulist,function(mindex,menulist){
								if(mindex<=5){
									menulistStr+='<li cid="'+menulist.id+'"><a href="list.html?cid='+menulist.id+'">'+menulist.name+'</a></li>'
								}
								if(mindex>=6&&mindex<=8){
									menulistStr+='<li cid="'+menulist.id+'"><a href="list.html?cid='+menulist.id+'">'+menulist.name+'</a></li>'
								}
								
							})
							menuStr+='<li><h4>'+typelist.name+'</h4><ul>'+menulistStr+'</ul></li>'
						}
						if(index==2){//食材
							var menulist=typelist.list;
							menulistStr="";
							listStr="";
							$.each(menulist,function(mindex,menulist){
								if(mindex>=0&&mindex<=8){
									menulistStr+='<li cid="'+menulist.id+'"><a href="list.html?cid='+menulist.id+'">'+menulist.name+'</a></li>'
								}
								
							})
							menuStr+='<li><h4>'+typelist.name+'</h4><ul>'+menulistStr+'</ul></li>'
						}
						if(index==3){
							var menulist=typelist.list
							menulistStr=""
							$.each(menulist,function(mindex,menulist){
								if(mindex>=0&&mindex<=8){
									menulistStr+='<li cid="'+menulist.id+'"><a href="healthlist.html?cid='+menulist.id+'">'+menulist.name+'</a></li>'
								}
							})
							healthStr+='<li><h4>'+typelist.name+'</h4><ul>'+menulistStr+'</ul></li>'
						}
						if(index==4){//场景
							var menulist=typelist.list
							menulistStr=""
							listStr=""
							$.each(menulist,function(mindex,menulist){
								if(mindex>=0&&mindex<=5){
									menulistStr+='<li cid="'+menulist.id+'"><a href="list.html?cid='+menulist.id+'">'+menulist.name+'</a></li>'
								}
								
							})
							menuStr+='<li><h4>用餐'+typelist.name+'</h4><ul>'+menulistStr+'</ul></li>'
						}
						if(index==7){//主食
							var menulist=typelist.list
							menulistStr=""
							$.each(menulist,function(mindex,menulist){
								if(mindex>=0&&mindex<=8){
									menulistStr+='<li cid="'+menulist.id+'"><a href="list.html?cid='+menulist.id+'">'+menulist.name+'</a></li>'
								}
							})
							menuStr+='<li><h4>'+typelist.name+'</h4><ul>'+menulistStr+'</ul></li>'
						}
						if(index==8){//西点
							var menulist=typelist.list
							menulistStr=""
							listStr=""
							$.each(menulist,function(mindex,menulist){
								if(mindex>=0&&mindex<=5){
									menulistStr+='<li cid="'+menulist.id+'"><a href="list.html?cid='+menulist.id+'">'+menulist.name+'</a></li>'
								}
								
							})
							menuStr+='<li><h4>'+typelist.name+'</h4><ul>'+menulistStr+'</ul></li>'
						}
						if(index==11){//人群
							var menulist=typelist.list
							menulistStr=""
							$.each(menulist,function(mindex,menulist){
								if(mindex>=0&&mindex<=7){
									menulistStr+='<li cid="'+menulist.id+'"><a href="healthlist.html?cid='+menulist.id+'">'+menulist.name+'</a></li>'
								}
							})
							healthStr+='<li><h4>适用'+typelist.name+'</h4><ul>'+menulistStr+'</ul></li>'
						}
						if(index==12){//疾病
							var menulist=typelist.list
							menulistStr=""
							$.each(menulist,function(mindex,menulist){
								if(mindex>=0&&mindex<=8){
									menulistStr+='<li cid="'+menulist.id+'"><a href="healthlist.html?cid='+menulist.id+'">'+menulist.name+'</a></li>'
								}
							})
							healthStr+='<li><h4>治愈'+typelist.name+'</h4><ul>'+menulistStr+'</ul></li>'
						}
						if(index==21){//节气
							var menulist=typelist.list
							menulistStr=""
							$.each(menulist,function(mindex,menulist){
								if(mindex>=0&&mindex<=8){
									menulistStr+='<li cid="'+menulist.id+'"><a href="healthlist.html?cid='+menulist.id+'">'+menulist.name+'</a></li>'
								}
							})
							healthStr+='<li><h4>'+typelist.name+'佳品</h4><ul>'+menulistStr+'</ul></li>'
						}
					})
					$(".nav_menu").html(menuStr)
					$(".nav_health").html(healthStr);
				}
//动画
	$("#nav>li").each(function(){
		$(this).mouseenter(function(){
			$(this).css({
				"background":"#fafafa"
			}).siblings().css({
				"background":"none"
			})
		})
	})
	$(".manutype").mouseenter(function(){
		$(this).find(".down").css({
			"display":"block"
		})
	})
	$(".manutype").mouseleave(function(){
		$(this).find(".down").css({
			"display":"none"
		})
	})
	//bottom
	$(window).scroll(function(){  
        if ($(window).scrollTop()>500){  
        	$("#up>i").css({"display":"block"})
            $("#up").fadeIn(500);  
        }else{  
            $("#up").fadeOut(500);  
            }  
    });  
   	$("#up").click(function(){  
        $('body,html').animate({scrollTop:0},500);  
        return false;  
    }); 
    $("#bottom_search_wrap").mouseenter(function(){
    	$(this).stop().animate({"bottom":"0"},200)
    })
    $("#bottom_search_wrap").mouseleave(function(){
    	
    	$(this).stop().animate({"bottom":"-55px"},200)
    })
    $(".fixed").mousedown(function(){
    	$(this).toggleClass("background_change")
    	if($(this).attr("class")=="fixed background_change"){
		    $("#bottom_search_wrap").mouseleave(function(){
		    	$(this).stop().animate({"bottom":"0"},200)
		    })
    	}else{
    		$("#bottom_search_wrap").mouseleave(function(){
		    	$(this).stop().animate({"bottom":"-55px"},200)
		    })
    	}
    })
    

})
//搜索联想词
$(function(){
	$(".search_top input[type=text]").keyup(function(){
		var oScript = document.createElement('script');
		oScript.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + $(".search_top input[type=text]").val() + "&cb=hhl";
		document.body.appendChild(oScript);
		document.body.removeChild(oScript);
		$(".search_top input[type=text]").blur(function(){
			$("#search_list").css({"display":"none"})
		})
	})
	
	$("#search_list").on("mouseenter","li",function(){
		$(this).addClass("lienter").siblings().removeClass("lienter");
	})
	$("#search_list").on("mousedown","li",function(){
		$(".search_top input[type=text]").val($(this).html())
	})
});
function hhl(data) {
	var oList = document.getElementById('search_list');
	var html = ''
	if (data.s.length > 0) {
		for (var i = 0; i < data.s.length; i++) {
			html += '<li>' + data.s[i] + '</li>'
		}
		oList.style.display = 'block';
		oList.innerHTML = html;

       $("#search_list").find("li").click(function(){
	   $("#search_text").val($(this).html())
})
	
	}else{
		oList.style.display = 'none';
	}
}
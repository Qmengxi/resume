	$(function(){	
//			recommend轮播	
		$.ajax({
			type:"get",
			url:"json/recommend.json",
		}).done(function(data){
			var str="";
//		循环,把元素插入到对象中
			$.each(data,function(index,list){
				str+="<li><a href='detail.html?id="+data[index].id+"' target='_blank'><img src='"+data[index].src+"'/></a><div><p class='recommend_name'>"+data[index].name+"</p><p class='recommend_decoration'>"+data[index].decoration+"</p><p><span>"
				+data[index].good+"<img src='"+data[index].img+"' alt='' /></span></div></li>"
			})
			$(".recommend_show").html(str);
//			复制节点并添加,使无缝连接
			$(".recommend_show li:last-child").clone().prependTo(".recommend_show")
			$(".recommend_show li:nth-child(2)").clone().appendTo(".recommend_show")
			$(".recommend_show li:nth-child(3)").clone().appendTo(".recommend_show")
			$(".recommend_show li:nth-child(4)").clone().appendTo(".recommend_show")
			$(".recommend_show li:nth-child(5)").clone().appendTo(".recommend_show")
//			获取li宽度,计算ul宽度
			var $li = $(".recommend_show li")
			var $ul = $(".recommend_show")
			var preWidth = $li.outerWidth()
			var len = $li.length+1;
			$li.css("width",preWidth);
			$ul.css({"width":preWidth*len,"margin-left":-preWidth});
//			获取时间
			var data = new Date();
			var hour = data.getHours();
			var i=0;
			if(hour>=4&&hour<10){
				i=0;
				move();
				show()
			}
			if(hour>=10&&hour<14){
				i=3;
				move();
				show()
			}
			if(hour>=14&&hour<16){
				i=6;
				move();
				show()
			}
			if(hour>=16&&hour<21){
				i=9;
				move();
				show()
			}
			if(hour>=21&&hour<24||hour>=0&&hour<4){
				i=12;
				move();
				show()
			}
			$("#recom_wrap").mouseenter(function(){
				show()
			})	
			$("#recom_wrap").mouseleave(function(){
				$(".clickleft").css({
					"background-position":"0 6px"
				})
				$(".clickright").css({
					"background-position":"-176px 6px"
				})
			})
			$(".clickleft,.clickright").mouseenter(function(){
				$(this).css({"cursor":"pointer"})
			})
			$(".clickleft").mousedown(function(){
				i-=6;
				move()
				show()
			})
			$(".clickright").mousedown(function(){
				move()
				show()
			})
			function move(){	
				if(i==len-3){
					i=3;
					$ul.css({"width":preWidth*len,"margin-left":-preWidth});//显示第6张，瞬间显示第1张
				}
					if(i==-3){
						i=12;
						$ul.css("margin-left",-preWidth*(i+3)-preWidth)//显示第1张，瞬间显示第6张
					}
				$ul.stop().animate({"width":preWidth*len,"margin-left":-preWidth*(i)-preWidth},500);	
				i+=3;				
			}
			function show (){
				if(i==18||i==3){
					$(".clickleft").css({
						"background-position":"0 -364px"
					})
					$(".clickright").css({
						"background-position":" -176px -142px"
					})
					$("#recommend h3:nth-child(1)").addClass("active").siblings().removeClass()
					$(".recommend_ind a:nth-child(1)").addClass("visible").siblings().removeClass()
					}
				if(i==6){			
					$(".clickleft").css({
						"background-position":"0 -68px"
					})
					$(".clickright").css({
						"background-position":"-176px -216px"
					})
					$("#recommend h3:nth-child(2)").addClass("active").siblings().removeClass()
					$(".recommend_ind a:nth-child(2)").addClass("visible").siblings().removeClass()
				}
				if(i==9){
					$(".clickleft").css({
						"background-position":"0 -142px"
					})
					$(".clickright").css({
						"background-position":"-176px  -290px"
					})
					$("#recommend h3:nth-child(3)").addClass("active").siblings().removeClass()
					$(".recommend_ind a:nth-child(3)").addClass("visible").siblings().removeClass()
				}
				if(i==12){
					$(".clickleft").css({
						"background-position":"0 -216px"
					})
					$(".clickright").css({
						"background-position":"-176px  -364px"
					})
					$("#recommend h3:nth-child(4)").addClass("active").siblings().removeClass()
					$(".recommend_ind a:nth-child(4)").addClass("visible").siblings().removeClass()
				}
				if(i==15){
					$(".clickleft").css({
						"background-position":" 0 -290px"
					})
					$(".clickright").css({
						"background-position":"-176px  -68px"
					})
					$("#recommend h3:nth-child(5)").addClass("active").siblings().removeClass()
					$(".recommend_ind a:nth-child(5)").addClass("visible").siblings().removeClass()
				}
			}				
		})
	})
//	carousel1
	$(function(){
		$.ajax({
			type:"get",
			url:"json/carousel1.json",
		}).done(function(data){
			var str="";
			var i=1;
			$.each(data,function(index,el){
				str+='<li>'+
						'<a href="">'+
							'<img src="'+data[index].src+'" alt="" />'+
							'<span class="carousel1_back"></span>'+
							'<p>'+
								'<span class="carousel1_tit">'+data[index].name+'</span>'+
								'<span class="carousel1_dec">'+data[index].decoration+'</span>'+
							'</p>'+
						'</a>'+
					'</li>'
				if((index+1)==6*i){
					$(".carousel1_wrap ul:nth-of-type("+i+")").html(str);
					i++;
					str="";
				}
			})
			
//			获取li宽度,计算ul宽度
			var $ul = $(".carousel1_wrap ul")
			var preWidth = $ul.outerWidth()
			var len = 4;
			var timer1=setInterval(move1,3000);
			var i=0;		
			$(".carousel1_right").mousedown(function(){	
				clearInterval(timer1);
				move1();
				timer1=setInterval(move1,3000);
			})
			$(".carousel1_left").mousedown(function(){
				clearInterval(timer1);
				i=i-2;
				move1();
				timer1=setInterval(move1,3000);
			})
			function move1(){	
				i+=1;			
				if(i==len){			
					i=1;
					$(".carousel1_wrap").css({"width":preWidth*len,"margin-left":0});
				}
				if(i==len-1){
					$(".carousel1_index a").eq(0).addClass("cur").siblings().removeClass()
				}
				if(i==-1){
					i=2
					$(".carousel1_wrap").css("margin-left",-preWidth*3)
				}
				$(".carousel1_wrap").stop().animate({"width":preWidth*len,"margin-left":-preWidth*(i)},700);
				$(".carousel1_index a").eq(i).addClass("cur").siblings().removeClass()
			}
		})
	})
//	
	
	
	
	
	
	
	
	
	
//	carousel2
	$(function(){
		$(".carousel2_menu_deco").mouseenter(function(){
			$(this).find(".carousel2_menu_name").stop().animate({"margin-top":"-100px"})
		})
		$(".carousel2_menu_deco").mouseleave(function(){
			$(this).find(".carousel2_menu_name").stop().animate({"margin-top":"0"})
		})		
		var timer2=setInterval(move2,3000);
		var j=0;
		var preWidth = 988;
		var len = 5;			
		$(".carousel2_right").mousedown(function(){
			clearInterval(timer2);
			move2();
			timer2=setInterval(move2,3000);
		})
		$(".carousel2_left").mousedown(function(){
			clearInterval(timer2);
			j=j-2;
			move2();
			timer2=setInterval(move2,3000);
		})
		function move2(){
			j+=1;	
			if(j==len){			
				j=1;
				$(".carousel2_wrap").css({"width":preWidth*len,"margin-left":0});		
			}
			if(j==len-1){
				$(".carousel2_h3 h3").eq(0).addClass("active").siblings().removeClass("active")
			}
			if(j==-1){
				j=2
				$(".carousel2_wrap").css("margin-left",-preWidth*4)
			}
			$(".carousel2_wrap").stop().animate({"width":preWidth*len,"margin-left":-preWidth*(j)});
			$(".carousel2_h3 h3").eq(j).addClass("active").siblings().removeClass("active")
		}
	})
//	material
	$(function(){
		$(".material_box>li").mouseenter(function(){
			$(this).find("ul").toggleClass("dishow")
		})
		$(".material_box>li").mouseleave(function(){
			$(this).find("ul").toggleClass("dishow")
		})
	})
//health_news	
	$(function(){
		$("#health_news").find("ul").find("li").mouseenter(function(){
			$(this).addClass("health_active").siblings().removeClass("health_active")
		})
	})

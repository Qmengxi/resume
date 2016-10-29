$(function(){
	var timer=setInterval(move,5000);
	var i=0;
	function move(){
		i++;
		if(i==3){
			i=1;
		}
		$(".banner div:nth-child("+i+")").css({"display":"none"}).siblings().css({"display":"block"})
	}
	$(".banner").mouseenter(function(){
		console.log(1)
		clearInterval(timer);
		$(".banner").on("mousedown",".iconfont",function(){
			$(this).parent().hide();
			$(this).parent().siblings().show()
		})
	})
	$(".banner").mouseleave(function(){
		console.log(2)
		timer=setInterval(move,5000);
	})
})

$(function(){
	if($(window).width()<550){
	    $("footer section:nth-of-type(1)").find("p").on("click",function(){
	        $(this).parent().find("li").toggle();
   		 })
	}
	$(window).on("resize",function(){
	    $("footer section:nth-of-type(1)").find("li").hide();
	    if($(window).width()<550){
	        $("footer section:nth-of-type(1)").find("p").on("click",function(){
	             $(this).parent().find("li").toggle();
	        })	
	    }else{
	        $("footer section:nth-of-type(1)").find("li").show();
	        $("footer section:nth-of-type(1)").find("p").off("click");
	    }
	});
})




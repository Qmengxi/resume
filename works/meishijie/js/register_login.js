$(function(){
	var loc =location.search.replace(/\?/,"").split(/\&/)
	for (var x=0;x<loc.length;x++) {
		if(loc[x]=="login"){
			$(".togglechange").html("还没有账号？马上注册V")
			$(".register h3 .rg_tit").html("登录美食杰")
		}else{
			$(".togglechange").html("已有账号，马上登录Λ")
			$(".register h3 .rg_tit").html("注册美食杰")
		}
	}

//	更多登录方式
	$(".more_login a").mousedown(function(){
		if($(this).html()=="更多第三登录方式 V"){
			$(this).html("收起Λ");
		}else{
			$(this).html("更多第三登录方式 V")
		}
		
		$(".hide_login").slideToggle()
	})
//	手机、邮箱注册切换
	$(".register_pag li span").mousedown(function(){
		if($(this).attr("class")=="phone"){
			$(".register_page div").animate({"margin-left":"0"})
			$(this).addClass("bold").siblings().removeClass("bold")
		}else if($(this).attr("class")=="email"){
			$(".register_page div").animate({"margin-left":"-320px"})
			$(this).addClass("bold").siblings().removeClass("bold")
		}
	})
//	手机号验证
	$(".phone_reg").find(".userphone").focus(function(){
		$(this).keyup(function(){
			var reg=/^1(3|4|5|7|8)\d{9}$/;
			var phone_num = $(this).val();
			var result=reg.test(phone_num);
			if(result){
				$.ajax({
					url:'http://datainfo.duapp.com/shopdata/getuser.php?userID='+phone_num,
					type:'get',
					dataType:"jsonp",
					jsonCallback:"callback"
				})
				.done(function(data){
					if(data==0){
						$(".phone_reg").find("input[type=button]").addClass("button_change").prop("disabled",false)
						$(".phone_reg").find(".check_tit2").css({"display":"block"})
						$(".phone_reg").find(".check_tit1").css({"display":"none"})
						$(".phone_reg").find(".check_tit3").css({"display":"none"})		
						$(".phone_reg").find(".check_tit4").css({"display":"none"})	
					}	
					else{
						$(".phone_reg").find(".check_tit4").css({"display":"block"})	
						$(".phone_reg").find(".check_tit1").css({"display":"none"})
						$(".phone_reg").find(".check_tit2").css({"display":"none"})
						$(".phone_reg").find(".check_tit3").css({"display":"none"})
					}
				})			
			}else{
				$(".phone_reg").find(".check_tit1").css({"display":"block"})
				$(".phone_reg").find(".check_tit2").css({"display":"none"})
				$(".phone_reg").find(".check_tit3").css({"display":"none"})
				$(".phone_reg").find(".check_tit4").css({"display":"none"})	
			}
		})
	})
//	邮箱验证
	$(".email_reg").find(".useremail").focus(function(){
		$(this).keyup(function(){
			var reg=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			var phone_num = $(this).val();
			var result=reg.test(phone_num);
			if(result){
				if(result){
					$.ajax({
						url:'http://datainfo.duapp.com/shopdata/getuser.php?userID='+phone_num,
						type:'get',
						dataType:"jsonp",
						jsonCallback:"callback"
					})
					.done(function(data){
						if(data==0){
							$(".email_reg").find("input[type=button]").addClass("button_change").prop("disabled",false)
							$(".email_reg").find(".check_tit2").css({"display":"block"})
							$(".email_reg").find(".check_tit1").css({"display":"none"})
							$(".email_reg").find(".check_tit3").css({"display":"none"})
							$(".email_reg").find(".check_tit4").css({"display":"none"})	
						}	
						else{
							$(".email_reg").find(".check_tit4").css({"display":"block"})	
							$(".email_reg").find(".check_tit1").css({"display":"none"})
							$(".email_reg").find(".check_tit2").css({"display":"none"})
							$(".email_reg").find(".check_tit3").css({"display":"none"})
						}
					})			
				}else{
					$(".email_reg").find(".check_tit1").css({"display":"block"})
					$(".email_reg").find(".check_tit2").css({"display":"none"})
					$(".email_reg").find(".check_tit3").css({"display":"none"})
					$(".email_reg").find(".check_tit4").css({"display":"none"})	
				}
				
			}else{
				$(".email_reg").find(".check_tit1").css({"display":"block"})
				$(".email_reg").find(".check_tit2").css({"display":"none"})
				$(".email_reg").find(".check_tit3").css({"display":"none"})
				$(".email_reg").find(".check_tit4").css({"display":"none"})	
			}
		})
	})
//	随机数
	$(".phone_reg").find("input[type=button]").click(function(){
		$(".back_wrap").css({"display":"block"});
		$(".check_box form input[type=text]").val("")
		var code = "";
		var selectChar = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');		
		for (i=0;i<4;i++) {
			var charIndex = Math.floor(Math.random()*36); 
			code +=selectChar[charIndex]; 
		}   	
		$(".verification").html(code)
	})
	$(".check_box h3 span").click(function(){
		$(".back_wrap").css({"display":"none"});
	})
	$(".check_box form a").click(function(){
		var code = "";
		var selectChar = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');		
		for (i=0;i<4;i++) {
			var charIndex = Math.floor(Math.random()*36); 
			code +=selectChar[charIndex]; 
		}   	
		$(".verification").html(code)
	})
	$(".check_box form input[type=button]").click(function(){
		if($(".check_box form input[type=text]").val()==$(".verification").html()){
			$(".back_wrap").css({"display":"none"});
			var code = "";
			var selectChar = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');		
			for (i=0;i<4;i++) {
				var charIndex = Math.floor(Math.random()*36); 
				code +=selectChar[charIndex]; 
			}   
			$(".check").val(code)
			
		}else{
			alert("验证码有误请重新输入")
			var code = "";
			var selectChar = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');		
			for (i=0;i<4;i++) {
				var charIndex = Math.floor(Math.random()*36); 
				code +=selectChar[charIndex]; 
			}   	
				$(".verification").html(code)
		}
	})
//	手机号注册密码强度验证
	$(".phone_reg").find("input[type=password]").focus(function(){
		$(this).keyup(function(){
			var reg1=/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
			var reg2=/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
			var reg3=/^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/;			
			var password_num = $(this).val();
			var result1=reg1.test(password_num);
			var result2=reg2.test(password_num);
			var result3=reg3.test(password_num);
			if($(this).val().length<6 || $(this).val().length>16){
				$(".phone_reg").find(".password_reg1").css({"display":"block"})
				$(".phone_reg").find(".password_reg2").css({"display":"none"})
				$(".phone_reg").find(".password_reg3").css({"display":"none"})
				$(".phone_reg").find(".password_reg4").css({"display":"none"})
			}else{
				if(result1){
					$(".phone_reg").find(".password_reg4").css({"display":"block"})
					$(".phone_reg").find(".password_reg1").css({"display":"none"})
					$(".phone_reg").find(".password_reg2").css({"display":"none"})
					$(".phone_reg").find(".password_reg3").css({"display":"none"})
				}else if(result2){
					$(".phone_reg").find(".password_reg3").css({"display":"block"})
					$(".phone_reg").find(".password_reg1").css({"display":"none"})
					$(".phone_reg").find(".password_reg2").css({"display":"none"})
					$(".phone_reg").find(".password_reg4").css({"display":"none"})
				}else if(result3){
					$(".phone_reg").find(".password_reg2").css({"display":"block"})
					$(".phone_reg").find(".password_reg1").css({"display":"none"})
					$(".phone_reg").find(".password_reg3").css({"display":"none"})
					$(".phone_reg").find(".password_reg4").css({"display":"none"})
				}
			}		
		})
	})
//	邮箱注册密码强度验证
		$(".email_reg").find("input[type=password]").focus(function(){
		$(this).keyup(function(){
			var reg1=/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
			var reg2=/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
			var reg3=/^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/;			
			var password_num = $(this).val();
			var result1=reg1.test(password_num);
			var result2=reg2.test(password_num);
			var result3=reg3.test(password_num);
			if($(this).val().length<6 || $(this).val().length>16){
				$(".email_reg").find(".password_reg1").css({"display":"block"})
				$(".email_reg").find(".password_reg2").css({"display":"none"})
				$(".email_reg").find(".password_reg3").css({"display":"none"})
				$(".email_reg").find(".password_reg4").css({"display":"none"})
			}else{
				if(result1){
					$(".email_reg").find(".password_reg4").css({"display":"block"})
					$(".email_reg").find(".password_reg1").css({"display":"none"})
					$(".email_reg").find(".password_reg2").css({"display":"none"})
					$(".email_reg").find(".password_reg3").css({"display":"none"})
				}else if(result2){
					$(".email_reg").find(".password_reg3").css({"display":"block"})
					$(".email_reg").find(".password_reg1").css({"display":"none"})
					$(".email_reg").find(".password_reg2").css({"display":"none"})
					$(".email_reg").find(".password_reg4").css({"display":"none"})
				}else if(result3){
					$(".email_reg").find(".password_reg2").css({"display":"block"})
					$(".email_reg").find(".password_reg1").css({"display":"none"})
					$(".email_reg").find(".password_reg3").css({"display":"none"})
					$(".email_reg").find(".password_reg4").css({"display":"none"})
				}
			}			
		})
	})
//	手机号注册请求ajax
		$(".phone_reg").find('input[type=submit]').click(function(){
			if($(".phone_reg").find('input[type=text]').val()!=""&&$(".phone_reg").find("input[type=password]").val().length>=6&&$(".phone_reg").find("input[type=password]").val().length<=16&&$(".phone_reg").find("input[type=checkbox]").prop("checked")==true){			
				var userphone = $('.userphone').val();
				var passWord = $('.phone_reg input[type=password]').val();
				$.ajax({
					url:'http://datainfo.duapp.com/shopdata/userinfo.php?status=register&userID='+userphone+'&password='+passWord,
					type: 'POST',
				})
				.done(function(data){
					if(data==1){
						location.href="register.html?login";							
					}
					else if(data==0){
						alert('手机号已注册')
					}
					else if(data ==2){
						alert('数据库错误')
					}						
				})		
			}
			return false;
		})
//	邮箱注册请求ajax
		$(".email_reg").find('input[type=submit]').click(function(){
			if($(".useremail").find('input[type=text]').val()!=""&&$(".email_reg").find("input[type=password]").val().length>=6&&$(".email_reg").find("input[type=password]").val().length<=16&&$(".email_reg").find("input[type=checkbox]").prop("checked")==true){			
				var useremail = $('.useremail').val();
				var passWord = $('.email_reg input[type=password]').val();
				$.ajax({
					url:'http://datainfo.duapp.com/shopdata/userinfo.php?status=register&userID='+useremail+'&password='+passWord,
					type: 'POST',
				})
				.done(function(data){
					if(data==1){	
						location.href="register.html?login";						
					}
					else if(data==0){
						alert('邮箱已注册')
					}
					else if(data ==2){
						alert('数据库错误')
					}						
				})		
			}
			return false;
		})	
//	登录注册界面互换
		if($(".togglechange").html()=="还没有账号？马上注册V"){			
			$(".login").css({"display":"block"})
			$(".register_pag").css({"display":"none"})
			$(".togglechange").mousedown(function(){
				if($(".togglechange").html()=="还没有账号？马上注册V"){
					$(".login").slideUp()
					$(".register_pag").slideDown()	
					$(".togglechange").html("已有账号，马上登录Λ")
					$(".register h3 .rg_tit").html("注册美食杰")
				}else{
					$(".login").slideDown()
					$(".register_pag").slideUp()	
					$(".togglechange").html("还没有账号？马上注册V")
					$(".register h3 .rg_tit").html("登录美食杰")
				}				
			})				
		}	
		else if($(".togglechange").html()=="已有账号，马上登录Λ"){			
			$(".login").css({"display":"none"})
			$(".register_pag").css({"display":"block"})
			$(".togglechange").mousedown(function(){
				if($(".togglechange").html()=="还没有账号？马上注册V"){
					$(".login").slideUp()
					$(".register_pag").slideDown()	
					$(".togglechange").html("已有账号，马上登录Λ")
					$(".register h3 .rg_tit").html("注册美食杰")
				}else{
					$(".login").slideDown()
					$(".register_pag").slideUp()	
					$(".togglechange").html("还没有账号？马上注册V")
					$(".register h3 .rg_tit").html("登录美食杰")
				}				
			})				
		}		
//登录请求ajax+免登录
	$(".login input[type=submit]").click(function(event) {
		var userName = $('.login  input[type=text]').val();
		var passWord = $('.login  input[type=password]').val();
		$.ajax({
			url: 'http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID='+userName+'&password='+passWord,
			type: 'POST',
		})
		.done(function(data) {
			if(data==2){
				alert('用户名密码不符')
			}
			else if(data==0){
				alert('用户名不存在')
			}
			else{
				var checked = $(".login .height33 input").prop("checked")
				var data = JSON.parse(data);
				if(checked==true){
					$.cookie("UsernameR",$(".loginneme").val(),{expires:7})//记住用户名
					$.cookie("passwordR",$(".loginpassword").val(),{expires:7})//记住密码
					$.cookie("Username",$(".loginneme").val())
					location.href="index.html?"+data[1]
				}else{
					$.cookie("UsernameR",$(".loginneme").val(),{expires:-7})
					$.cookie("passwordR",$(".loginpassword").val(),{expires:-7})
					$.cookie("Username",$(".loginneme").val())
					location.href="index.html?"+data[1]
				}	
			}				
		})	
		return false;
	});
	jQuery(document).ready(function($) {
		var Checked = $.cookie().UsernameR;							//如果记住了 密码
		if(Checked){												//
			$(".login .height33 input").prop("checked",true);
			$(".loginneme").val($.cookie().UsernameR)
			$(".loginpassword").val($.cookie().passwordR)
		}else{
			$(".login .height33 input").prop("checked",false);
			$(".loginneme").val("")
			$(".loginpassword").val("")
		}
	});
})
	


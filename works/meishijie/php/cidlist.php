<?php
	$data =$_POST['data'];
	$key="60481de58bfd21467b64b1bbba3349f8";
	header("Access-Control-Allow-Origin:http://apis.juhe.cn/cook/index?key=".$key."&".$data."&rn=30");
	header('Access-Control-Allow-Methods:POST');
	$url ="http://apis.juhe.cn/cook/index?key=".$key."&".$data."&rn=30";
	$html=file_get_contents($url);
	echo $html;	
?>
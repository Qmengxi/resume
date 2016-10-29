<?php
	$data =$_POST['data'];
	$key="60481de58bfd21467b64b1bbba3349f8";
	header("Access-Control-Allow-Origin:http://apis.juhe.cn/cook/query?key=".$key."&".$data);
	header('Access-Control-Allow-Methods:POST');
	$url ="http://apis.juhe.cn/cook/query?key=".$key."&".$data;
	$html=file_get_contents($url);
	echo $html;	
?>
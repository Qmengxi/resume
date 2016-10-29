<?php
	$key="60481de58bfd21467b64b1bbba3349f8";
	header("Access-Control-Allow-Origin:http://apis.juhe.cn/cook/category?key=".$key);
	header('Access-Control-Allow-Methods:POST');
	$url ="http://apis.juhe.cn/cook/category?key=".$key;
	$html=file_get_contents($url);
	echo $html;	
?>
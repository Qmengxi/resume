<?php
	$data =$_POST['data'];
	$key="0cf92c915763bc2297f542100e49f3c8";
	header("Access-Control-Allow-Origin:http://apis.juhe.cn/cook/category?key=".$key."&".$data);
	header('Access-Control-Allow-Methods:POST');
	$url ="http://apis.juhe.cn/cook/category?key=".$key."&".$data;
	$html=file_get_contents($url);
	echo $html;	
?>
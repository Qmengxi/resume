<?php
	$data =$_POST['data'];
	$key="eb797409df0333f982c5ec5e0a9384b8";
	header("Access-Control-Allow-Origin:http://apis.juhe.cn/cook/queryid?key=".$key."&".$data);
	header('Access-Control-Allow-Methods:POST');
	$url ="http://apis.juhe.cn/cook/queryid?key=".$key."&".$data;
	$html=file_get_contents($url);
	echo $html;	
?>
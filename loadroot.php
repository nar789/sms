<?
	
	$f=fopen("root.txt","r");
	$r=fread($f,filesize("root.txt"));
	fclose($f);
	echo $r;
?>
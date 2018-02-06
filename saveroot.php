<?
	$r=$_POST['root'];
	$f=fopen("root.txt","w");
	fwrite($f,$r);
	fclose($f);
	echo "success";
?>
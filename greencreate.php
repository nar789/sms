<?
	$d=$_POST['data'];
	$r=$_POST['root'];
	$org_d=$d;
	$d=urldecode($d);
	//$d=str_replace("\'","\\\"", $d);
	$g=json_decode($d,false);
	if($g->name=="")die("need to gname");
	
	$vtxt=fopen("greenbox/".$g->name."/config.txt","w") or die("open fail.");
	fwrite($vtxt,$org_d);
	fclose($vtxt);


	/*

	$file=fopen("greenbox/".$g->name."/copy.bat","w") or die("open fail.");
	$str='';
	for($i=0;$i<count($g->f);$i++){
		$str=$str."copy ";
		$str=$str."files/".$g->f[$i]->path." ";
		$str=$str.$r."\\".$g->f[$i]->copy."\n";
	}
	fwrite($file,$str);
	fclose($file);
*/
	
	$file=fopen("greenbox/".$g->name."/run.bat","w") or die("open fail.");
	fwrite($file,$g->cmd);
	fclose($file);

	echo "[".$g->name."] creating is successed!";
?>
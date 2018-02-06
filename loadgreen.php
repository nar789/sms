<?
	$path="./greenbox/";
	$dirs=dir($path);
	while(false !== ($entry = $dirs->read())){ // 읽기 
	    $entrys[] = $entry; 
	} 
	$dirs->close();
	$ret=array();
	for($i=2;$i<count($entrys);$i++)
	{
		$f=fopen("./greenbox/".$entrys[$i]."/config.txt","r");
		$j=fread($f,filesize("./greenbox/".$entrys[$i]."/config.txt"));
		array_push($ret,$j);
	}
	$ret=json_encode($ret);
	echo $ret;
?>
<?
	$d=$_POST['d'];
	$var=$_POST['var'];
	$root=$_POST['root'];
	$d=urldecode($d);
	$d=json_decode($d,false);
	$var=urldecode($var);
	$var=json_decode($var,false);
	$root=urldecode($root);
	

	//echo $d->name;
	//echo $var[0];
	//echo $root;
	
	
	//글자치환하고 copy run 실행하고 치환한 코드 반환
	//글자치환은 파일(글자치환해서) 코드(치혼해서 반환) 명령어(치환해서 run.bat )
	
	for($i=0;$i<count($d->f);$i++){
		if(!$d->f[$i]->path)continue;

		$path="./greenbox/".$d->name."/files/".$d->f[$i]->path;
		$f=fopen($path,"r");
		$data=fread($f,filesize($path));
		fclose($f);
	
		for($j=0;$j<count($d->v);$j++)
		{
			if(!$d->v[$j])continue;
			$data=str_replace("^^".$d->v[$j],$var[$j],$data);
		}
		$f=fopen($root."/".$d->f[$i]->copy,"w");
		fwrite($f,$data);
		fclose($f);

		
	}



	//cmd
	if($d->cmd!="")
	{
		$path="./greenbox/".$d->name."/run.bat";
		$f=fopen($path,"r");
		$data=fread($f,filesize($path));
		fclose($f);

		for($j=0;$j<count($d->v);$j++)
		{
			if(!$d->v[$j])continue;
			$data=str_replace("^^".$d->v[$j],$var[$j],$data);
		}

		$path2=$root."\\copyrun.bat";
		$f=fopen($path2,"w");
		fwrite($f,$data);
		fclose($f);
		exec($path2,$output);
	}

//source
	$cc=array();

	for($i=0;$i<count($d->c);$i++){
		if($d->c[$i]->code=="")continue;
		$data=$d->c[$i]->code;

		for($j=0;$j<count($d->v);$j++)
		{
			if(!$d->v[$j])continue;
			$data=str_replace("^^".$d->v[$j],$var[$j],$data);
		}
		array_push($cc, $data);
	}
	$cc=json_encode($cc);
	echo rawurlencode($cc);
?>
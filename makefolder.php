<?
	$n=$_GET['gname'];
	if($n){
		if(!mkdir("./greenbox/".$n,0777,true))
			die("fail");
		if(!mkdir("./greenbox/".$n."/files",0777,true))
			die("fail");
		if(!mkdir("./greenbox/".$n."/codes",0777,true))
			die("fail");
		echo "success";
	}else
		echo "fail. need gname.";
?>
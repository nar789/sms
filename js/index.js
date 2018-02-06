//static
var rootpath="";
var gname="";
var varcnt=2;
var filecnt=2;
var scnt=2;
var glist=[];
var selidx=-1;
var moveflag=false;
//


function cubeover(img){
	img.src="img/smile_sel.png";
}
function cubeout(img){
	img.src="img/smile.png";
}

function cubeclick(no){
	selidx=no;
	$(".btm-nav").fadeOut();
	$(".btm-nav").fadeIn();
	$(".spinner").css("display","none");
	$("#spin"+no).css("display","inline-block");
}

function navover(){
	$("#sidebar").animate({left: '0px'},"fast");
}
function navout(){
	$("#sidebar").animate({left: '-9%'},"fast");	
}

function dlgclose(){
	$("#back").css("display","none");
	$(".dlg").css("display","none");
}

function syssave(){
	rootpath=$("#root").val();
	var r=encodeURIComponent(rootpath);
	$("#root").val("");
	$.post("saveroot.php",{root:r},function(d,s){alert(d);dlgclose();});
}
function pathload(){
	if(rootpath!="")
		$("#rpath").html("현재프로젝트경로 : "+rootpath);
}

function menu(id){
	dlgclose();
	$("#back").css("display","inline-block");
	$(".dlg").css("top","-20%");
	$(".dlg").animate({top: '20%'},"fast");
	if(id==1)
	{
		$("#sys").css("display","inline-block");
		pathload();
	}else if(id==2){
		menu2init();
		$("#green").css("display","inline-block");

	}else if(id==3){

	}else if(id==4){

	}else if(id==5){
		$("#green").css("display","inline-block");		
	}
}

function subclick(id){
	$(".cont").css("display","none");
	$(".sub").css("background-color","#5f5f5f");
	$(".sub").mouseenter(function(){$(this).css("background-color","black");});
	$(".sub").mouseleave(function(){$(this).css("background-color","#5f5f5f");});
	$("#sub"+id).mouseenter(function(){$(this).css("background-color","black");});
	$("#sub"+id).mouseleave(function(){$(this).css("background-color","#4caf50");});
	$("#sub"+id).css("background-color","#4caf50");
	$("#cont"+id).css("display","inline-block");
}



function addvar(){
	varcnt++;
	$("#addvar").remove();
	var k=$("#cont1").html();
	$("#cont1").html(k+"<input type=text class=nameinput placeholder=\"변수이름\" id=val"+varcnt+"><div class=addbtn id=addvar onclick=\"addvar()\">변수추가</div>");
}
function addvar2(){
	varcnt++;
	$("#addvar").remove();
	var k=$("#cont1").html();
	$("#cont1").html(k+"<input type=text class=nameinput-half placeholder=\"변수이름\" id=val"+varcnt+"><input type=text class=nameinput-half placeholder=\"변수값을 입력해주세요\" id=in"+varcnt+"><div class=addbtn id=addvar onclick=\"addvar()\">변수추가</div>");

}

function addfile(){
	filecnt++;
	$("#addfile").remove();
	var k=$("#cont2").html();
	var r="<input type=text class=fileinput placeholder=\"파일경로\" id=file"+filecnt+">&nbsp;&nbsp;<input type=text class=fileinput placeholder=\"복사될 경로\" id=copy"+filecnt+">";
	r=r+"<div class=addbtn id=addfile onclick=\"addfile()\">파일추가</div>";
	$("#cont2").html(k+r);
}

function adds(){
	scnt++;
	$("#adds").remove();
	var k=$("#cont3").html();
	var r="<input type=text class=sinput placeholder=\"소스이름\" id=sn"+scnt+">&nbsp;&nbsp;<input type=text class=sinput placeholder=\"예제소스 경로\" id=ex"+scnt+">&nbsp;&nbsp;<div class=sbtn onclick='sedit("+scnt+")'>소스입력</div>";
	r=r+"<textarea class=sedit id=sedit"+scnt+" row=100 cols=80></textarea>";
	r=r+"<div class=addbtn id=adds onclick=\"adds()\">소스추가</div>";
	$("#cont3").html(k+r);
}

function sedit(no){
	$("#sedit"+no).slideToggle();
}

function makefolder(){
	gname=$("#gname").val();
	if(gname!=""){
		$.get("makefolder.php?gname="+gname,function(d,s){
			alert(d);
		});
	}
}

function gresave(){
	if(rootpath==""){
		alert("루트 디렉토리가 지정되지 않았습니다.");
		return;
	}

	var vname=[];
	for(var i=1;i<=varcnt;i++)
		vname.push($("#val"+i).val());
	
	var files=[];
	for(var i=1;i<=filecnt;i++){
		var f=new Object();
		f.path=$("#file"+i).val();
		f.copy=$("#copy"+i).val();
		files.push(f);
	}

	var codes=[];
	for(var i=1;i<=scnt;i++){
		var s=new Object();
		s.sn=$("#sn"+i).val();
		s.ex=$("#ex"+i).val();
		s.code=$("#sedit"+i).val();
		codes.push(s);
	}

	var cmd=$("#cmd").val();

	var j=new Object();
	j.name=gname;
	j.v=vname;
	j.f=files;
	j.c=codes;
	j.cmd=cmd;
	j.top=0;
	j.left=0;
	var str=JSON.stringify(j);
	str=encodeURIComponent(str);
	$.post("greencreate.php",{
		data:str,
		root:rootpath
	},function(d,s){
		glist.push(j);
		if(glist.length==1)
			insertgreen(1,glist.length-1);
		else
			insertgreen(2,glist.length-1);
		alert(d);
		dlgclose();
	});
}

function insertgreen(lev,idx){
	var k=$("#lev"+lev).html();
	var c="<div class=cube-g id=g"+idx+" onclick='cubeclick("+idx+")'><img src=img/smile.png class=cube onmouseover='cubeover(this)' onmouseout='cubeout(this)'><p class=cube-name>"+glist[idx].name;
	c=c+"</p><div id=spin"+idx+" class=spinner><div class=double-bounce1></div><div class=double-bounce2></div></div></div>";
	$("#lev"+lev).html(k+c);
	//$("#g"+idx).css("top","76px");
	//$("#g"+idx).css("left","86px");
	$("#g"+idx).css("top",glist[idx].top+"px");
	$("#g"+idx).css("left",glist[idx].left+"px");
}

function loadgreen(){

	$.post("loadgreen.php",{},function(d,s){
		var r=JSON.parse(d);
		for(var i=0;i<r.length;i++)
		{
			glist.push(JSON.parse(decodeURIComponent(r[i])));
			if(i==0)
				insertgreen(1,i);
			else
				insertgreen(2,i);
		}
	});
}

function loadroot(){
	$.post("loadroot.php",{},function(d,s){rootpath=decodeURIComponent(d);});
}

function init(){
	loadroot();
	loadgreen();
	$(window).scroll(function(){
		var pos=$(window).scrollTop();
		pos+=10;
		$(".btm-nav").css("top",pos+"px");
	});
}

function levclick(event){
	if(moveflag==true){
		var top=event.offsetY;
		var left=event.offsetX;
		$("#g"+selidx).css("top",top+"px");
		$("#g"+selidx).css("left",left+"px");		
		glist[selidx].top=top;
		glist[selidx].left=left;
		var str=JSON.stringify(glist[selidx]);
		str=encodeURIComponent(str);
		$.post("greencreate.php",{
				data:str,
				root:rootpath
			},function(d,s){
		});

		moveflag=false;
	}
}

$("#lev1").onload=init();

function gmove(){
	moveflag=true;
}

function adjust(){
	$("#gdlgtitle").html("엽록체정보");
	$("#gname").val(glist[selidx].name);
	$("#makefolderbtn").css("display","none");
//variable
	var t="";
	varcnt=glist[selidx].v.length;
	for(var i=0;i<glist[selidx].v.length;i++)
	{
		var idx=i+1;
		t=t+"<input type=text class=nameinput-half value=\""+glist[selidx].v[i]+"\" id=val"+idx+"><input type=text class=nameinput-half id=in"+idx+" placeholder=\"변수값을 입력해주세요.\">";
	}
	t=t+"<div class=addbtn id=addvar onclick=\"addvar2()\">변수추가</div>";
	$("#cont1").html(t);
//source
	t="";
	scnt=glist[selidx].c.length;
	for(var i=0;i<glist[selidx].c.length;i++)
	{
		var idx=i+1;
		t=t+"<input type=text class=sinput placeholder=\"소스이름\" id=sn"+idx+" value=\""+glist[selidx].c[i].sn+"\">&nbsp;&nbsp;<input type=text class=sinput placeholder=\"예제소스 경로\" id=ex"+idx+" value=\""+glist[selidx].c[i].ex+"\">&nbsp;&nbsp;<div class=sbtn onclick='sedit("+idx+")'>소스입력</div>";
		t=t+"<textarea class=sedit id=sedit"+idx+" row=100 cols=80>"+glist[selidx].c[i].code+"</textarea>";
	}
	t=t+"<div class=addbtn id=adds onclick=\"adds()\">소스추가</div>";
	$("#cont3").html(t);

//file

	t="";
	filecnt=glist[selidx].f.length;
	for(var i=0;i<glist[selidx].f.length;i++)
	{
		var idx=i+1;
		t=t+"<input type=text class=fileinput placeholder=\"파일경로\" id=file"+idx+" value=\""+glist[selidx].f[i].path+"\">&nbsp;&nbsp;<input type=text class=fileinput placeholder=\"복사될 경로\" id=copy"+idx+" value=\""+glist[selidx].f[i].copy+"\">";
	}
	t=t+"<div class=addbtn id=addfile onclick=\"addfile()\">파일추가</div>";
	$("#cont2").html(t);

//cmd

	t="<textarea class=cmd id=cmd row=100 cols=80>"+glist[selidx].cmd+"</textarea>";
	$("#cont4").html(t);


	t="<div class=btn-half onclick=\"greupdate()\">수정하기</div><div class=btn-half-green onclick=\"run()\">적용하기</div>";
	$("btm").html(t);

	menu(5);
}

function greupdate(){
	gname=$("#gname").val();
	if(rootpath==""){
		alert("루트 디렉토리가 지정되지 않았습니다.");
		return;
	}

	var vname=[];
	for(var i=1;i<=varcnt;i++)
		vname.push($("#val"+i).val());
	
	var files=[];
	for(var i=1;i<=filecnt;i++){
		var f=new Object();
		f.path=$("#file"+i).val();
		f.copy=$("#copy"+i).val();
		files.push(f);
	}

	var codes=[];
	for(var i=1;i<=scnt;i++){
		var s=new Object();
		s.sn=$("#sn"+i).val();
		s.ex=$("#ex"+i).val();
		
		s.code=$("#sedit"+i).val();
		
		codes.push(s);
	}

	var cmd=$("#cmd").val();
	var top=glist[selidx].top;
	var left=glist[selidx].left;
	var j=new Object();
	j.name=gname;
	j.v=vname;
	j.f=files;
	j.c=codes;
	j.cmd=cmd;
	j.top=top;
	j.left=left;
	glist[selidx]=j;
	var str=JSON.stringify(j);
	str=encodeURIComponent(str);
	$.post("greencreate.php",{
		data:str,
		root:rootpath
	},function(d,s){
		alert(d);
		dlgclose();
	});
}

function run(){
	var varin=[];
	for(var i=0;i<varcnt;i++)
	{
		var idx=i+1;
		varin.push($("#in"+idx).val());
	}
	$.post("run.php",{
		d:encodeURIComponent(JSON.stringify(glist[selidx])),
		var:encodeURIComponent(JSON.stringify(varin)),
		root:encodeURIComponent(rootpath)
	},function(d,s){
		d=decodeURIComponent(d);
		d=JSON.parse(d);

		$(".clip-g").html("");
		var t="";
		for(var i=0;i<d.length;i++)
		{
			t=t+"<div class=clip-item><textarea onclick=\"CopyToClipboard(this,this)\" id=clip"+i+" class=clip>"+d[i]+"</textarea><p class=clip-t id=clip"+i+"-t>"+glist[selidx].c[i].sn+"</p></div>";
		}
		$(".clip-g").html(t);
		alert("success");

		dlgclose();
	});
}

function menu2init(){
	$("#gdlgtitle").html("엽록체생성");
	$("#gname").val("");
	$("#makefolderbtn").css("display","inline-block");


	//var
	var t="";
	for(var i=0;i<2;i++)
	{
		var idx=i+1;
		t=t+"<input type=text class=nameinput placeholder=\"변수이름\" id=val"+idx+">";
	}
	t=t+"<div class=addbtn id=addvar onclick=\"addvar()\">변수추가</div>";
	$("#cont1").html(t);


	//file
	t="";
	for(var i=0;i<2;i++)
	{
		var idx=i+1;
		t=t+"<input type=text class=fileinput placeholder=\"파일경로\" id=file"+idx+">&nbsp;&nbsp;<input type=text class=fileinput placeholder=\"복사될 경로\" id=copy"+idx+">";
	}
	t=t+"<div class=addbtn id=addfile onclick=\"addfile()\">파일추가</div>";
	$("#cont2").html(t);

	//source

	t="";
	for(var i=0;i<2;i++)
	{
		var idx=i+1;
		t=t+"<input type=text class=sinput placeholder=\"소스이름\" id=sn"+idx+" >&nbsp;&nbsp;<input type=text class=sinput placeholder=\"예제소스 경로\" id=ex"+idx+" >&nbsp;&nbsp;<div class=sbtn onclick='sedit("+idx+")'>소스입력</div>";
		t=t+"<textarea class=sedit id=sedit"+idx+" row=100 cols=80></textarea>";
	}
	t=t+"<div class=addbtn id=adds onclick=\"adds()\">소스추가</div>";
	$("#cont3").html(t);

	//cmd

	t="<textarea class=cmd id=cmd row=100 cols=80></textarea>";
	$("#cont4").html(t);

	//btm
	t="<div class=btn onclick=\"gresave()\">생성하기</div>";
	$("btm").html(t);
	
	varcnt=scnt=filecnt=2;
}


function ginfo(event){
	if(selidx>=0&&event.keyCode==32){
		gmove();
	}
	if(selidx>=0 && event.keyCode==13){
		if($("#green").css("display")=="none")
			adjust();
		else if($("#cont1").css("display")!="none")
			run();
	}
	if(event.keyCode==27){
		if($("#back").css("display")!="none"){
			dlgclose();
		}
	}
	//alert(event.keyCode);
}


function CopyToClipboard ( tagToCopy, textarea ){ 
		
        var textToClipboard = ""; 
        if ( "value" in tagToCopy ){    textToClipboard = tagToCopy.value;    } 
        else {    textToClipboard = ( tagToCopy.innerText ) ? tagToCopy.innerText : tagToCopy.textContent;    } 
        var success = false; 
        if ( window.clipboardData ){ 
                window.clipboardData.setData ( "Text", textToClipboard ); 
                success = true; 
        } 
        else { 
        		
                textarea.value = textToClipboard; 
                var rangeToSelect = document.createRange(); 

                rangeToSelect.selectNodeContents( textarea ); 

                var selection = window.getSelection(); 
                selection.removeAllRanges(); 
                selection.addRange( rangeToSelect ); 

                success = true; 

                try { 
                    if ( window.netscape && (netscape.security && netscape.security.PrivilegeManager) ){ 

                        netscape.security.PrivilegeManager.enablePrivilege( "UniversalXPConnect" ); 
                    } 

                    textarea.select(); 
                    success = document.execCommand( "copy", false, null ); 
                } 
                catch ( error ){  success = false;  } 
        } 

        //textarea.parentNode.style.display = "none"; 
        //textarea.value = ""; 

        if ( success ){ alert('붙여넣기 하여 사용하세요.'); } 
        else {    } 

        /* 
        if ( success ){    alert( ' The texts were copied to clipboard. \n\n Paste it, using "Ctrl + v". \n ' );    } 
        else {    alert( " It was failed to copy. \n " );    } 
        */ 
} 
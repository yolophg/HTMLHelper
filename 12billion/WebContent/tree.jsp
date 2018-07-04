<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<script src="./js/tree.js?5"></script>

<style type="text/css">

	.tag_list {list-style: none; margin:0px; padding:0px;}
	
	.name_Div {display: inline-block; vertical-align: top;}
	
	.children_Div {display: inline-block; margin-left:15px;}
	
	.name_Label {width: 50px; height:30px; border:2px solid green;
				margin-bottom:15px; top:0px; cursor: default;}
	.tags {width: 50px; height:30px; border:2px solid green;
				margin-bottom:15px; top:0px; cursor: default;}

	.drop_area {position: absolute; left: 0; top: 0; display: none; width: 100%; height: 100%;}
				
	.drop_area_elder {position: absolute; left: 0; top: 0; border-bottom: 1px solid #888; width: 60%; height: 50%; background-color: red; opacity: 0.3;}
	.drop_area_younger {position: absolute; left: 0; top: 50%; width: 60%; height: 50%; background-color: green; opacity: 0.3;}
	.drop_area_child {position: absolute; left: 60%; top: 0; border-left: 1px solid #888; width: 40%; height: 100%; background-color: blue; opacity: 0.3;}
	
</style>
<script type="text/javascript">
//$('.name_Div').mousedown(function() { alert('Handler for .mousedown() called.'); });
//$('.attr_Div1').mousedown(function() { alert('Handler for .mousedown() called2.'); });

</script>

<title>Insert title here</title>
</head>
<body>
	
	<div>
		<ul style="list-style: none">
			<li class="tags">div</li>
			<li class="tags">a</li>
		</ul>
	</div>
	
	
	<div id="dropSection" style="border:1px solid; width:1200px; height: 950px; padding: 10px; padding-top: 40px; margin-left: 350px;">

	</div> 
	
	<div class="drop_area">
		<div class="drop_area_elder"></div>
		<div class="drop_area_younger"></div>
		<div class="drop_area_child"></div>
	</div>
	

	 <div id="testcode" style="border:1px solid; width:600px; height:500px;margin-left: 350px; margin-top: 100px;">
	
	
	</div>

	<div class="test_button" style="width: 100px; height: 100px; background-color: yellow;"></div>
	
	
	
	<div id="testboard" style="border:1px solid; width:600px; height:500px;margin-left: 350px; margin-top: 100px;">
	
	<!-- del이 클릭되었을 때 옆의 인풋창이 무엇인지 구분이 되어야 해결됩니다. -->
	<input type='text' id='attr' name='attr' style='width:80px;height:30px;'/>
	<input type='text' id='attr2' name='attr' style='width:80px;height:30px;'/>
	
	<input type='button' id='del' name='del' onclick="mins(this);" style='width:80px;height:30px;'/>
	
	
	
	</div>

</body>
</html>
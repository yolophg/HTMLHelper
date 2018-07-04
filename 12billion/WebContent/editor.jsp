<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%
	long now = System.currentTimeMillis();
	response.setHeader("Cache-Control","no-store");   
	response.setHeader("Pragma","no-cache");   
	response.setDateHeader("Expires",0);   
	if (request.getProtocol().equals("HTTP/1.1")){
	        response.setHeader("Cache-Control", "no-cache");
	}
%>

<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>120 Billions</title>

<meta http-equiv="Cache-Control" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<meta http-equiv="Pragma" content="no-cache" />

<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet" href="css/popModal.css" />
<link rel="stylesheet" href="css/popup.css?<%=now%>" />
<link rel="stylesheet" href="css/mainpage.css?<%=now%>" />

<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="js/tabifier.js"></script>
<script src="js/editor.js?<%=now%>"></script>
<script src="js/attributes.js?<%=now%>"></script>

<script>
  	var tree = {};
  	var idPool = 0;
  	
  	$(document).ready(setting);
</script>
</head>
<body>

	<div class="icons">
		<ul style="list-style:none; text-align: center; left: -7px; position: relative;">
			<li id="div" class="icon morestyleli">DIV</li>
			<li id="input" class="icon nothing morestyleli">INPUT</li>
			<li id="a" class="icon morestyleli">A</li>
			<li id="img" class="icon morestyleli nothing">IMG</li>
			<li id="br" class="icon morestyleli nothing">BR</li>
			<li id="em" class="icon text-container morestyleli">EM</li>
			<li id="i" class="icon text-container morestyleli">I</li>
			<li id="ol" class="icon morestyleli li-container">OL</li>
			<li id="option" class="icon morestyleli">OPTION</li>
			<li id="span" class="icon text-container morestyleli">SPAN</li>
			<li id="tr" class="icon morestyleli td-container">TR</li>
			<li id="textarea" class="icon text-container morestyleli">TEXTAREA</li>
			<li id="li" class="icon morestyleli li">LI</li>
			<li id="ul" class="icon morestyleli li-container">UL</li>
			<li id="p" class="icon text-container morestyleli">P</li>
			<li id="table" class="icon morestyleli table">TABLE</li>
			<li id="hr" class="icon morestyleli nothing">HR</li>
			<li id="td" class="icon morestyleli td">TD</li>
			<li id="u" class="icon text-container morestyleli">U</li>
			<li id="text" class="icon text morestyleli nothing">텍스트 삽입</li>
		</ul>
	</div>

	<div class="editor droppable" id="tag_0">
		<div style="position: fixed; bottom: 0px;"></div>
	</div>

	<div class="editor-parent">
		<input type="image" id="execute" onclick="webPagePopupOpen()" src="img/ssssstart.png"/>
		<textarea readonly class="code" id="html-area"></textarea>
	</div>
	
	<div id="dialog_content" class="dialog_content" style="display: none">
		<div class="dialogModal_header">Edit</div>
		<div class="dialogModal_content"></div>
		<div class="dialogModal_footer">
			<button type="submit" class="btn btn-default"
				data-dialogmodal-but="cancel"></button>
		</div>
	</div>

	<div id="attributes_input_popup" tabindex="-1" class="modal" style="z-index: 100; overflow-y:auto; max-height: 800px;">
		<div class="input_area"></div>
		<hr>
		<div class="style_input_area">
			스타일<br>
			<input type="text" id="style-attr" class="col-md-3" name="styleName" placeholder="이름">
			<input type="text" id="style-attr-value" class="col-md-3" name="styleValue" placeholder="값">
			<button class="col-md-3" onclick="addOptionStyle()">추가</button> <button class="col-md-3" onclick="deleteOptionStyle()">삭제</button>
			<br>
			<select id ="styleOptionList" onchange="setStyleInput(this)" style="width: 100%" size='6'>
			</select>
		</div>
		<hr>
		<div>
			<span id="closePopupButton" onclick="hidePopup()" > <img style="margin-top: 5px;" alt='' src='img/return-button.png'/> </span>
			<input type="image" class="confirm_button" src="img/accept.png" id="morestyleOKinput"></input>
		</div>
	</div>
	
</body>
</html>
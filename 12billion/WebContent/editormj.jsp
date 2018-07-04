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

<link rel="stylesheet"
	href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
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
  
  	$(document).ready(function() {
  		
  		$(".icon").draggable();
  	
  	  	$(".icon").on("dragstop", function(event, ui) {
  			$(event.target).css({
  				left: 0,
  				top: 0,
  				"z-index": 0
  			});
  		});
  	  	
  	  	$(".icon").hover(function() {
  	  		$(this).css("background-color", "rgb(211, 249, 188)");
  	  	}, function() {
  	  		$(this).css("background-color", "#99D9EA");
  	  	});
  	  	
  	  	$(".icon").on({
  	  		mouseup: function() {
  	  			console.log("mouseup");
  	  			$(this).css("background-color", "#99D9EA");
  	  		},
  	  		mousedown: function() {
  	  			$(this).css({
  	  				"background-color": "rgb(211, 249, 188)",
  	  				"z-index": "100"
  	  			});
  	  		}
  	  	});
	  	
	  	$(".icon").dblclick(function(event) {
	  		var id = $(event.target).prop("id");
	  		helper(id);
	  	});
	  	
  	  	$(".editor").droppable({
			drop : fnDrop,
		});
  	  	
	  	$("#attributes_input_popup").hover(
	  	function() {
	  		$(this).unbind("focusout").css("opacity", "1");
	  	},
	  	function() {
	  		$(this).focusout(function() {
	  			hidePopup();
	  		}).css("opacity", "0.7");
	  	});
	  	
	  	appendTagData("tag_0", {
	  		id: "tag_0",
			parentId : null,
			tagName : "DIV",
			container : true});
  	});
	
	function openTag(tagName)
	{
		var attrs = $(this).attr(tags[tagName]);
	}
	
	function appendTag(container, tag)
  	{
		idPool++;
		var id = "tag_" + idPool;

		var div = $("<div/>").css("z-index", "-5000");

		console.log(tag);
		
		if(tag.hasClass("nothing")){
			div.addClass("nothing");
		}else if(tag.hasClass("text-container")){
			div.addClass("text-container");
		}else if(tag.hasClass("table")){
			div.addClass("table");
		}else if(tag.hasClass("td-container")){
			div.addClass("td-container");
		}else if(tag.hasClass("li-container")){
			div.addClass("li-container");
		}
		
		console.log(div);


		var deleteButton = $("<span/>").addClass("close").append($("<img/>").prop({
			src: "img/delete.png",
			alt: ""
		}));

		
		if(tag.hasClass("text"))
		{
			var tagName = "text";
			var input = $("<input/>").prop({
				type: "text",
				size: "40"
			});
			div.append(input);
			
			var submitButton = $("<span/>").prop({
				id: "moreEditStyle",
				"data-dialogmadal-bind": ".dialog_content",
				"data-type": "modal",
			}).css("z-index", "-100").append($("<img/>").prop({
				src: "img/check.png",
				alt: ""
			}));
			

			submitButton.on("click", function(){
				tree[id].text = input.val();
				refreshHTMLArea();
				console.log(tree[id]);
			});
			
			div.append(deleteButton);
			div.append(submitButton);
		}
		else
		{
			var tagName = tag.html();

			div.append($("<span/>").addClass("tag_name").html(tagName));
			
			var editButton = $("<span/>").prop({
				id: "moreEditStyle"
			}).css("z-index", "-100").append($("<img/>").prop({
				src: "img/cogwheel.png",
				alt: ""
			}));

			editButton.on("click",function() {
		  		openAttributesInputPopup(id);
				$("#attributes_input_popup").css("opacity", "0.7").focus();
		  		return;
		  		
			});
			
			div.append(deleteButton);
			div.append(editButton);
		}
		
		var siblingIndex = calculateTagIndex(container, event);
		//요기가 태그 스타일 바꾸는 부분/ 고정 값에서 므어므엄
		div.css({
			
			"border": "2px solid black",
			"border-radius": "10px",
			"margin-top": "10px",
		});
		
		div.prop("id", id);
		div.addClass("box");

		//insertBefore를 쓰기 위한 사용하지 않는 div
		var emptyspace = $("<div/>").css({
			position: "absolute",
			bottom: "0px"
		});
		
		div.append(emptyspace);
		
		deleteButton.on("click", function() {
			div.remove();
			
			var eventDom = $(event.target).parent().parent();
			var eventDomId = tree[eventDom.prop('id')].id;
			decrementSiblingIndex(eventDomId);
			
			removeTagData(id);
			refreshHTMLArea();
			console.log(tree);
		});
		

		div.insertBefore($(container.children()[siblingIndex]));

		div.droppable({
			drop : fnDrop,
		});
		
		
		var parentId = container.prop("id");
		appendTagData(id, {
			id: id,
			parentId: parentId,
			tagName: tagName,
			container: tag.hasClass("container"),
			siblingIndex: (parentId == "tag_0") ? siblingIndex : siblingIndex-3});
		
		console.log(tree);
	}
  	
	function fnDrop(event, ui)
  	{	
		console.log(event.target);
		if (event.target == event.toElement)
  		{
			if($(event.target).hasClass("nothing")){
				alert("이 태그에는 아무것도 넣을 수 없습니다.");
			}
			else if($(event.target).hasClass("text-container")){
				if($(ui.draggable).hasClass("text")){
		  			appendTag($(event.target), $(ui.draggable));
		  			incrementSiblingIndex('tag_'+idPool);
		  			refreshHTMLArea();
				}
				else{
					alert("이 태그에는 텍스트만 넣을 수 있습니다.");
				}
			}
			else if($(event.target).hasClass("td-container")){
				if($(ui.draggable).hasClass("td")){
		  			appendTag($(event.target), $(ui.draggable));
		  			incrementSiblingIndex('tag_'+idPool);
		  			refreshHTMLArea();
				}
				else{
					alert("이 태그에는 TD태그만 넣을 수 있습니다.");
				}
			}
			else if($(ui.draggable).hasClass("td")){
				if($(event.target).hasClass("td-container")){
		  			appendTag($(event.target), $(ui.draggable));
		  			incrementSiblingIndex('tag_'+idPool);
		  			refreshHTMLArea();
				}
				else{
					alert("TD태그는 TH태그나 TR태그에만 넣을 수 있습니다.");
				}
			}
			else if($(ui.draggable).hasClass("td-container")){
				if($(event.target).hasClass("table")){
		  			appendTag($(event.target), $(ui.draggable));
		  			incrementSiblingIndex('tag_'+idPool);
		  			refreshHTMLArea();
				}
				else{
					alert("이 태그는 TABLE태그에만 넣을 수 있습니다");
				}
			}
			else if($(event.target).hasClass("table")){
				if($(ui.draggable).hasClass("td-container")){
		  			appendTag($(event.target), $(ui.draggable));
		  			incrementSiblingIndex('tag_'+idPool);
		  			refreshHTMLArea();
				}
				else{
					alert("TABLE태그에는 TR태그나 TH태그만 넣을 수 있습니다.");
				}
			}
			else if($(event.target).hasClass("li-container")){
				if($(ui.draggable).hasClass("li")){
		  			appendTag($(event.target), $(ui.draggable));
		  			incrementSiblingIndex('tag_'+idPool);
		  			refreshHTMLArea();
				}
				else{
					alert("이 태그에는 LI태그만 넣을 수 있습니다.");
				}
			}
			else if($(ui.draggable).hasClass("li")){
				if($(event.target).hasClass("li-container")){
		  			appendTag($(event.target), $(ui.draggable));
		  			incrementSiblingIndex('tag_'+idPool);
		  			refreshHTMLArea();
				}
				else{
					alert("LI태그는 OL태그나 UL태그에만 넣을수 있습니다.");
				}
			}
			else{
				appendTag($(event.target), $(ui.draggable));
	  			incrementSiblingIndex('tag_'+idPool);
	  			refreshHTMLArea();
			}
  		}
  	}
  	
  	function appendTagData(id, data)
  	{
  		tree[id] = data;
  	}
  	
  	function removeTagData(id)
  	{
  		for (var i in tree)
  		{
  			if (tree[i].id == id)
  			{
  				delete tree[i];
  			}
  		}
  		
  		for (var i in tree)
  		{
  			if (tree[i].parentId == id)
  				
  			{
  				removeTagData(tree[i].id);
  			}
  		}
  	}
  	
  	function setText(tagId, text)
  	{
  		var tagData = tree[tagId];
  		if (tagData)
  		{
  			tagData.text = text;
  		}
  	}
  	
  	function helper(id)
  	{
  		if (id == "text")
  		{
  			alert("텍스트 삽입은 태그에 텍스트를 넣는 것 입니다.\n별다른 설명은 없습니다.");
  			return;
  		}
  		window.open("https://www.w3schools.com/tags/tag_" + id + ".asp");
  	}
  	
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

	<div class="editor droppable " id="tag_0" style="overflow-y: auto; ">
		<div style="position: absolute; bottom: 0px;">
		
		</div>
	</div>

	<div class="editor-parent" style="text-align: right;">
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

	<div id="attributes_input_popup" tabindex="-1" class="modal" style="max-height: 900px; overflow-y:auto; ">
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
			<span id="closePopupButton" onclick="hidePopup()"> <img style="margin-top: 5px;" alt='' src='img/return-button.png'/> </span>
			<input type="image" class="confirm_button" src="img/accept.png" id="morestyleOKinput"></input>
		</div>
	</div>
	
</body>
</html>
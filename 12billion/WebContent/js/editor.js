	//editor.jsp가 만들어질때 세팅을 하는 함수
	function setting()
	{
  		//.icon을 드래그 가능하도록 함
  		$(".icon").draggable();
  	
  		//.icon이 드래그를 멈췄을때 원래 위치로 돌아가도록 함
  	  	$(".icon").on("dragstop", function(event, ui) {
  			$(event.target).css({
  				left: 0,
  				top: 0
  			});
  		});
  	  	
  	  	//.icon이 클릭되었을때와 놓았을때의 z-index 변경
  	  	$(".icon").on({
  	  		mouseup: function() {
  	  			$(this).css("z-index", "1");
  	  			for(i=0;i<tree.length;i++){
  	  				
  	  			}
  	  		},
  	  		mousedown: function() {
  	  			$(this).css("z-index", "100");
  	  		}
  	  	});
	  	
  	  	//.icon이 더블클릭 되었을때 그 내용에 따른 helper라는 함수 실행
	  	$(".icon").dblclick(function(event) {
	  		var id = $(event.target).prop("id");
	  		helper(id);
	  	});
	  	
	  	//.editor위에 드래그 되었을때 fnDrop이라는 함수를 실행
  	  	$(".editor").droppable({
			drop: fnDrop
		});
  	  	
  	  	//팝업창이 떴을때 마우스가 호버되면 불투명 바깥으로 나가면 반투명(아마 후에 사라질 코드)
	  	$("#attributes_input_popup").hover(
	  	function() {
	  		$(this).unbind("focusout").css("opacity", "1");
	  	},
	  	function() {
	  		$(this).focusout(function() {
	  			hidePopup();
	  		}).css("opacity", "0.7");
	  	});
	  	
	  	//트리의 뿌리를 설정(editor div)
	  	appendTagData("tag_0", {
	  		id: "tag_0",
			parentId : null,
			tagName : "DIV",
			container : true
  		});
  	}
	
	//태그가 부모위에 드롭 되었을 때에 발생하는 함수
	//부모태그
	function fnDrop(event, ui)
  	{
		if($(event.target).hasClass("nothing"))
		{
			alert("이 태그에는 아무것도 넣을 수 없습니다.");
		}
		else if($(event.target).hasClass("text-container"))
		{
			if($(ui.draggable).hasClass("text"))
			{
		  		appendTag($(event.target), $(ui.draggable));
		  		incrementSiblingIndex('tag_'+idPool);
		  		refreshHTMLArea();
			}
			else
			{
				alert("이 태그에는 텍스트만 넣을 수 있습니다.");
			}
		}
		else if($(event.target).hasClass("td-container"))
		{
			if($(ui.draggable).hasClass("td"))
			{
		  		appendTag($(event.target), $(ui.draggable));
		  		incrementSiblingIndex('tag_'+idPool);
		  		refreshHTMLArea();
			}
			else
			{
				alert("이 태그에는 TD태그만 넣을 수 있습니다.");
			}
		}
		else if($(ui.draggable).hasClass("td"))
		{
			if($(event.target).hasClass("td-container"))
			{
		  		appendTag($(event.target), $(ui.draggable));
		  		incrementSiblingIndex('tag_'+idPool);
		  		refreshHTMLArea();
			}
			else
			{
				alert("TD태그는 TH태그나 TR태그에만 넣을 수 있습니다.");
			}
		}
		else if($(ui.draggable).hasClass("td-container"))
		{
			if($(event.target).hasClass("table"))
			{
		  		appendTag($(event.target), $(ui.draggable));
		  		incrementSiblingIndex('tag_'+idPool);
		  		refreshHTMLArea();
			}
			else
			{
				alert("이 태그는 TABLE태그에만 넣을 수 있습니다");
			}
		}
		else if($(event.target).hasClass("table"))
		{
			if($(ui.draggable).hasClass("td-container"))
			{
		  		appendTag($(event.target), $(ui.draggable));
		  		incrementSiblingIndex('tag_'+idPool);
		  		refreshHTMLArea();
			}
			else
			{
				alert("TABLE태그에는 TR태그나 TH태그만 넣을 수 있습니다.");
			}
		}
		else if($(event.target).hasClass("li-container"))
		{
			if($(ui.draggable).hasClass("li"))
			{
		  		appendTag($(event.target), $(ui.draggable));
		  		incrementSiblingIndex('tag_'+idPool);
		  		refreshHTMLArea();
			}
			else
			{
				alert("이 태그에는 LI태그만 넣을 수 있습니다.");
			}
		}
		else if($(ui.draggable).hasClass("li"))
		{
			if($(event.target).hasClass("li-container"))
			{
		  		appendTag($(event.target), $(ui.draggable));
		  		incrementSiblingIndex('tag_'+idPool);
		  		refreshHTMLArea();
			}
			else
			{
				alert("LI태그는 OL태그나 UL태그에만 넣을수 있습니다.");
			}
		}
		else
		{
			appendTag($(event.target), $(ui.draggable));
	  		incrementSiblingIndex('tag_'+idPool);
	  		refreshHTMLArea();
		}

  	}

	function calculateTagIndex(container, event)
	{
		console.log(event);
		var eventTop = event.pageY - container[0].offsetTop + $(".editor").scrollTop();
		console.log(eventTop);
		var children = container.children();
		var child;
		var top;
		for (var i = 0 ; i < children.length ; i++)
		{
			child = (children[i]);
			top = child.offsetTop-container[0].offsetTop;
			console.log(top);
			if (top > eventTop&&$(child).is("div"))
			{
				return i;
			}
		}
		
		return children.length;
	}
	
	function openMandatoryAttributesPopup(tagName)
	{
		$(".edit_popup").show();
		
		var attrs = TAG_ATTRS[tagName];
		
		console.log(attrs);
		
		for (var i in attrs)
		{
			appendAttrItems(attrs[i]);
		}
	}
	
	function appendAttrItems(attrName)
	{
		var div = $("<div/>");
		
		div.append($("<span>" + attrName +"</span>"));
		div.append(" : ");
		
		var input = $("<input>");
		div.append(input);
		
		$(".edit_popup").append(div);
	}
	
	// html 영역 새로고침
	function refreshHTMLArea() {
		var dom = blockToHtml("tag_0", null);
		var cleanCode = cleanHTML(dom.html());
		$("#html-area").html(cleanCode);
	}
	
	// (재귀함수) 블럭을 html코드로 변환
	function blockToHtml(myId, parentNode)
	{
		if(tree[myId].tagName == "text")
		{
			parentNode.append(tree[myId].text);
			return;
		}
		
		var myNode = $("<"+tree[myId].tagName+">");
		
		if (tree[myId].attrs)
		{
			// 각각 적용되는 속성들이 다름. 어떤건 되고 어떤건 안됨.
			myNode.attr(tree[myId].attrs);
			myNode.prop(tree[myId].attrs);
		}
		
		// 임시로 태그에 스타일 적용함. 나중엔 css창을 별도로 두어 관리할 것.
		if (tree[myId].style)
		{
			myNode.css(tree[myId].style);
		}
		
		(parentNode) && parentNode.append(myNode);
		
		var children = findChildren(myId);
		for (var i in children)
		{
			blockToHtml(children[i].id, myNode);
		}
		return myNode;
  	}
	
	// 자식들을 sibling 순서대로 찾아 반환
  	function findChildren(parentId)
  	{
  		var result = [];
  		for (var i = 0; i < getChildrenLength(parentId); i++)
  		{
	  		for (var node in tree)
	  		{
	  			if (tree[node].parentId == parentId)
	  			{
	  				if (tree[node].siblingIndex == i) {
	  					result.push(tree[node]);
	  				}
	  			}
	  		}
  		}
  		return result;
  	}
  	
  	// 바로밑의 자식의 수 반환
  	function getChildrenLength(id)
  	{
  		var length = 0;
  		for (var i in tree)
  		{
  			(tree[i].parentId == id) && length++;
  		}
  		return length;
  	}
  	
  	// 받은 곳 부터 끝까지 siblingIndex 증가
  	function incrementSiblingIndex(id)
  	{
		var addedSiblingIndex = tree[id].siblingIndex;
  		var parentId = tree[id].parentId;
  		var children_length = getChildrenLength(parentId);
  		
   		if (addedSiblingIndex + 1 < children_length)
  		{
  			for (var i = children_length-1; i >= addedSiblingIndex; i--)
  			{
  				for (var node in tree)
  				{
  					if (tree[node].parentId == parentId)
  					{
  						if (tree[node].siblingIndex == i)
  						{
  							(id != node) && tree[node].siblingIndex++;
  						}
  					}
  				}
  			}
  		}
  	}
  	
  	// 받은 곳 부터 끝까지 siblingIndex 감소
  	function decrementSiblingIndex(id)
  	{
  		var deletedSiblingIndex = tree[id].siblingIndex;
  		var parentId = tree[id].parentId;
  		var children_length = getChildrenLength(parentId);
  		
  		if (deletedSiblingIndex + 1 < children_length)
  		{
  			for (var i = deletedSiblingIndex + 1; i < children_length; i++)
  			{
  				for (var node in tree)
  				{
  					if (tree[node].parentId == parentId)
  					{
  						if (tree[node].siblingIndex == i)
  						{
  							(id != node) && tree[node].siblingIndex--;
  						}
  					}
  				}
  			}
  		}
  	}
  	
  	function webPagePopupOpen()
  	{
  		var popUrl = "webPage.html";
  		var popOption = "width=1600, height=900, status=no, left=160, top=10;";
  		var webPage = window.open(popUrl, "결과 웹페이지", popOption);
  		webPage.onload = function()
	  	{
	  		webPage.document.getElementsByTagName('body')[0].innerHTML = $("#html-area").val();
	  	}
  	}
  	
  	function openTag(tagName)
	{
		var attrs = $(this).attr(tags[tagName]);
	}
	
	function appendTag(container, tag)
  	{
		idPool++;
		var id = "tag_" + idPool;

		var parentId = container.prop("id");
		
		var generation = getGeneration(parentId);
		
		var div = $("<div/>").css({
			"border": "2px solid black",
			"border-radius": "10px",
			"margin-top": "10px",
			"margin-left": (110 * generation)+"px",
			"width": "100px"
		}).prop("id", id).addClass("box");

		console.log(tag);
		
		if(tag.hasClass("nothing"))
		{
			div.addClass("nothing");
		}
		else if(tag.hasClass("text-container"))
		{
			div.addClass("text-container");
		}
		else if(tag.hasClass("table"))
		{
			div.addClass("table");
		}
		else if(tag.hasClass("td-container"))
		{
			div.addClass("td-container");
		}
		else if(tag.hasClass("li-container"))
		{
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
			}).append($("<img/>").prop({
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
			}).append($("<img/>").prop({
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

		//insertBefore를 쓰기 위한 사용하지 않는 div
		var emptyspace = $("<div/>").css({
			position: "fixed",
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
		
		$("#tag_0").append(div);
		//div.insertBefore($("tag_0").children()[siblingIndex]);

		div.droppable({
			greedy: true,
			drop : fnDrop,
		});
		
		appendTagData(id, {
			id: id,
			parentId: parentId,
			tagName: tagName,
			container: tag.hasClass("container"),
			siblingIndex: (parentId == "tag_0") ? siblingIndex : siblingIndex-3});
		
		console.log(tree);
		console.log($("#tag_0"));
	}
  	
	function getGeneration(parentId){
		if(parentId == "tag_0"){
			return 1;
		}
		return 1+getGeneration(tree[parentId].parentId);
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
  	
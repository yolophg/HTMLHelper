$(document).ready(function() {
	initTrashCan();
	
	/*$.ajax({
        url: 'FileReadServlet',
        type: 'POST',
        data: {'fileId': "55"},
        success: function(response) {
        	console.log(this);
            data = response["data"];
            jsonData = jQuery.parseJSON(data["userFileCode"]);
        	console.log(jsonData);
        	nodeManager.setData(jsonData);
        },
        error: function() {
            console.log('input failed');
        }
    });*/
	var firstFileData;
	if (docCookies.hasItem('fileData')) {
		firstFileData = JSON.parse(docCookies.getItem('fileData'));
	} else {
		firstFileData = newTreeData;
	}
	nodeManager.setData(firstFileData);
	$(".addBtn").hide();
	/* var rootNode = nodeManager.dataToNodeTree(sampleTreeData);
	console.log(rootNode);
	
	drawer.draw(rootNode, $("#dropSection")); */
	
});

var sampleCodeData = "<body>  	<div> 	 <img>  <div>  </div>  </img>	 안녕 </div> dddd<input> </input> </body>"
var tes = "<body>  	<div> 	 <img>  <div>  </div>  </img>	 " +
	" <<a> 안녕 </a> </div> <input> </input> </body>"

var newTreeData = {
	tagName: 'body', attributes: {}, styles: {}, children: [
		
	]
};

var sampleTreeData = {
	tagName: 'body', attributes: {"id": "asdf", "href": "hello"}, styles: {}, children: [
		{tagName: 'div', attributes: {"id": "this", "href": "is", "hello": "div"}, styles: {}, children: [
			
		]},
		{tagName: 'div', attributes: {"id": "yes"}, styles: {}, children: [
			
		]}
	]
};

function initNodeSelect(){
	$("#attrTitle").empty();
	$("#attrText").empty();
	$("#cssTitle").empty();
	$("#cssText").empty();
	$(".selected").removeClass("selected");
	nodeManager.selectedNode = null;
	$(".addBtn").hide();
}

function Node(tagName, text) {
	this.tagName = tagName;
	this.text = text;
	this.styles = {};
	this.attributes = {};
	this.children = [];
	
	this.tagId = Node.createTagId();
}

Node.tagId = -1;
Node.nowDrag = 0;
var attrId = -1;
var cssId = -1;

Node.createTagId = function() {
	Node.tagId++;
	return "tag_" + Node.tagId;
};

Node.prototype.addStyle = function(name, value) {
	this.styles[name] = value;
};

Node.prototype.removeStyle = function(name) {
	delete this.styles[name];
};

Node.prototype.addClass = function(className) {
	this.classes.push(className);
};

Node.prototype.removeClass = function(className) {
	for (var i in this.classes)
	{
		if (this.classes[i] == className)
		{
			this.classes.splice(i, 1);
		}
	}
};

Node.prototype.addAttribute = function(name, value) {
	this.attributes[name] = value;
};

Node.prototype.removeAttribute = function(name) {
	delete this.attributes[name];
};

Node.prototype.appendChild = function(childNode, location) {
	childNode.parentId = this.tagId;
	if (location)
	{
		this.children.splice(location, 0, childNode);
	}
	else
	{
  		this.children.push(childNode);
	}
};

Node.prototype.removeChild = function(childId) {
	for (var i in this.children)
	{
		if (this.children[i].tagId == childId)
		{
			return this.children.splice(i, 1);
		}
	}
};



$(document).ready(function() {
	
	/*var body = new Node("body");
	
	this.rootNode = body;
	
	dropped(new Node("div"), body, 3);
	dropped(new Node("div"), body, 3);
	
	drawer.draw(body, $("#dropSection"));*/
 });

/*function dropped(node, eventNode, direction){
	if(direction == 3){
		eventNode.appendChild(node);
		return;
	}

	var parentNode = findNode(this.document.rootNode, eventNode.parentId);
	var location;
	
	for(location = 0; parentNode.children[location]; location++){
		if(parentNode.children[location].tagId == eventNode.tagId){
			break;
		}
	}
	
	if(direction == 2){
		location++;
	}
	
	parentNode.appendChild(node, location);
	return;
}*/

function findNode(node, tagId){
	if(node.tagId == tagId){
		this.foundNode = node;
	}
	for(var i in node.children){
		findNode(node.children[i], tagId)
	}
	return foundNode;
}

function srcChanged(){
	$("#src_form").ajaxSubmit({
		success: function(response) {
			var responseJson = JSON.parse(response);
			console.log(responseJson);
			console.log(responseJson.data);
			nodeManager.selectedNode.attributes["src"] =  responseJson.data;
			nodeManager.codeChange(nodeManager.rootNode);
		}
	});
}

//attr칸 추가시키는 거 , input 값은 name이나 id로 접근하시면 될 듯합니다.
function addAttrLine(attr, value){
	
	if(!(nodeManager.selectedNode)){
		alert("선택된 태그가 없습니다. 태그를 선택해주세요.");
		return;
	}
	
	
	if(jQuery.isEmptyObject(nodeManager.selectedNode.attributes)){
		$("#attrText").empty();
		$("#attrTitle").empty();
	}
	
	attrId++;
	var inputattr = "";
    /*	var inputvalue = "<li><input type='text' id='attrValue"+attrId+"' name='attrValue'/><input type='button' id='attrButton"+attrId+"' value='확인'/><input type='button'id='attrDelete"+attrId+"' value='삭제'/></li>"*/


	if(attr == "src"|| attr == "text"){
		inputattr = $("<li><input type='text' id='attr"+attrId+"' name='attr' readonly='readonly'/></li>");
	}else{
		inputattr = $("<li><input type='text' id='attr"+attrId+"' name='attr'/></li>");
	}

	if(attr == "src"){
		inputattr.append("<form id='src_form' method='post' action='ImageUploadServlet' enctype='multipart/form-data'><li><input type='file' id='attrValue"+attrId+"' name='file' onchange='srcChanged()'/></li></form>");
	}else{
		inputattr.append("<input type='text' id='attrValue"+attrId+"' name='attrValue'/>");
	    var inputbuttonOK = "<input type='image' src='img/check.png' id='attrButton"+attrId+"'/>";
	    var inputbuttonDelete = "<input type='image' src='img/cancel.png' id='attrDelete"+attrId+"'/>";
	    
	    inputattr.append(inputbuttonOK);

	    if(attr != "text"){
	        inputattr.append(inputbuttonDelete);
	    }
	}
/*	else{
		inputvalue = $("<li></li>");
		var inputbuttonOK = "<input type='button' id='attrButton"+attrId+"' value='확인'/>";
		var inputbuttonDelete = "<input type='button'id='attrDelete"+attrId+"' value='삭제'/>";
		inputvalue.append(inputbuttonOK);
		if(attr != "text"){
			inputvalue.append(inputbuttonDelete);
		}
	}	*/

	$("#attrTitle").append(inputattr);
/*	$("#attrText").append(inputvalue);*/

	if(attr){
		$("#attr"+attrId).val(attr);
	}
	
	if(value && attr != "src"){
		$("#attrValue"+attrId).val(value);
	}
	
	attrEvent(attrId);
}

function attrEvent(attrId){
	
	$("#attrButton"+attrId).click(
		function(event){
			if(nodeManager.selectedNode.tagName == "text"){
				nodeManager.selectedNode.text = $("#attrValue"+attrId).val();
			}else{
				nodeManager.selectedNode.attributes[$("#attr"+attrId).val()] = $("#attrValue"+attrId).val();
			}
			nodeManager.codeChange(nodeManager.rootNode);
		}
	);
	
	$("#attrDelete"+attrId).click(
		function(event){
			var attr = $("#attr"+attrId);
			var value = $("#attrValue"+attrId);
			var ok = $("#attrButton"+attrId);
			var del = $("#attrDelete"+attrId);
			
			delete nodeManager.selectedNode.attributes[attr.val()];
			
			attr.remove();
			value.remove();
			ok.remove();
			del.remove();
			
			if(jQuery.isEmptyObject(nodeManager.selectedNode.attributes)){
				$("#attrText").text("속성이 없습니다.");
			}
		}
	);
}

// css칸 추가시키는 거 , input 값은 name이나 id로 접근하시면 될 듯합니다.
function addCssLine(css, value){
	if(!(nodeManager.selectedNode)){
		alert("선택된 태그가 없습니다. 태그를 선택해주세요.");
		return;
	}
	
	if(jQuery.isEmptyObject(nodeManager.selectedNode.styles)){
		$("#cssText").empty();
		$("#cssTitle").empty();
	}
	
	cssId++;
	var inputCss = "<li><input type='text' id='css"+cssId+"' name='css' />" +

        "<input type='text' id='cssValue"+cssId+"' name='cssValue'>" +
        "<input type='image' src='img/check.png' id='cssButton"+cssId+"'/><input type='image' src='img/cancel.png' id='cssDelete"+cssId+"'/></li>";
/*	var inputvalue = "<li><input type='text' id='cssValue"+cssId+"' name='cssValue'/><input type='button' id='cssButton"+cssId+"' value='확인'/><input type='button'id='cssDelete"+cssId+"' value='삭제'/></li>"*/
	
	
	$("#cssTitle").append(inputCss);
/*	$("#cssText").append(inputvalue);*/
	if(css){
		$("#css"+cssId).val(css);
		console.log($("#css"+cssId));
	}
	
	if(value){
		$("#cssValue"+cssId).val(value);
	}
	
	cssEvent(cssId);

}

function cssEvent(cssId){
	
	$("#cssButton"+cssId).click(
		function(event){
			nodeManager.selectedNode.styles[$("#css"+cssId).val()] = $("#cssValue"+cssId).val();
			nodeManager.codeChange(nodeManager.rootNode);
		}
	);
	
	$("#cssDelete"+cssId).click(
		function(event){
			var attr = $("#css"+cssId);
			var value = $("#cssValue"+cssId);
			var ok = $("#cssButton"+cssId);
			var del = $("#cssDelete"+cssId);
			
			delete nodeManager.selectedNode.styles[attr.val()];
			
			attr.remove();
			value.remove();
			ok.remove();
			del.remove();
			
			if(jQuery.isEmptyObject(nodeManager.selectedNode.styles)){
				$("#cssText").text("속성이 없습니다.");
			}
			nodeManager.codeChange(nodeManager.rootNode);
		}
	);
}

var codeManager = {
		
		nodeToCode: function(node) {
			
			if(node.tagName == "text"){
				return "text"+(node.text!=undefined?node.text:"");
			}else{
				var code = $("<"+node.tagName+">");
				for(var i in node.attributes){
					code.prop(i, node.attributes[i]);
				}
				for(var i in node.styles){
					code.css(i, node.styles[i]);
				}
				for (var i in node.children)
				{	
					console.log(this.nodeToCode(node.children[i]).substring(0,4));
					if(this.nodeToCode(node.children[i]).substr(0,4) == "text"){
						var str = this.nodeToCode(node.children[i]).substr(4);
						code.append(str);
					}else{
						code.append($(this.nodeToCode(node.children[i])));
					}
				}
				return code[0].outerHTML;
			}
			/*var openTag = "<"+node.tagName+">";
			
			if(node.tagName == "text"){
				openTag = node.text;
			}
			var closeTag = "</"+node.tagName+">";	
			
			var result = openTag;
			
			for (var i in node.children)
			{	
				result += this.nodeToCode(node.children[i]);
			}
			if(node.tagName != "text"){
				result += closeTag;
			}
		
			return result;*/
		},
		
		codeToNode: function(code, node) {

			/*//공백 제거 i대소문자 무시 전역검색
			var nonspace = code.replace(/\s/gi, ""); 
			console.log(nonspace);
			var nonspacearray = [];
			nonspacearray = nonspace.split(/(?=<[\w]+>|<\/[\w]+>)|(?<=<[\w]+>|<\/[\w]+>)/);//이거 오류아님, 이클립스가 인식을 못하는거
			console.log(nonspacearray);
			//정리된 배열.
			
			//텍스트 부분을 텍스트로 변환
			for(var i = 0; i<nonspacearray.length; i++){
				if(nonspacearray[i].match(/<[\w]+>/)){
					var tagName = nonspacearray[i].substring(1, nonspacearray[i].length-1);
					console.log(tagName);
				}else if(nonspacearray[i].match(/<\/[\w]+>/)){
					console.log("out");
				}else{
					console.log("text");
				}
			}*/
			
			var newNode;
			var tag = $(code);
			tag.each(function(index) {
				var child = tag.get(index);
				switch (child.nodeType)
				{
					case 1:
						newNode = new Node(child.nodeName.toLowerCase());
						
						var attrs = child.attributes;
						for (var i = 0 ; i < attrs.length ; i++)
						{
							if (attrs[i].name != "style")
							{
								newNode.addAttribute(attrs[i].name, attrs[i].nodeValue);
							}
						}
						var style = child.style;
						for (var i = 0 ; i < style.length ; i++)
						{
							newNode.addStyle(style[i], style[style[i]]);
						}
						
						node.appendChild(newNode);
						codeManager.codeToNode(child.innerHTML, newNode);
						break;
						
					case 3:
						var text = child.data;
						newNode = new Node("text", text);
						node.appendChild(newNode);
						
						break;
						
					default:
						break;
				}
			});
			
			return node;
			
		},
		
		tagCheck: function(tag) 
		{
			 var parents = 0;
				  for(var i=0; i<tag.length; i++)
				  {
					  if(tag[i].charAt(0)!='/')
					  {
						parents = parents + 1;
													 
						  console.log(tag[i]+"node 열림");
						  if(i>0){
						  console.log(tag[i]+"의 부모 "+tag[parents-2]);
						  }
					  }
					  
					  else 
					  {
						  parents = parents + -1;
						 
						  console.log(tag[i]+"node 닫힘");
						  console.log(parents);
						  if(i>0){
							  console.log(tag[i]+"의 부모 "+tag[parents-2]);
						  }
					  }
					  
					 
				  }	 
		}
				  
}

var nodeManager = {
	
	setData: function(data)
	{
		this.rootNode = this.dataToNodeTree(data);
    	
		this.nodeChange(this.rootNode);
		this.codeChange(this.rootNode);
	},
	
	onDrop: function(containerId, dropId, relation, tagName) {
		
		if (!this.checkValid(containerId, dropId))
		{
			alert("자식 노드로 옮길 수 없습니다.");
			drawer.hideDropArea();
			return;
		}
		
		var container = this.findNode(this.rootNode, containerId);
		var draggable = this.findNode(this.rootNode, dropId);
		
		if (!draggable)
		{
			draggable = new Node(tagName);
		}
		
		if(tagName == "img"){
			draggable.attributes["src"] = "";
		}
		
		console.log(draggable);
		
		if (relation == "child")
		{
			this.adopt(container, draggable);
		}
		else{
			var fatherOfContainer = this.findNode(this.rootNode, container.parentId);
			if(!fatherOfContainer){
				drawer.hideDropArea();
				return;
			}
			var i;
			
			for(i in fatherOfContainer.children){
				if(fatherOfContainer.children[i].tagId == container.tagId){
					break;
				}
			}
			
			if(relation == "younger"){
				i++;
			}
			
			this.adopt(fatherOfContainer, draggable, i);
		}
		this.nodeChange(this.rootNode);
		this.codeChange(this.rootNode);
	},
	
	adopt: function(newParent, child, location) {
		var oldParent = this.findNode(this.rootNode, child.parentId);
		if (oldParent)
		{
			oldParent.removeChild(child.tagId);
		}
		newParent.appendChild(child, location);
	},
	
	removeChild: function(parent, child)
	{
		for (var i in parent.children)
		{
			if (parent.children[i].tagId == child.tagId)
			{
				parent.children.splice(i, 1);
			}
		}
	},
	
	findNode: function(node, tagId)
	{
		if (node.tagId == tagId) 
		{
			return node;
		}
		
		var found;
		for (var i in node.children) 
		{
			found = this.findNode(node.children[i], tagId);
			if (found != null)
			{
				return found; 
			}
		}
		
		return null;
	},
	
	getChildDepth: function(node, depth)
	{
		var maxDepth = depth + 1;
		var childDepth = 0;
		
		for (var i in node.children) 
		{
			var childDepth = this.getChildDepth(node.children[i], depth + 1);
			if (childDepth > maxDepth)
			{
				maxDepth = childDepth;
			}
		}
		
		return maxDepth;
	},
	
	checkValid: function(containerId, dropId)
	{
		var draggable = this.findNode(this.rootNode, dropId);
		
		if (draggable)
		{
			return (this.findNode(draggable, containerId) == null);
		}
		else
		{
			return true;
		}
	},

	dataToNodeTree: function(data, parentNode) {
		
		var node = new Node(data.tagName);
		node.text = data.text;
		node.attributes = data.attributes;
		node.styles = data.styles;
		node.classes = data.classes;
		
		if(parentNode){
			parentNode.appendChild(node);
		}
		
		for (var i in data.children)
		{
			this.dataToNodeTree(data.children[i], node);
		}
		
		return node;
	},
	
	nodeTreeToData: function(node) {
		var data = {};
		data["tagName"] = node.tagName;
		data["attributes"] = (node.attributes) ? node.attributes : {};
		data["styles"] = (node.styles) ? node.styles : {};
		data["children"] = [];
		data["text"] = (node.text) ? node.text : "";
		for(var i in node.children) {
			data["children"].push(nodeManager.nodeTreeToData(node.children[i]));
		}
		return data;
	},
	
	nodeChange: function(rootNode) {
		this.rootNode = rootNode;
		drawer.draw(rootNode, $("#dropSection"));
	},
	
	codeChange: function(rootNode) {
		var code = codeManager.nodeToCode(rootNode);
		ace_editors.userEditor.getSession().setValue(cleanHTML(code), -1);
	},
	
	setEventHandlers: function()
	{
		// Drag이 끝난 이후에 원래 자리로 되돌아가게 함
		$(".name_Label").draggable({
			start: function(event)
			{
				$(event.target).css("opacity", 0.25);
			},
			
			stop: function(event) {
				$(event.target).css("opacity", 1);
				
				$(event.target).css("left", 0);
				$(event.target).css("top", 0);
			}
		});
		
		// 태그 위에 drop이 되었을 경우를 처리함
		// event.target은 drop 대상 태그
		// ui.draggable는 drag된 태그
		$(".name_Label").droppable({
			tolerance: "pointer",
			over: function(event, ui) {
				var tag = $(event.target).parents(".container_Div")[0];
				if (tag)
				{
					drawer.showDropArea(tag.id);
				}
			},
			
			out: function(event, ui) {
				drawer.hideDropArea();
			},
			drop :function(event,ui)
			{
				ui.helper.hide();
			}
		});
		
		$(".drop_area_elder").droppable({
			tolerance: "pointer",
			drop: function(event, ui) {
				var containerTag = $(event.target).parents(".container_Div")[0];
				var draggableTag = $(ui.draggable).parents(".container_Div")[0];

				if (draggableTag)
				{
					nodeManager.onDrop(containerTag.id, draggableTag.id, "elder");
				}
				else
				{
					nodeManager.onDrop(containerTag.id, null, "elder", $(ui.draggable).html());
				}
			},
		});
		
		$(".drop_area_younger").droppable({
			tolerance: "pointer",
			drop: function(event, ui) {
				var containerTag = $(event.target).parents(".container_Div")[0];
				var draggableTag = $(ui.draggable).parents(".container_Div")[0];

				if (draggableTag)
				{
					nodeManager.onDrop(containerTag.id, draggableTag.id, "younger");
				}
				else
				{
					nodeManager.onDrop(containerTag.id, null, "younger", $(ui.draggable).html());
				}
			},
			
			/*over: function(event, ui) {
				$(event.target).css("opacity", 0.7);
			},
			
			out: function(event, ui) {
				$(event.target).css("opacity", 0.3);
			},*/
		});
		
		$(".drop_area_child").droppable({
			tolerance: "pointer",
			drop: function(event, ui) {
				var containerTag = $(event.target).parents(".container_Div")[0];
				var draggableTag = $(ui.draggable).parents(".container_Div")[0];

				if (draggableTag)
				{
					nodeManager.onDrop(containerTag.id, draggableTag.id, "child");
				}
				else
				{
					nodeManager.onDrop(containerTag.id, null, "child", $(ui.draggable).html());
				}
			},
			
			/*over: function(event, ui) {
				$(event.target).css("opacity", 0.7);
			},
			
			out: function(event, ui) {
				$(event.target).css("opacity", 0.3);
			},*/
		});

		$("#middleSection").click(
			function(event){
				if(!($(event.target).hasClass("name_Label"))){
					if($(event.target).parents(".name_Label")[0]){
						
					}else{
						initNodeSelect();
					}
				}
			}
		);
		
		$(".name_Label").click(
			function(event){
				var target;
				if(event.target == this){
					target = $(event.target);
				}else{
					target = $(event.target).parent();
				}
				if(!(target.hasClass("selected"))){
					initNodeSelect();
					console.log(target);
					var tag = target.parents(".container_Div")[0];
					target.addClass("selected");
					var selected = nodeManager.findNode(nodeManager.rootNode, tag.id);
					nodeManager.selectedNode = selected;

					if(selected.tagName == "text"){
						addAttrLine("text", selected.text);
					}else{
						if(jQuery.isEmptyObject(selected.attributes)){
							$("#attrText").text("속성이 없습니다.");
						}else{
							for(var i in selected.attributes){
								addAttrLine(i, selected.attributes[i]);
							}
						}
						
						if(jQuery.isEmptyObject(nodeManager.selectedNode.styles)){
							$("#cssText").text("속성이 없습니다.");
						}else{
							for(var i in selected.styles){
								addCssLine(i, selected.styles[i]);
							}
						}
						$(".addBtn").show();
					}
				}else{
					initNodeSelect();
				}
			}
		);
		
		$(".tags").draggable({
			start: function(event)
			{
				$(event.target).css("opacity", 0.25);
			},
			
			stop: function(event) {
				$(event.target).css("opacity", 1);
				$(event.target).css("left", 0);
				$(event.target).css("top", 0);
			}
		});
	},
};


var drawer = {

	draw: function(rootNode, container) {
		
		initNodeSelect();
		
		this.container = container;
		
		$("body").append($(".drop_area"));
		$(".drop_area").hide();
		this.container.empty();
		
		this.drawTag(rootNode, container);
		
		nodeManager.setEventHandlers();
		
		var depth = nodeManager.getChildDepth(nodeManager.rootNode, 0);
		container.css("width", depth * 235 + 50);
	},
	
	drawTag: function(tag, container)
	{
		// 자신을 그린다.
		var containerDiv = $("<div>").addClass("container_Div");
		var nameDiv = $("<div>").addClass("name_Div");
		var childrenDiv = $("<div>").addClass("children_Div");
		var nameLabel = $("<div>").addClass("name_Label");
		var ul = $("<ul>").addClass("tag_list");
		var li;
		
		containerDiv.prop("id", tag.tagId);
		
		for (var i in tag.children)
		{
			li = $("<li>").addClass("tag_item");
			this.drawTag(tag.children[i], li);
			ul.append(li);
		}

		nameLabel.append("<span>"+tag.tagName+"</span>");
		nameDiv.append(nameLabel);
		
		childrenDiv.append(ul);
		
		containerDiv.append(nameDiv);
		containerDiv.append(childrenDiv);
		
		container.append(containerDiv);
	},
	
	showDropArea: function(tagId)
	{
		var labelTag = $("#" + tagId).find(".name_Label")[0];
		
		$(labelTag).append($(".drop_area"));
		
		$(".drop_area").css({
			width: '100%',
			height: '100%',
			position: 'absolute',
			left: '0',
			top: '0'
		});
		
		$(".drop_area").show();
	},
	
	hideDropArea: function()
	{
		$(".drop_area").hide();
	},

	drawTag1: function(tag, container)
	{
		// 자신을 그린다.
		var containerDiv = $("<div>").addClass("container_Div");
		var nameDiv = $("<div>").addClass("name_Div");
		var childrenDiv = $("<div>").addClass("children_Div");
		var nameLabel = $("<div>").addClass("name_Label");
		var ul = $("<ul>").addClass("tag_list");
		var li;
		
		nameLabel.draggable();
		
		var attrDiv = $("<div>").addClass('attr_Div'); 
		attrDiv.css({
			"opacity" : "0.5",
			"z-index" : "100",
			"position" : "absolute"
		});
		attrDiv.prop("id", tag.tagId);
		var attrDiv1 = $("<div>").addClass('attr_Div1'); 
		attrDiv1.droppable({
			drop: function(event, ui){
				console.log(event);
				console.log(ui);
			}
		});
		var attrDiv2 = $("<div>").addClass('attr_Div2'); 
		attrDiv2.droppable({
			drop: function(event, ui){
				console.log(event);
				console.log(ui);
				
			}
		});
		var attrDiv3 = $("<div>").addClass('attr_Div3'); 
		attrDiv3.droppable({
			drop: function(event, ui){
				console.log(event);
				console.log(ui);
				
			}
		});
		
		for (var i in tag.children)
		{
			li = $("<li>").addClass("tag_item");
			this.drawTag(tag.children[i], li);
			ul.append(li);
		}
		
		attrDiv.append(attrDiv1);	
		attrDiv.append(attrDiv2);
		attrDiv.append(attrDiv3);

		nameLabel.append(attrDiv);
		nameLabel.append("<span>"+tag.tagName+"</span>");
		nameDiv.append(nameLabel);
		
		childrenDiv.append(ul);
		
		containerDiv.append(nameDiv);
		containerDiv.append(childrenDiv);
		
		container.append(containerDiv);
		
		nameLabel.mouseenter(function() 
		{ 
			nameLabel.empty(); 
			nameLabel.append(attrDiv);
			nameLabel.append("<span>"+tag.tagName+"</span>");
		});
		
		nameLabel.mouseleave(function() 
		{ 
			nameLabel.empty();
			nameLabel.append('<span>'+tag.tagName+'</span>');
		});
	},
};
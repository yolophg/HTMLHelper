<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	long now = System.currentTimeMillis();
	response.setHeader("Cache-Control", "no-store");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);
	if (request.getProtocol().equals("HTTP/1.1")) {
		response.setHeader("Cache-Control", "no-cache");
	}
%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous" type="text/javascript"></script>

<script>

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


	var code = "<body style='font-size: 12px;'><h1 id='h1_id' abc='zzz' class='h1_class' style='font-size:20px; color: #CCC; '>코드변환</h1> <div id='layer1'><span>1231</span></div> <div class='abc'>4141</div></body>";
	//var code = "<body><div>hello</div></body>";
	
	
	$(document).ready(function() {
		
		var node = new Node("body");
		
		codeToNode(code, node);
		
		console.log(node);
	});
	
	
	function codeToNode(code, node)
	{
		var newNode;
		var dom = $(code);
		console.log(dom);
		
		
		
	
			dom.each(function(index) {
				var child = dom.get(index);
				
				switch (child.nodeType)
				{
				case 1:
					console.log(child);
					//console.log(child.attributes);
					//console.log(child.style);
					
					newNode = new Node(child.nodeName);
					node.appendChild(newNode);
					
					parseAttributes(newNode, child);
					parseStyle(newNode, child);
					
					codeToNode(child.innerHTML, newNode);
					break;
					
				case 3:
					var text = getTextData(child);
					newNode = new Node("text", text);
					node.appendChild(newNode);
					
					break;
					
				default:
					break;
				}
			});
		
	}

	function getTextData(node)
	{
		return node.nodeValue;
	}
	
	function parseAttributes(node, item)
	{
		var attrs = item.attributes;
		for (var i = 0 ; i < attrs.length ; i++)
		{
			if (attrs[i].name != "style")
			{
				node.addAttribute(attrs[i].name, attrs[i].nodeValue);
			}
		}
	}
	
	function parseStyle(node, item)
	{
		var style = item.style;
		for (var i = 0 ; i < style.length ; i++)
		{
			node.addStyle(style[i], style[style[i]]);
		}
	}

	
</script>

<title>Insert title here</title>
</head>
<body>
	<h1>코드변환</h1>
	<div id="layer1">1231</div>
	<div class="abc">4141</div>
</body>
</html>
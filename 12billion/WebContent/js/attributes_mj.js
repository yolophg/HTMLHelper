	var global_attributes = [
		"contenteditable","contextmenu", "dir", "draggable",
		"irrelevant", "lang", "ref", "registrationmark",
		"tabindex", "template", "title"];
	
	var divx;
	var divz; 
	
	var tags = {
		DIV : global_attributes,
		A : ["href", "hreflang", "media", "ping", "rel", "target", "type"],
		INPUT : [
			"accept", "alt", "auto-complete", "autofocus",
			"checked", "disabled", "form", "formaction",
			"formenctype", "formme-thod", "formnovalidate", "formtarget",
			"height", "list", "max", "maxlength",
			"min", "multiple", "name", "pattern",
			"placeholder", "readonly", "required", "size",
			"src", "step", "type", "value", "width"],
		IMG : ["src", "height", "width"],
		BR: global_attributes,
		EM: global_attributes,
		I: global_attributes,
		OL: ["start", "reversed"],
		OPTION: ["disabled", "label", "selected", "value"],
		SPAN: global_attributes,
		TR: global_attributes,
		TEXTAREA: [
			"autofocus", "cols", "disabled", "form",,
			"name", "readonly", "required", "rows",
			"maxlength", "placeholder", "wrap"],
		HR : global_attributes,
		LI : ["value"],
		UL : global_attributes,
		P : global_attributes,
		TABLE : global_attributes,
		TD : ["colspan", "rowspan", "headers"],
		U : []
	};
	
	function openAttributesInputPopup(tagId)
	{
		var tag = tree[tagId];
		console.log(tag);
		if (tag)
		{
			makeAttrubuteInputArea(tag);
			initStyleArea(tag);
			showAttrsPopup(tag.id);
		}
	}
	
	
	function makeAttrubuteInputArea(tag)
	{
		var container = $("#attributes_input_popup .input_area");
		container.empty();
		
		var items = tags[tag.tagName];
		
		if (items)
		{
			for (var i in items)
			{
				addInputItem(items[i], tag);
			}
		}
		
		$("#attributes_input_popup .confirm_button").unbind("click");
		
		$("#attributes_input_popup .confirm_button").bind("click", function() {
			saveAttributes(tag);
			refreshHTMLArea();
			hidePopup();
			
		});

	}
	
	// 스타일 구역 초기화
	function initStyleArea(tag)
	{
		$("#style-attr").val("");
		$("#style-attr-value").val("");
		$("#styleOptionList").empty();
		if (tag.style)
		{
			var style = tag.style;
			for (var attr in style)
			{
				var styleName = attr;
				var styleValue = style[attr];
				var option = $("<option/>").val(styleName + ":" + styleValue).html(styleName + ": " + styleValue);
				$("#styleOptionList").append(option);
			}
		}
	}
	
	function addInputItem(item, tag)
	{
		var container = $("#attributes_input_popup .input_area");
		
		var div = $("<div>");
		
		var label = $("<label>");
		label.html(item + " : ");
		div.append(label);
		
		var input = $("<input>");
		(item == "src") && input.prop("type", "file");

		var treeAttrs = tag.attrs;
		if (treeAttrs)
		{
			if (input.prop("type") != "file")
			{
				input.val(treeAttrs[item]);
			}
		}
		input.prop("name", item);
		div.append(input);
		
		container.append(div);
	}
	
	// 속성와 스타일을 tree에 저장
	function saveAttributes(tag)
	{
		var attrContainer = $("#attributes_input_popup .input_area");
		var attrInputs = attrContainer.find("input");
		
		var styleContainer = $("#styleOptionList");
		var styleOptions = styleContainer.children();
		
		if (getRealAttrsLength(attrInputs) != 0)
		{
			var attrs = {};
			attrInputs.each(function(index, item) {
				if (this.value != "")
				{
					attrs[this.name] = this.value;
				}
			});
			tag.attrs = attrs;
		}
		else
		{
			if(tag.attrs)
			{
				delete tag.attrs;
			}
		}
		
		if (styleOptions.length != 0)
		{
			var style = {};
			styleOptions.each(function(index, item) {
				var splitVal = this.value.split(":");
				var styleAttr = splitVal[0];
				var styleAttrValue = splitVal[1];
				if (styleAttrValue != "")
				{
					style[styleAttr] = styleAttrValue;
				}
			});
			tag.style = style;
		}
		else
		{
			if(tag.style)
			{
				delete tag.style;
			}
		}
		console.log(tree);
	}
	
	function showAttrsPopup(tag)
	{	var tags = "#";
		tags = tags + tag;
		
		console.log(tags);
		x = event.pageX;
		y = event.pageY;
	
		//속성값 일단 고정.
		$("#attributes_input_popup").css({
			left: 913,
			top: 96
			
		});
		$("#attributes_input_popup").show();
		backcolorch(tags);

	}
	function backcolorch(tag) {
		$(tag).css("background-color","#86E57F");
	}
	function hidePopup()
	{
//		var tagid = "#";
//		tagid = tagid+tag;
//		console.log(tagid);
		$("#attributes_input_popup").hide();
		rebackcolorch();
	}
	function rebackcolorch() {
		var box = ".box";
		$(box).css("background-color","rgb(211, 249, 188);");
	}
	
	// 옵션 스타일 등록
	function addOptionStyle()
	{
		var styleOptionList = $("#styleOptionList");
		
		var styleNameInput = $('input[name=styleName]');
		var styleValueInput = $('input[name=styleValue]');
		
		var styleName = styleNameInput.val();
		var styleValue = styleValueInput.val();
		
		
		styleNameInput.val("");
		styleValueInput.val("");
		
		if(styleName == "" || styleValue == "")
		{
			alert("값이 비어있습니다. 모두 입력해주세요.");
			return;
		}
		
		var tempDom = $("<div/>").css(styleName, styleValue);
		var tempHTML = tempDom[0].outerHTML;
		if (!tempHTML.includes(styleName))
		{
			alert("값이 올바르지 않습니다. 다시 입력해 주세요.");
			return;
		}
		
		var options = styleOptionList.children();
		var sameOption = getSameStyleNameOption(styleName, options);
		if (sameOption)
		{
			sameOption.val(styleName + ":" + styleValue).html(styleName + ": " + styleValue);
			return;
		}
		
		// option value에 object가 안들가져서 string으로 함.
		var option = $("<option/>").val(styleName + ":" + styleValue).html(styleName + ": " + styleValue);
		
		styleOptionList.append(option);
	}
	
	// 같은 스타일 속성 이름을 가진 옵션을 찾음
	function getSameStyleNameOption(styleName, options)
	{
		for (var i = 0; i < options.length; i++)
		{
			var option = $(options[i]);
			if (option.val().split(":")[0] == styleName)
			{
				return option;
			}
		}
		return null;
	}
	
	// 스타일 인풋칸에 선택된 옵션의 값을 넣음
	function setStyleInput(sel)
	{
		var value = sel.value;
		var splitVal = value.split(":");
		
		var styleAttr = splitVal[0];
		var styleAttrValue = splitVal[1];
		
		$('input[name=styleName]').val(styleAttr);
		$('input[name=styleValue]').val(styleAttrValue);
	}
	
	// 옵션 스타일 삭제
	function deleteOptionStyle()
	{
		$("#styleOptionList option:selected").remove();
	}
	
	function getRealAttrsLength(attrs)
	{
		var length = 0;
		attrs.each(function(index, item) {
			if (this.value != "")
			{
				length++;
			}
		});
		return length;
	}
	
/**
 * 테마 목록 배열
 */
var themes = [
	'ambiance', 'chaos', 'chrome', 'clouds', 'clouds_midnight',
	'cobalt', 'crimson_editor', 'dawn', 'dracula', 'dreamweaver',
	'eclipse', 'github', 'gob', 'gruvbox', 'idle_fingers', 'iplastic',
	'katzenmilch', 'kr_theme', 'kuroir', 'merbivore', 'merbivore_soft',
	'mono_industrial', 'monokai', 'pastel_on_dark', 'solarized_dark',
	'solarized_light', 'sqlserver', 'terminal', 'textmate', 'tomorrow',
	'tomorrow_night', 'tomorrow_night_blue', 'tomorrow_night_bright',
	'tomorrow_night_eighties', 'twilight', 'vibrant_ink', 'xcode'
];

/**
 * 에디터들 객체
 * exampleEditor: 테마 설정에 있는 샘플 에디터
 * userEditor: 컬랩스에 포함된 유저가 실질적으로 사용하는 에디터
 */
var ace_editors = {};

$(function() {
	var themes_list_dom = $('#configModal #themeList');
	
	// 설정 모달 테마 목록 적재
	for (var index in themes) {
		var theme_name = themes[index];
		var theme_button = $('<li>')
			.addClass('list-group-item list-group-item-action')
            .css({'cursor': 'default', 'user-select': 'none'})
			.html(theme_name);
		if (theme_name == docCookies.getItem('theme')) {
			theme_button.addClass('active');
		}
		themes_list_dom.append(theme_button);
	}
	
	themes_list_dom.children().click(function() {
		themes_list_dom.children().removeClass('active');
		
		var button = $(this);
		button.addClass('active');
    	
    	var theme = button.html();
    	ace_editors.exampleEditor.setTheme('ace/theme/' + theme);
    	ace_editors.userEditor.setTheme('ace/theme/' + theme);
    	docCookies.setItem('theme', theme);
	});
	
	var editors = [];
	
	var editorDom = $("script[class*='brush']").prop({
        style: "display: block",
        type: "text/plain"
    });
	
    
	// ace에디터로 초기화
    editorDom.each(function(index, element) {
    	try {
    		var lang = String($(element).prop("class")).match(/brush\:([ a-zA-Z_]*)\;?/)[1].trim();
    		var editor = ace.edit(element);
    		editor.setOptions({
    			maxLines: Infinity,
    			fontSize: "15pt"
    		});
    		var theme = docCookies.getItem('theme');
    		if (!theme) {
    			theme = 'chrome';
    			docCookies.setItem('theme', theme);
    		}
    		editor.setTheme("ace/theme/" + theme);
    		editor.getSession().setMode("ace/mode/" + lang);
    		editor.setShowInvisibles(false);
    		editor.setShowPrintMargin(false);
    		editor.renderer.updateFull();
    		editor.$blockScrolling = 'Infinity';
    		editors[index] = editor;
    	} catch (ex) { console.info(ex) }
    });
    
    ace_editors.userEditor = editors[0];
    ace_editors.exampleEditor = editors[1];

    ace_editors.exampleEditor.setReadOnly(true);
    ace_editors.userEditor.setReadOnly(true);
    ace_editors.userEditor.getSession().on('change', function() {
        	/*var code = ace_editors.userEditor.getSession().getValue().replace("\n", "");
        	console.log(code);
        	var node = codeManager.codeToNode(code, new Node("body"));
        	nodeManager.nodeChange(node);*/
	});
    
    var exampleCode = "<div class=\"container\"><div><div></div></div><div id=\"example\"></div></div><div class=\"container\"><div><div><div></div></div></div></div><div></div>";
    ace_editors.exampleEditor.getSession().setValue(cleanHTML(exampleCode), -1);
});
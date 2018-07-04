var fileDatas = [];

$(function() {

    $('.alert').hide();
	    
    // Modal 띄워줄 때 css 불러오기
    var attr_dom = $("<div>");
    for (var item in styles) {
        attr_dom.append($("<li>").append($("<a>").text(styles[item])));
    }

    // 쿠키를 읽어서 유저의 쿠키가 남아있는지 확인하여 처리
    hideNavbarButtons();
    if (!docCookies.hasItem('userId')) {
    	$('#userSection').hide();
    	showLoggedOutButton();
    } else {
    	$('#intro').hide();
    	showLoggedInButtons();

        if (docCookies.hasItem('userEmail')) {
            showUserEmail(docCookies.getItem('userEmail'));
        }
    }
    
    // 이 버튼은 무료로 스크롤 해줍니다.
    $("#intro > #introSection input[type='image']").click(function () {
    	
        $('#userSection').show();
   
        setTimeout(function() {
        	  $('#wastebasket_layer').show();
        	}, 400);

      
        $.smoothScroll({
            scrollTarget: '#userSection',
			beforeScroll: () => {
            	$('body').css('overflow-y', 'hidden');
			},
            afterScroll: () => {
            	$('body').css('overflow-y', '');
            	$('#intro').hide();
            	initTrashCan()
            }
        });
        
        return false;
    });
    
    // 이 버튼도 무료로 스크롤 해줍니다.
    $('#navbarLogo').click(function () {
    
    	$('#wastebasket_layer').hide();
        
    	$('#intro').show();
    	 
    	
        location.href = '#userSection';
        $.smoothScroll({
            scrollTarget: '#intro',
			beforeScroll: () => {
            	$('body').css('overflow-y', 'hidden');
			},
            afterScroll: () => {
            	$('body').css('overflow-y', '');
            	$('#userSection').hide();
            	initTrashCan();
            }
        });
       
    });
    
    // 코드 컬랩스가 보여질 때 이벤트
    $('#codeCollapse').on('shown.bs.collapse', function() {
    	ace_editors.userEditor.resize();
    	$('#codeSection .card-link').text('코드 가리기');
    	$.smoothScroll({ scrollTarget: '#codeSection script' });
    });
    
    // 코드 컬랩스가 가져질 때 이벤트
    $('#codeCollapse').on('hidden.bs.collapse', function() {
    	$('#codeSection .card-link').text('코드 보기');
    });

    // 에디터 크기 조정
    $('#editSection').resizable({
        handles: 's' // 편집 구역의 남쪽만 사이즈 조정 가능
    });

    $('.dropdown').on('show.bs.dropdown', function (e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(200);
    });

    $('.dropdown').on('hide.bs.dropdown', function (e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(100);
    });
    
    // 체크박스 클릭 이벤트
    $('.checkbox').click(function () {
        var password_dom = $('#loginPasswordInput')
        var password_attr = password_dom.attr('type');

        $("#loginForm div[class~='checkbox']").toggleClass('show');
        if (password_attr != 'text') {
            password_dom.attr('type', 'text');
        } else {
            password_dom.attr('type', 'password');
        }
    });
    
    // 실행 버튼 클릭시
    $('#runBtn').click(function() {
    	openWebpage();
    });
    
    // 로그아웃 버튼 클릭 이벤트
    $('#logoutBtn').click(function() {
    	if (docCookies.hasItem('fileData')
            && docCookies.getItem('fileData') == JSON.stringify(nodeManager.nodeTreeToData(nodeManager.rootNode))
            || docCookies.hasItem('fileData')
            && docCookies.getItem('fileData') != JSON.stringify(nodeManager.nodeTreeToData(nodeManager.rootNode))
            && confirm('로그아웃 하시면 작업중인 내용이 지워집니다.')
            || !docCookies.hasItem('fileId')
            && confirm('로그아웃 하시면 작업중인 내용이 지워집니다.')) {
    		logout();
		}
    });

    // login폼이 submit됐을 때
    $('#loginForm').submit(function(e) {
        var email = $('#loginEmailInput').val();
        var password = $('#loginPasswordInput').val();

        if (!checkEmailAndPasswordAreNull(email, password)) {
            signIn(email, password);
        } else {
            $("#loginForm > .modal-body p[class='error']")
                .text('모두 입력해주세요.');
        }

        e.preventDefault();
    });

    // register폼이 submit됐을 때
    $('#registerForm').submit(function(e) {
        var email = $('#registerEmailInput').val();
        var password = $('#registerPasswordInput').val();
        var re_password = $('#registerRePasswordInput').val();

        if (!checkEmailAndPasswordAreNull(email, password)) {
            if (password == re_password) {
                signUp(email, password);
            } else {
                $("#registerBtn > .modal-body p[class='error']")
                    .text('입력하신 값과 맞지 않습니다.');
            }
        } else {
            $("#registerBtn > .modal-body p[class='error']")
                .text('모두 입력해주세요.');
        }

        e.preventDefault();
    });

    // 네비게이션바의 저장 버튼 클릭 시
    $('#saveBtn').click(function() {
    	var userId = docCookies.getItem('userId');
    	var fileId = docCookies.getItem('fileId');
    	var data = nodeManager.nodeTreeToData(nodeManager.rootNode);
    	if ( fileId ) { // 쿠키에 저장된 파일아이디가 있으면 바로 세이브
    		changeLoadingSaveButton();
    		updateFile(fileId, data);
    	} else {
    		$('#saveModal #saveModalLabel').text('저장');
    		$('#saveModal').modal('show');
    	}
    });
    
    // 모달의 저장 버튼을 눌렀을 때 값 전달
    $('#saveModalSaveButton').click(function() {
    	var userId = docCookies.getItem('userId');
    	var fileName = $('#fileName').val();
    	var data = nodeManager.nodeTreeToData(nodeManager.rootNode);
    	
    	saveOrOverwriteFile(userId, fileName, data);
    });

    // 모달의 다른 이름으로 저장 버튼을 눌렀을 때
    $('#saveAsBtn').click(function() {
    	var modal = $('#saveModal');

    	modal.find('#saveModalLabel').text('다른 이름으로 저장');
    	modal.modal('show');
	});
    
    // html 목록 버튼을 눌렀을 때
    $('#htmlListButton').click(function() {
    	loadFileListModal();
    	$('#fileListModal').modal('show');
    });

    // 파일 목록 모달의 이전 버튼을 눌렀을 때
    $('#fileListModal #prevBtn').click(function() {
    	var pagination = $('#fileListModal .pagination');

    	if (pagination.children().hasClass('active')
			&& pagination.find("li[class~='active']").index() > 1) {
            pagination.find("li[class~='active']").prev().trigger('click');
		}
	});

    // 파일 목록 모달의 다음 버튼을 눌렀을 때
	$('#fileListModal #nextBtn').click(function() {
        var pagination = $('#fileListModal .pagination');

        if (pagination.children().hasClass('active')
            && pagination.find("li[class~='active']").index() < pagination.find('li').length - 2) {
            pagination.find("li[class~='active']").next().trigger('click');
        }
	});

	// 파일 목록 모달의 불러오기 버튼을 눌렀을 때
	$('#loadFileButton').click(function() {
		if (docCookies.hasItem('fileId')
            && docCookies.getItem('fileData') == JSON.stringify(nodeManager.nodeTreeToData(nodeManager.rootNode))
            || docCookies.hasItem('fileId')
            && docCookies.getItem('fileData') != JSON.stringify(nodeManager.nodeTreeToData(nodeManager.rootNode))
            && confirm('작업중인 내용을 지우고 새로 불러올까요?')
            || !docCookies.hasItem('fildId')
            && confirm('작업중인 내용을 지우고 새로불러올까요?')) {

            var fileList = $('#fileList');

            if (fileList.children().hasClass('active')) {
                var fileName = fileList.find("li[class~='active'] span").text();
                var fileId = getFileIdByName(fileName);
                var fileData = getFileDataById(fileId);

                if (fileId != -1) {
                    docCookies.setItem('fileId', fileId);
                    docCookies.setItem('fileName', fileName);
                    docCookies.setItem('fileData', fileData);

                    nodeManager.setData(JSON.parse(fileData));

                    $('#fileListModal').modal('hide');
                }
            } else {
                $("#fileListModal p[class='error']").text('불러오실 파일을 선택해주세요.');
            }
        }
	});

	$('#importCodeButton').click(function() {
	    var modal = $('#importPageModal');

	    var url = modal.find('.modal-body input').val();
	    getUrlPageBodyCode(url);
    });

	function getUrlPageBodyCode(url) {
	    var jqXHR = $.post(url, function(data) {
	       console.log(data);
        });
    }

    // 설정 모달이 열렸을 때
    $('#configModal').on('shown.bs.modal', function() {
    	$(this).find('#themes').children().each(function(index, element) {
    		if($(element).text() == docCookies.getItem('theme')) {
    			$(element).addClass('active');
    		}
    	});
    });

    // 로그인 모달이 닫혔을 때
    $('#loginModal').on('hidden.bs.modal', () => { initLoginModal() });
    // 회원가입 모달이 닫혔을 때
    $('#registerModal').on('hidden.bs.modal', () => { initRegisterModal() });
    // 설정 모달이 닫혔을 때
    $('#configModal').on('hidden.bs.modal', () => { initConfigModal() });
    // 저장 모달이 닫혔을 때
    $('#saveModal').on('hidden.bs.modal', () => { initSaveModal() });
    // 파일 목록 모달이 닫혔을 때
	$('#fileListModal').on('hidden.bs.modal', () => { initFileListModal() });

    $("#wastebasket_layer").droppable({
		tolerance: "pointer",
		drop: function(event, ui) {
			var draggable = $(ui.draggable).parents(".container_Div")[0];
			console.log(draggable);
			if (draggable)
			{
				var draggableTagId = $(ui.draggable).parents(".container_Div")[0].id;
				var node = nodeManager.findNode(nodeManager.rootNode, draggableTagId);
				
				if (!node.parentId)
				{
					alert("Body 태그는 삭제할 수 없습니다.");
					return;
				}
				
				if (confirm("하위 태그까지 몽땅 삭제됩니다. 정말 삭제할까요?"))
				{
					var parent = nodeManager.findNode(nodeManager.rootNode, node.parentId);
					
					nodeManager.removeChild(parent, node);
					nodeManager.nodeChange(nodeManager.rootNode);
					nodeManager.codeChange(nodeManager.rootNode);
				}
			}
		},
	});
    
    for (var index in tags) {
        var tag = $('<li>').text(tags[index]);
        $('#tagSection').find('ul').append(tag);
    }
    
    // 태그들 설정
    $('#tagSection li').draggable({
    	scroll: false,
    	helper: 'clone',
    	start: function (event,ui) {
    		ui.helper.css('position','fixed');
    		ui.helper.css('z-index',2);
    		ui.helper.css('margin-top', "71px");
    	},
    	drag: function(event, ui) {
    	    ui.position.top -= $(this).parent().parent().scrollTop() + $('body').scrollTop();
    	}
    }).dblclick(function(event) {
    	// w3schools로 태그 설명
    	if($(this).text() == "text"){
    		alert("일반 문자열을 삽입하기 위한 노드입니다. 태그가 아닙니다.");
    	}else{
        	openW3schoolsExplanation($(this).text());
    	}
    });
    
    // 이미지 슬라이더
    $("#slideSection > div:gt(0)").hide();
    setInterval(function () {
        $("#slideSection > div:first")
            .fadeOut(900)   
            .next()
            .fadeIn(900)
            .end()
            .appendTo("#slideSection");
    }, 4000);
    
    // 새 파일 버튼 클릭 이벤트
    $("#newFile").click(function(event) {
    	var fileData = docCookies.getItem('fileData');
		
		if (fileData
            || fileData == nodeManager.nodeTreeToData(nodeManager.rootNode)
            || confirm('작업중인 내용을 지우고 새파일을 생성할까요?')) {
			nodeManager.setData(newTreeData);
			docCookies.removeItem('fileId');
			docCookies.removeItem('fileName');
			docCookies.removeItem('fileData');
		}
    });
});

function initTrashCan() {
	
	var user =$('#userSection').css("display");
	var intro = $('#intro').css("display");
	var wast = $('#wastebasket_layer').css("display");
	
	if(user!=wast){
		setTimeout(function() {
			$('#wastebasket_layer').css('display',user);
        	}, 200);
	}
	
//	console.log("유저"+$('#userSection').css("display"));
//	console.log("인트로"+$('#intro').css("display"));
//	console.log("휴지통"+$('#wastebasket_layer').css("display"));
}

function showUserEmail(email) {
    $('#userEmail').text(email + ' 님');
}

// w3schools 열기
function openW3schoolsExplanation(id) {
	console.log(id);
	if (id == 'h1') {
		id = 'hn';
	}
	window.open("https://www.w3schools.com/tags/tag_" + id + ".asp");
}

// 저장 버튼 로딩 중으로
function changeLoadingSaveButton() {
	$('#saveBtn').prop('disabled', true).addClass('disabled')
	.find('div').text('').addClass('btn-loader');
}

// 저장 버튼 원래로
function changeDefaultSaveButton() {
	$('#saveBtn').prop('disabled', false).removeClass('disabled')
		.text('저장').removeClass('btn-loader');
}

// navbar에 있는 버튼들 숨김
function hideNavbarButtons() {
	$('#userManagement > .navbar-nav > li:gt(1)').hide();
	
	$('#saveBtn').parent().hide();
	$('#saveAsBtn').parent().hide();
	$('#logoutBtn').parent().hide();
	$('#loginBtn').parent().hide();
}

// 로그인 됐을 때 표시해야 할 버튼들 표시
function showLoggedInButtons () {
	$('#userManagement > .navbar-nav > li:gt(1)').show();
	
	$('#saveBtn').parent().show();
	$('#saveAsBtn').parent().show();
	$('#logoutBtn').parent().show();
}

// 로그아웃 됐을 때 표시해야 할 버튼들 표시
function showLoggedOutButton() {
	$('#loginBtn').parent().show();
}

//email과 password중 하나라도 null이거나 빈문자열이면 true반환
function checkEmailAndPasswordAreNull(email, password) {
    return ((email == null || email == '') || (password == null || password == '')) ? true : false;
}
//타이틀이 null이면
function checkTitleIsNull(fileName) {
    return (fileName == null || fileName == '') ? true : false;
}

// 로그인
function signIn(email, password) {
    $.ajax({
        url: 'SignInServlet',
        type: 'POST',
        data: { 'email': email, 'password': password },
        xhrFields: { withCredentials: true },
        crossDomain: true,
        success: (output) => { loginAjaxLoginSuccessful(output, email) },
        error: () => { alert('서버와의 통신에 실패하였습니다.'); }
    });
}

// 로그인 서블릿과 통신 성공
function loginAjaxLoginSuccessful(output, email) {
	var result = output.result;
	
	if (result == 'Success') { // 로그인 완전 성공
        $('#loginModal').modal('hide');
        hideNavbarButtons();
        showLoggedInButtons();
        $('#userEmail').text(email + ' 님');

        autoAlert('로그인에 성공하였습니다.', 1000);

        docCookies.setItem('userEmail', email);
    } else if (result == 'Fail') { // 실패
        $("#loginForm > .modal-body p[class='error']")
            .text('아이디 또는 비밀번호를 다시 확인하세요.');
    }
}

// 회원가입
function signUp(email, password) {
    $.ajax({
        url: 'SignUpServlet',
        type: 'POST',
        data: { 'email': email, 'password': password },
        success: registerAjaxSuccessful,
        error: () => { alert('서버와의 통신에 실패하였습니다.'); }
    });
}

// 회원가입 서블릿과 통신 성공
function registerAjaxSuccessful(output) {
	var result = output.result;
	
	if (result == 'Success') {
        $('#registerModal').modal('hide');
        $('#loginModal').modal('show');

        autoAlert('회원가입에 성공하였습니다.', 1000);
    } else if (result == 'Fail') {
        alert('이미 가입된 회원입니다.');
    }
}

// 파일 저장
function saveFile(userId, title, data) {
    $.ajax({
        url: 'FileCreateServlet',
        type: 'POST',
        data: { 'userId': userId, 'title': title , 'code': JSON.stringify(data) },
        async: false,
        success: (output) => { fileCreateAjaxSuccessful(output, title, data) },
        error: () => { alert('서버와의 통신에 실패하였습니다.') }
    });
    
    changeDefaultSaveButton();
}

function fileCreateAjaxSuccessful(output, title, data) {
	var result = output.result;
	
	if (result == 'Success') {
		docCookies.setItem('fileId', output.data);
		docCookies.setItem('fileName', title);
		docCookies.setItem('fileData', JSON.stringify(data));
	} else if (result == 'Fail') {
		alert('DB에 넣는 도중에 오류가 발생하였습니다.');
	}
}

//파일 업데이트 함수
function updateFile(fileId, data) {
	$.ajax({
        url: 'FileUpdateServlet',
        type: 'POST',
        data: { 'fileId': fileId, 'code': JSON.stringify(data) },
        async: false,
        success: (output) => { updateFileAjaxSuccessful(output, fileId, data) },
        error: () => { alert('서버와의 연결이 끊겼습니다.') }
    });
	
	changeDefaultSaveButton();
}

function updateFileAjaxSuccessful(output, fileId, data) {
	var result = output.result;
	
	if (result == 'Success') {
		docCookies.setItem('fileId', fileId);
		docCookies.setItem('fileData', JSON.stringify(data));
    } else if (result == 'Fail') {
        alert('DB에 넣는 도중에 오류가 발생하였습니다.');
    }
}

// LogoutServlet에서 유저 쿠키 삭제
function logout() {
	$.ajax({
		url: 'LogoutServlet',
		type: 'GET',
		success: () => {
		    docCookies.removeItem('userEmail');
			docCookies.removeItem('fileId');
            docCookies.removeItem('fileName');
            docCookies.removeItem('fileData');
			hideNavbarButtons();
	    	showLoggedOutButton();
	    	$('#userEmail').text('');

	    	nodeManager.setData(newTreeData);

	    	autoAlert('로그아웃에 성공하였습니다.', 1000);
		},
		error: () => {
			alert('로그아웃 실패.. 이런 경우는 아마 네트워크가 끊겼을 때라던가...');
		}
	});
}

//그냥 저장하거나 덮어 씀
function saveOrOverwriteFile(userId, fileName, data) {
	if ( !checkTitleIsNull(fileName) ) {
    	var resultFileId = findDuplicateName(userId, fileName);
    	
		if ( resultFileId < 0 ) { // 중복된 파일이 없으면 ( resultFileId == -1 )
			saveFile(userId, fileName, data);
			$('#saveModal').modal('hide');
		} else if ( confirm("이미 있는 파일 이름입니다. 덮어쓰시겠습니까?") ) { // 중복된 파일이 있으면
			updateFile(resultFileId, data);
			$('#saveModal').modal('hide');
		} else {
			var fileNameInput = $('#saveModal #fileName');
			fileNameInput.focus();
			fileNameInput.select();
		}
	} else {
		$("#saveModal p[class='error']").text('파일 이름을 입력해주세요.');
	}
}

// 같은 파일 있는지 조사
function findDuplicateName(userId, title) {
	var jqXHR = $.ajax({
        url: 'FindDuplicateName',
        type: 'POST',
        data: { 'userId': userId, 'title': title },
        async: false
    });
	
	var response = jqXHR.responseJSON;
	return (response.result == 'Success') ? parseInt(response.data) : -1;
}

// 파일 갯수 반환
function getFileCount(userId) {
	var jqXHR = $.ajax({
		url: 'FileCountServlet',
		type: 'POST',
		data: { 'userId': userId },
		async: false
	});

	var response = jqXHR.responseJSON;
	return (response.result == 'Success') ? parseInt(response.data) : -1;
}

// 파일 목록 모달에 필요한 요소들 적재
function loadFileListModal() {
    var modal = $('#fileListModal');

    modal.find('#fileListModalLabel').text('html 파일 목록');

    var fileCount = getFileCount(docCookies.getItem('userId'));
    fileListPaging(fileCount);

    var lis = modal.find('.modal-footer li');
    if (lis.length > 2) {
        lis.first().next().addClass('active');
    }

    loadFiles(lis.filter('.active').index());

    var fileId = docCookies.getItem('fileId');
    var fileName = docCookies.getItem('fileName');
    if (fileId && fileName) {
        modal.find('#nowFileName').text('현재 열려있는 파일 : ' + fileName);
    }
}

// 파일 리스트 페이징
function fileListPaging(fileCount) {
	if (fileCount == -1) {
		return;
	}

    var pageCount = Math.ceil(fileCount * 0.1);

    for (var i = 1; i <= pageCount; i++) {
        var li = $('<li>').addClass('page-item');
        var a = $('<a>').attr({class: 'page-link', href: '#'}).text(i);

        li.click(function() {
            $(this).parent().children().removeClass('active');
            $(this).addClass('active');

            $('#fileListModal .modal-body .list-group').children().remove();

            loadFiles($(this).index());
        });

        $('#fileListModal .pagination > li:nth-child(' + i + ')').after(li.append(a));
    }
}

// pageIndex에 의한 파일들 불러오기
function loadFiles(pageIndex) {
    fileDatas = getFileList(docCookies.getItem('userId'), pageIndex);
    for (var index in fileDatas) {
        var file_row = $('<li>')
            .addClass('list-group-item list-group-item-action')
            .css({'cursor': 'default', 'user-select': 'none'});
        file_row.append($('<span>').text(fileDatas[index].userFileTitle));

        file_row.click(function() {
            $('#fileListModal .modal-body li').removeClass('active');
            $(this).addClass('active');
        });

        var remove_button = $('<button>')
            .addClass('close')
            .text('×')
            .click(function(event) {
                event.stopPropagation(); // 부모 요소에서 이벤트 발생 방지

                var file_row = $(event.target).parent();
                var fileName = file_row.find('span').text();
                if (confirm('정말로 ' + fileName + '(을)를 삭제하시겠습니까?')) {
                    var fileId = getFileIdByName(fileName);
                    if (docCookies.getItem('fileId') != fileId) {
                        deleteFile(fileId);
                    } else {
                        alert('현재 편집중인 파일입니다.');
                    }
                }
            });

        file_row.append(remove_button);
        $('#fileListModal .modal-body ul').append(file_row);
    }
}

// 파일 리스트를 가져옴
function getFileList(userId, index) {
    var jqXHR = $.ajax({
        url: 'FileListServlet',
        type: 'POST',
        data: { 'userId': userId, 'index': index },
        async: false
    });

    return jqXHR.responseJSON.data;
}

// 파일 삭제
function deleteFile(fileId) {
    $.ajax({
        url: 'FileDeleteServlet',
        type: 'POST',
        data: { 'fileId': fileId },
        success: () => {
            initFileListModal();
            loadFileListModal();
        },
        error: () => { alert('서버와의 연결이 끊겼습니다.') }
    })
}

// 파일 이름으로 파일 아이디를 찾아 반환
function getFileIdByName(fileName) {
    for (var index in fileDatas) {
        if (fileDatas[index].userFileTitle == fileName) {
            return fileDatas[index].userFileId;
        }
    }
    return -1;
}

// 파일 아이디로 파일 데이터 찾아 반환
function getFileDataById(fileId) {
    for (var index in fileDatas) {
        if (fileDatas[index].userFileId == fileId) {
            return fileDatas[index].userFileCode;
        }
    }
    return -1;
}

//email과 password중 하나라도 null이거나 빈문자열이면 true반환
function checkEmailAndPasswordAreNull(email, password) {
    return ((email == null || email == '') || (password == null || password == '')) ? true : false;
}
//타이틀이 null이면
function checkTitleIsNull(fileName) {
    return (fileName == null || fileName == '') ? true : false;
}

// w3schools 열기
function openW3schoolsExplanation(id) {
    if (id == 'h1') {
        id = 'hn';
    }
    window.open("https://www.w3schools.com/tags/tag_" + id + ".asp");
}

// 저장 버튼 로딩 중으로
function changeLoadingSaveButton() {
    $('#saveBtn').prop('disabled', true).addClass('disabled')
        .find('div').text('').addClass('btn-loader');
}

// 저장 버튼 원래로
function changeDefaultSaveButton() {
    $('#saveBtn').prop('disabled', false).removeClass('disabled')
        .text('저장').removeClass('btn-loader');
}

// navbar에 있는 버튼들 숨김
function hideNavbarButtons() {
    $('#userManagement > .navbar-nav > li:gt(1)').hide();

    $('#saveBtn').parent().hide();
    $('#saveAsBtn').parent().hide();
    $('#logoutBtn').parent().hide();
    $('#loginBtn').parent().hide();
    $('#registerBtn').parent().hide();
}

// 로그인 됐을 때 표시해야 할 버튼들 표시
function showLoggedInButtons () {
    $('#userManagement > .navbar-nav > li:gt(1)').show();

    $('#saveBtn').parent().show();
    $('#saveAsBtn').parent().show();
    $('#logoutBtn').parent().show();
}

// 로그아웃 됐을 때 표시해야 할 버튼들 표시
function showLoggedOutButton() {
    $('#loginBtn').parent().show();
    $('#registerBtn').parent().show();
}

// 로그인 모달 초기화
function initLoginModal() {
	var modal = $('#loginModal');
	
	modal.find('#loginEmailInput').val('');
	modal.find('#loginPasswordInput').val('');
	modal.find("p[class='error']").text('');
}

// 회원가입 모달 초기화
function initRegisterModal() {
	var modal = $('#registerModal');
	
	modal.find('#registerEmailInput').val('');
	modal.find('#registerPasswordInput').val('');
	modal.find('#registerRePasswordInput').val('');
}

// 설정 모달 초기화
function initConfigModal() {
	var modal = $('#configModal');
	
	modal.find('#themes > button').removeClass('active');
}

// 파일 목록 모달 초기화
function initFileListModal() {
	var modal = $('#fileListModal');

	modal.find('#fileListModalLabel').text('');
	modal.find('#nowFileName').text('현재 열린 파일이 없습니다.');
    modal.find('.modal-body .list-group').children().remove();
    modal.find(".modal-body p[class='error']").text('');
    modal.find('.pagination > li').slice(1, modal.find('.pagination').children().length - 1).remove();
}

// 저장 모달 초기화
function initSaveModal() {
	var modal = $('#saveModal');

	modal.find('#fileName').val('');
	modal.find("p[class='error']").text('');
}

//웹페이지 띄우기
function openWebpage() {
	var popUrl = 'webPage.html';
	var popOption = 'width=1600, height=900, status=no, left=160, top=10;';
	var webPage = window.open(popUrl, "결과 웹페이지", popOption);
	webPage.onload = function() {
		webPage.document.getElementsByTagName('body')[0].innerHTML = ace_editors.userEditor.getSession().getValue();
  	}
}

//localStorage에 저장된 스크롤을 불러서 저장
function loadOldScroll() {
    oldScroll = localStorage.getItem("sTop");
    console.log(oldScroll);
    if( oldScroll ) {
        $(window).scrollTop(oldScroll);
    }
}

function autoAlert(text, time) {
    $('.alert p').text(text);
    $('.alert').css('opacity', '100').show();

    setTimeout(function() {
        $(".alert").fadeTo(500, 0).slideUp(500, function() {
            $(this).hide();
        });
    }, time);
}

var docCookies = {
    getItem: function (sKey) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },

    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    },

    removeItem: function (sKey, sPath, sDomain) {
        if (!sKey || !this.hasItem(sKey)) { return false; }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
        return true;
    },

    hasItem: function (sKey) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },

    keys: /* optional method: you can safely remove it! */ function () {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
        return aKeys;
    }
};
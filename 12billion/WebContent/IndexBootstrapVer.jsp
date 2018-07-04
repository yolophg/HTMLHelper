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
	
<!doctype html>
<html lang="ko">

<head>
    <title>HTMLHelper</title>
    <%--Required meta tags--%>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
    <link rel="stylesheet" href="css/bootstrapMainPage.css?<%=now%>">
    <%--google font--%>
    <link href="https://fonts.googleapis.com/css?family=Roboto+Mono|PT+Sans" rel="stylesheet">
    <%--Bootstrap CSS--%>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css">

</head>

<body>
    <%--image slider--%>
    <div id="intro">
        <div id="slideSection">
            <div id="back1"><img src="img/introBack1.png"></div>
            <div id="back2"><img src="img/introBack2.png"></div>
        </div>
        <div id="introSection" class="center-block">
            <img id="logo" class="center-block" src="img/logo.png">
            <p>Do Enjoy HTMLHelper</p>
            <input class="center-block" type="image" src="img/arrow_button.png" />
        </div>
    </div>

	<div id="userSection">
		<%--네비게이션 바--%>
		<nav class="navbar navbar-expand-md navbar-dark">
			<span id="navbarLogo" class="navbar-brand">HTMLHelper</span>
			<button class="navbar-toggler hidden-lg-up" type="button"
				data-toggle="collapse" data-target="#userManagement"
				aria-controls="userManagement" aria-expanded="false"
				aria-label="Toggle navigation"></button>
			<div class="collapse navbar-collapse" id="userManagement">
				<%--로그인이 되었을 경우 표시--%>
				<ul class="navbar-nav mr-auto mt-2 mt-lg-0">
					<li class="nav-item">
						<span id="config" class="nav-link" data-toggle="modal" data-target="#configModal">설정</span>
					</li>
					<li class="nav-item">
						<span id="newFile" class="nav-link" data-toggle="modal" data-target="#newFileModal">새 파일</span>
					</li>
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" id="loadFiles" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">파일 목록</a>
						<div class="dropdown-menu" aria-labelledby="loadFiles">
							<span class="dropdown-item" id="htmlListButton">html 목록</span>
							<%--<span class="dropdown-item" id="cssListButton">css 목록</span>--%>
						</div>
					</li>
				</ul>
				<ul class="list-inline my-2 my-lg-0">
					<li class="list-inline-item" id="userEmail"></li>
					<li class="list-inline-item">
						<input type="button" class="btn navbar-btn btn-custom-outline-softpink" id="runBtn" value="페이지 보기"></li>
					<li class="list-inline-item">
						<%--로그인이 되었을 경우 표시--%>
						<button type="button" class="btn navbar-btn btn-custom-outline-softpink" id="saveBtn">
							<div>저장</div>
						</button>
					</li>
					<li class="list-inline-item">
						<%--로그인이 되었을 경우 표시--%>
						<button type="button" class="btn navbar-btn btn-custom-outline-softpink" id="saveAsBtn">
							<div>다른 이름으로 저장</div>
						</button>
					</li>
					<li class="list-inline-item">
						<%--로그인이 되지않았을 경우 표시--%>
						<input type="button" class="btn navbar-btn btn-custom-outline-white" id="loginBtn" data-toggle="modal" data-target="#loginModal" value="로그인">
					</li>
					<li class="list-inline-item">
						<%--로그인이 되었을 경우 표시--%>
						<input type="button" class="btn navbar-btn btn-custom-outline-white" id="logoutBtn" value="로그아웃">
					</li>
					<li class="list-inline-item">
						<%--로그인이 되지않았을 경우 표시--%>
						<input type="button" class="btn navbar-btn btn-custom-outline-white" id="registerBtn" data-toggle="modal" data-target="#registerModal" value="회원가입">
					</li>
				</ul>
			</div>
		</nav>

		<%--사용자가 작업하는 공간--%>
		<div class="container-fluid">
			<div id="editSection" class="row">
				<div class="col-md-1" id="tagSection" align="center">
					<ul><%--js로 로드--%></ul>
				</div>

				<div class="col-md-8" id="middleSection">
					<div id="dropSection">
					</div>
					<img id="wastebasket_layer" src="img/trashcan.png" />

				</div>

				<div class="col-md-3">
					<div id="attrSection" class="row">
						<div id="attrWrap">
                            <h1>Attribute(속성)</h1>
							<input type="image" src="img/add.png" alt="Add" class="addBtn" onclick="addAttrLine();" value="attr">
							<ul id="attrTitle">
							</ul>

							<ul id="attrText"><!--속성이 없습니다 멘트 들어올부분--></ul>
						</div>
					</div>
					<div id="cssSection" class="row">
						<!-- 일단은  css 어디에 추가해야 될 지 감이 제대로 안 잡혀서 임시로 여기에 둔다.  -->
						<div id="cssWrap">
                            <h1>Style(스타일)</h1>
							<input type="image" src="img/add.png" alt="Add" class="addBtn" onclick="addCssLine();" value="css">
							<ul id="cssTitle">
							</ul>

							<ul id="cssText"><!--속성이 없습니다 멘트 들어올부분--></ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="codeSection">
			<div class="card">
				<div class="card-header">
					<a class="card-link" data-toggle="collapse" href="#codeCollapse">코드 보기</a>
				</div>
				<div class="collapse" id="codeCollapse">
					<div class="card-body">
						<script class="row brush: html"></script>
					</div>
				</div>
			</div>
		</div>
	</div>


	<%--로그인 Modal--%>
	<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">로그인</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<form id="loginForm">
					<div class="modal-body">
						<div class="container-fluid">
							<div class="form-group">
								<label>이메일</label>
								<input type="email" id="loginEmailInput" class="form-control" placeholder="example@domain.com"/>
							</div>
							<div class="form-group">
								<label>비밀번호</label>
								<input type="password" id="loginPasswordInput" class="form-control"/>
							</div>
							<div class="form-group checkbox">
								<span class="character-checkbox"></span>
								<span class="label">Show password</span>
							</div>
							<div class="form-group">
								<p class="error"></p>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<div class="container-fluid">
							<div class="form-group">
								<input type="submit" class="btn btn-custom btn-lg btn-block" value="로그인"/>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

	<%--회원가입 Modal--%>
	<div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">회원가입</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<form id="registerForm">
					<div class="modal-body">
						<div class="container-fluid">
							<div class="form-group">
								<label>이메일</label>
								<input type="email" id="registerEmailInput" class="form-control" placeholder="example@domain.com" />
							</div>
							<div class="form-group">
								<label>비밀번호</label>
								<input type="password" id="registerPasswordInput" class="form-control userPasswordInput"/>
							</div>
							<div class="form-group">
								<label>비밀번호 확인</label>
								<input type="password" id="registerRePasswordInput" class="form-control"/>
							</div>
							<div class="form-group">
								<p class="error">
								</p>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<div class="container-fluid">
							<div class="form-group">
								<input type="submit" class="btn btn-custom btn-lg btn-block" value="회원가입"/>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

	<%--저장Modal--%>
	<div class="modal fade" id="saveModal" tabindex="-1" role="dialog" aria-labelledby="saveModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="saveModalLabel">저장</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label for="fileName" class="form-control-label">파일 이름:</label>
						<input type="text" class="form-control" id="fileName">
					</div>
					<div class="form-group">
						<p class="error"></p>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
					<button type="button" id="saveModalSaveButton" class="btn btn-primary">저장</button>
				</div>
			</div>
		</div>
	</div>

	<%--설정Modal--%>
	<div class="modal fade" id="configModal" tabindex="-1" role="dialog" aria-labelledby="configModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="configModalLabel">코드 에디터 테마 설정</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="container-fluid row">
						<ul class="col-md-6 list-group" id="themeList"></ul>
						<div class="col-md-6 list-group">
							<script id="exampleCode" class="brush: html"></script>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<%--페이지 임포트Modal--%>
	<div class="modal fade" id="importPageModal" tabindex="-1" role="dialog" aria-labelledby="importPageModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="importPageModalLabel">페이지 코드 임포트</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label class="form-control-label">주소:</label>
						<input type="text" class="form-control">
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
					<button type="button" class="btn btn-primary" id="importCodeButton">코드 임포트</button>
				</div>
			</div>
		</div>
	</div>

	<%--파일 목록Modal--%>
	<div class="modal fade" id="fileListModal" tabindex="-1" role="dialog" aria-labelledby="fileListModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="fileListModalLabel"></h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<label id="nowFileName">현재 열린 파일이 없습니다.</label>
					<hr style="margin-top: 0;" />
					<div class="form-group">
						<ul class="list-group" id="fileList"></ul>
					</div>
					<div class="form-group">
						<p class="error"></p>
					</div>
				</div>
				<div class="modal-footer">
					<ul class="pagination pagination-sm">
						<li class="page-item" id="prevBtn"><a href="#" class="page-link">이전</a></li>
						<li class="page-item" id="nextBtn"><a href="#" class="page-link">다음</a></li>
					</ul>
					<button type="button" class="btn btn-primary" id="loadFileButton">불러오기</button>
				</div>
			</div>
		</div>
	</div>

	<div class="drop_area">
		<div class="drop_area_elder"></div>
		<div class="drop_area_younger"></div>
		<div class="drop_area_child"></div>
	</div>

	<div class="alert alert-success" role="alert">
		<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		<strong>성공!</strong><p></p>
	</div>

	<%--Optional JavaScript--%>
    <%--jQuery first, then Popper.js, then Bootstrap JS--%>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous" type="text/javascript"></script>
    <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js" integrity="sha256-eGE6blurk5sHj+rmkfsGYeKyZx3M4bG+ZlFyA7Kns7E=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.9/ace.js" rel="script" type="text/javascript"></script>
    <script src="js/tabifier.js" rel="script"></script>
    <script src="js/attributes.js?<%=now%>"></script>
    <script src="js/ace_editor.js?<%=now%>" rel="script"></script>
    <script src="js/script.js?<%=now%>" type="text/javascript"></script>
    <script src="js/jquery.smooth-scroll.js" type="text/javascript"></script>
    <script src="js/tree.js?<%=now%>" type="text/javascript"></script>
	<script src="js/jquery.form.js"></script>
	<script src="js/jquery.fileupload.js"></script>

</body>
</html>
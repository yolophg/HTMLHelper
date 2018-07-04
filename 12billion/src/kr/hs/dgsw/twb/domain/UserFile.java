package kr.hs.dgsw.twb.domain;

public class UserFile {

	private int userFileId;	
	private String userFileTitle;
	private String userFileCode;
	
	public int getUserFileId() {
		return userFileId;
	}

	public void setUserFileId(int userFileId) {
		this.userFileId = userFileId;
	}

	public String getUserFileTitle() {
		return userFileTitle;
	}

	public void setUserFileTitle(String userFileTitle) {
		this.userFileTitle = userFileTitle;
	}

	public String getUserFileCode() {
		return userFileCode;
	}

	public void setUserFileCode(String userFileCode) {
		this.userFileCode = userFileCode;
	}
	
}

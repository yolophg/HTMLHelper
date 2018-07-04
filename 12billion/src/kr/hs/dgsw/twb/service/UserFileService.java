package kr.hs.dgsw.twb.service;

import java.util.List;

import kr.hs.dgsw.twb.domain.UserFile;

public interface UserFileService {

	public int fileCreate(int userId, String title, String code);
	
	public UserFile fileRead(int fileId);
	
	public void fileUpdate(int fileId, String code);
	
	public void fileDelete(int fileId);
	
	public List<UserFile> fileList(int userId, int index);
	
	public int getFileCount(int userId);
	
	public int fileDuplicateNameFind(int userId, String title);
}

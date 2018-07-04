package kr.hs.dgsw.twb.repository;

import java.util.List;

import kr.hs.dgsw.twb.domain.UserFile;

public interface UserFileRepository {

	//파일생성
	public int create(int userId, UserFile userFile) throws RuntimeException;
	
	//파일읽기
	public UserFile read(int userFileId) throws RuntimeException;
	
	//파일업데이트
	public void update(UserFile userFile) throws RuntimeException;
	
	//파일지우기
	public void delete(int userFileId) throws RuntimeException;
	
	//자기의 모든파일읽기
	public List<UserFile> list(int userFileId, int index) throws RuntimeException;
	
	//특정유저의 파일 갯수 구하기
	public int getCount(int userId) throws RuntimeException;
	
	//파일 이름으로 중복된 이름 있는지 찾기
	public int findDuplicateName(int userId, String title) throws RuntimeException;
}

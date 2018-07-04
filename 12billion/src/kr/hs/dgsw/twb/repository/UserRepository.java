package kr.hs.dgsw.twb.repository;

import java.util.List;

import kr.hs.dgsw.twb.domain.User;

public interface UserRepository
{
	/**
	 * 사용자를 추가한다.
	 *  
	 * @param user 사용자
	 * @return 사용자 아이디
	 * @throws RuntimeException 데이터베이스 작업에 문제가 있을 경우 발생한다.
	 */
	public int add(User user) throws RuntimeException;
	
	// 변경
	public void update(User user) throws RuntimeException;
	
	// 삭제
	public void delete(int userId) throws RuntimeException;
	
	// 조회 - 목록
	public List<User> list() throws RuntimeException;
	
	// 상세 조회
	public User read(int userId) throws RuntimeException;
	
	public User read(String email) throws RuntimeException;
}

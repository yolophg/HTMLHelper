package kr.hs.dgsw.twb.service;

import kr.hs.dgsw.twb.domain.User;

public interface UserService
{
	public void signUp(String email, String password);
	
	public User signIn(String email, String password);
	
	public void Update(int userId, String password);
}

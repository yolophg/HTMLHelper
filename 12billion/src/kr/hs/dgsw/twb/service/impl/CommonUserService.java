package kr.hs.dgsw.twb.service.impl;

import kr.hs.dgsw.twb.domain.User;
import kr.hs.dgsw.twb.repository.UserRepository;
import kr.hs.dgsw.twb.repository.mysql.MysqlUserRepository;
import kr.hs.dgsw.twb.service.UserService;

public class CommonUserService implements UserService
{
	private UserRepository repository = new MysqlUserRepository();
	
	@Override
	public void signUp(String email, String password)
	{
		User user = new User();
		user.setEmail(email);
		user.setPassword(password);
		try
		{
			repository.add(user);
		}
		catch (Exception e){ throw new RuntimeException(e); }
	}

	@Override
	public User signIn(String email, String password)
	{
		User user = null;
		try
		{
			User userInfo = repository.read(email);
			
			if (userInfo == null){ throw new RuntimeException(); }
			else
			{
				String passwordCheck = userInfo.getPassword();
				if (passwordCheck.equals(password))
				{
					user = userInfo;
					user.setPassword(null);
				}
				else{ throw new RuntimeException(); }
			}
		}
		catch (Exception e){ throw new RuntimeException(e); }
		
		return user;
	}

	@Override
	public void Update(int userId, String password)
	{		
		User user = new User();
		user.setUserId(userId);
		user.setPassword(password);
		
		try
		{
			repository.update(user);
		}
		catch (Exception e){ throw new RuntimeException(e); }	
	}

}

package kr.hs.dgsw.twb.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import kr.hs.dgsw.twb.domain.User;
import kr.hs.dgsw.twb.service.UserService;
import kr.hs.dgsw.twb.service.impl.CommonUserService;

@WebServlet("/SignInServlet")
public class SignInServlet extends HttpServlet
{
	private static final long serialVersionUID = 1L;
       
	private static UserService userService = new CommonUserService();
	
    public SignInServlet()
    {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{		
		response.setContentType("application/json; charset=UTF-8");
		
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		User user  = null;
		RestResult restResult = new RestResult();
		String finalResult = null;
		Gson gson = new Gson();
		
		try {
			user = userService.signIn(email, password);
			
			Cookie cookie = new Cookie("userId", Integer.toString(user.getUserId()));
			cookie.setPath("/");
			cookie.setMaxAge(100000);
			response.addCookie(cookie);
			
			restResult.setResult("Success");
			restResult.setData(user);		
		} catch (Exception e) {
			restResult.setResult("Fail");
		}
		
		finalResult = gson.toJson(restResult);
		response.getWriter().append(finalResult);
		
	}

}

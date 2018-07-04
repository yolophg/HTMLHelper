package kr.hs.dgsw.twb.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import kr.hs.dgsw.twb.service.UserFileService;
import kr.hs.dgsw.twb.service.impl.CommonFileService;

@WebServlet("/FileCreateServlet")
public class UserFileCreateServlet extends HttpServlet
{
	private static final long serialVersionUID = 1L;
	
	private static UserFileService fileService = new CommonFileService();

    public UserFileCreateServlet()
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
		
		String userId = request.getParameter("userId");
		String title = request.getParameter("title");
		String code = request.getParameter("code");
		RestResult restResult = new RestResult();
		String finalResult = null;
		int fileId = 0;
		Gson gson = new Gson();
		
		try {
			fileId = fileService.fileCreate(Integer.parseInt(userId), title, code);
			restResult.setResult("Success");
			restResult.setData(fileId);
		} catch (Exception e) {
			restResult.setResult("Fail");
		}
		
		finalResult = gson.toJson(restResult);
		response.getWriter().append(finalResult);

	}

}

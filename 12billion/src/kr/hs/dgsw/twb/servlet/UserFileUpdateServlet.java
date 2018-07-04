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

@WebServlet("/FileUpdateServlet")
public class UserFileUpdateServlet extends HttpServlet
{
	private static final long serialVersionUID = 1L;
	
	private static UserFileService fileService = new CommonFileService();
       
    public UserFileUpdateServlet()
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
		String fileId = request.getParameter("fileId");
		String code = request.getParameter("code");
		RestResult restResult = new RestResult();
		String finalResult = null;
		Gson gson = new Gson();
		
		try {		
			fileService.fileUpdate(Integer.parseInt(fileId), code);
			restResult.setResult("Success");		
		} catch (Exception e) {
			restResult.setResult("Fail");
		}
		
		finalResult = gson.toJson(restResult);
		response.getWriter().append(finalResult);
	}

}

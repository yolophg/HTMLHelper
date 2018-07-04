package kr.hs.dgsw.twb.servlet;

import java.io.File;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import com.google.gson.Gson;

@MultipartConfig(location = "images", maxFileSize = 1024 * 1024 * 10, fileSizeThreshold = 1024 * 1024, maxRequestSize = 1024 * 1024 * 20) 


@WebServlet("/ImageUploadServlet")
public class ImageUploadServlet extends HttpServlet
{
	private static final long serialVersionUID = 1L;
	
    public ImageUploadServlet()
    {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		doPost(request, response);
	}

	@Override 
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{ 
		RestResult restResult = new RestResult();
		String finalResult = null;
		Gson gson = new Gson();
		
		File tempDirectory = makeTempDirectory();
		File directory = makeImageDirectory();
		
        Part filePart = null; 
        for (Part part : request.getParts())
        {
            if (part.getName().equals("file")) {
                filePart = part;

                // �ӽ� ���丮�� ������ ������
                filePart.write(filePart.getSubmittedFileName());

                // �ӽ� ���丮�� ����� ������ webapps ���丮�� �ű�
                File file = new File(tempDirectory, filePart.getSubmittedFileName());
                if (file.exists())
                {
                	file.renameTo(new File(directory, filePart.getSubmittedFileName()));
                }

                restResult.setData("images/" + filePart.getSubmittedFileName());
            }
        }
        
        restResult.setResult("Success");
        
        finalResult = gson.toJson(restResult);
		response.getWriter().append(finalResult);
    }
	
	private File makeTempDirectory()
	{
		String tempPath = System.getProperty("catalina.base") + "\\work\\Catalina\\localhost\\12billion";
		File tempDirectory = new File(tempPath, "images");
		tempDirectory.mkdirs();
		
		return tempDirectory;
	}

	private File makeImageDirectory()
	{
		String path = System.getProperty("catalina.base") + "\\wtpwebapps\\12billion\\images";
		File directory = new File(path);
		directory.mkdirs();
		
		return directory;
	}
}

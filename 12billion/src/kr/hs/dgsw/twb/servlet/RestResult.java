package kr.hs.dgsw.twb.servlet;

public class RestResult
{
	private String result;
	private Object data;
	
	public String getResult()
	{
		return result;
	}

	public void setResult(String result)
	{
		this.result = result;
	}

	public Object getData()
	{
		return data;
	}

	public void setData(Object data)
	{
		this.data = data;
	}
}

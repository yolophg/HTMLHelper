package kr.hs.dgsw.twb.test;

import java.util.Date;

public class VarArgs
{
	public static void println(String format, Object... objects)
	{
		for (Object obj : objects)
		{
			System.out.println(obj);
		}
		
		//System.out.println(format, objects);
	}
	
	public static int sum(int... values)
	{
		int result = 0;
		
		for (int value: values)
		{
			result += value;
		}
		
		return result;
	}
	

	public static void main(String[] args)
	{
		VarArgs.println("", "abc", 132, new Date());
		
		System.out.println(sum(1, 5, 23, 59, 68, 4, 17));
	}
}

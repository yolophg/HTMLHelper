package kr.hs.dgsw.twb.jdbc;

import java.sql.ResultSet;
import java.sql.SQLException;

public abstract class ResultSetReader<T>
{
	private T value;
	
	public void read(ResultSet rs) throws SQLException
	{
		value = readRs(rs);
	}
	
	protected abstract T readRs(ResultSet rs) throws SQLException;
	
	public T getValue()
	{
		return value;
	}
}

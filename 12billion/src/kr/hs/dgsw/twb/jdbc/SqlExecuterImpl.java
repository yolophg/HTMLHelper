package kr.hs.dgsw.twb.jdbc;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;

public class SqlExecuterImpl implements SqlExecuter
{

	JdbcTemplate jdbcTemplate = new JdbcTemplate();
	
	@Override
	public int execute(String sql, Object... args)
	{
		try
		{
			PreparedStatementMaker maker = makePreparedStatementMaker(sql, args);
			jdbcTemplate.executeUpdate(maker);
		}
		catch (Exception e)
		{
			e.printStackTrace();
			throw new RuntimeException("데이터베이스에 연결할 수 없습니다.");
		}
		
		return 0;
	}

	@Override
	public void query(String sql, ResultSetReader<?> reader, Object... args)
	{
		try
		{
			PreparedStatementMaker maker = makePreparedStatementMaker(sql, args);
			jdbcTemplate.executeQuery(maker, reader);
		}
		catch (Exception e)
		{
			e.printStackTrace();
			throw new RuntimeException("데이터베이스에 연결할 수 없습니다.");
		}
	}
	
	private PreparedStatementMaker makePreparedStatementMaker(String sql, Object... args) throws Exception
	{
		PreparedStatementMaker maker = new PreparedStatementMaker()
		{
			@Override
			public PreparedStatement make(Connection con) throws SQLException
			{
				PreparedStatement pstmt = con.prepareStatement(sql);
				
				int index = 0;
				for (Object arg: args)
				{
					index++;
					
				    if (arg instanceof Integer)
					{
						pstmt.setInt(index, (int)arg);
					}
					else if (arg instanceof Float || arg instanceof Double)
					{
						pstmt.setDouble(index, (double)arg);
					}
					else if (arg instanceof Date)
					{
						pstmt.setTimestamp(index, new Timestamp(((Date)arg).getTime()));
					}
					else if (arg instanceof Timestamp)
					{
						pstmt.setTimestamp(index, (Timestamp)arg);
					}
					else if (arg instanceof String)
					{
						pstmt.setString(index, (String)arg);
					}
				}
				
				return pstmt;
			}
		};
		
		return maker;
	}
}

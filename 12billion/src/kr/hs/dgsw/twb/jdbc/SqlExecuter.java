package kr.hs.dgsw.twb.jdbc;

public interface SqlExecuter
{
	public int execute(String sql, Object...args);
	
	public void query(String sql, ResultSetReader<?> reader, Object...args);
}

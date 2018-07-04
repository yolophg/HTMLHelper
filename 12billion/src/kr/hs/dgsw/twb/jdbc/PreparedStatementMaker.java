package kr.hs.dgsw.twb.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public interface PreparedStatementMaker
{
	public PreparedStatement make(Connection con) throws SQLException;
	
	
}

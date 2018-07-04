package kr.hs.dgsw.twb.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class JdbcTemplate
{
	public void executeUpdate(PreparedStatementMaker maker) throws SQLException, ClassNotFoundException
	{
		Class.forName("com.mysql.jdbc.Driver");
		Connection con = DriverManager.getConnection("jdbc:mysql://114.108.167.90:3306/dgsw_sms?useUnicode=true&characterEncoding=UTF-8", "dgsw", "dnrhddltks");
		
		PreparedStatement pstmt = maker.make(con);
		
		pstmt.executeUpdate();
		pstmt.close();
		
		con.close();
	}
	
	public void executeQuery(PreparedStatementMaker maker, ResultSetReader<?> rsReader) throws SQLException, ClassNotFoundException
	{
		Class.forName("com.mysql.jdbc.Driver");
		Connection con = DriverManager.getConnection("jdbc:mysql://114.108.167.90:3306/dgsw_sms?useUnicode=true&characterEncoding=UTF-8", "dgsw", "dnrhddltks");
		
		PreparedStatement pstmt = maker.make(con);
		
		ResultSet rs = pstmt.executeQuery();
		rsReader.read(rs);
		
		rs.close();
		pstmt.close();
		
		con.close();
	}
}

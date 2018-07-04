package kr.hs.dgsw.twb.repository.mysql;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import kr.hs.dgsw.twb.domain.User;
import kr.hs.dgsw.twb.jdbc.ResultSetReader;
import kr.hs.dgsw.twb.jdbc.SqlExecuter;
import kr.hs.dgsw.twb.jdbc.SqlExecuterImpl;
import kr.hs.dgsw.twb.repository.UserRepository;

public class MysqlUserRepository implements UserRepository {
	
	SqlExecuter executer = new SqlExecuterImpl();

	@Override
	public synchronized int add(User user) throws RuntimeException {
		int id = -1;

		try {
			executer.execute("INSERT INTO bil_user (email, password) VALUES (?, ?) ", user.getEmail(),
					user.getPassword());

			ResultSetReader<Integer> rsReader = new ResultSetReader<Integer>() {

				@Override
				public Integer readRs(ResultSet rs) throws SQLException {
					int id = -1;
					if (rs.next()) {
						id = rs.getInt(1);
					}

					return id;
				}
			};
			executer.query("SELECT MAX(user_id) AS id FROM bil_user", rsReader);
			id = rsReader.getValue();
		} catch (Exception e) {
			throw new RuntimeException("데이터베이스에 연결할 수 없습니다.");
		}

		return id;
	}

	@Override
	public void update(User user) throws RuntimeException {
		try {
			executer.execute("UPDATE bil_user SET password = ? WHERE user_id = ?",
					user.getPassword(), user.getUserId());
		} catch (Exception e) {
			throw new RuntimeException("데이터베이스에 연결할 수 없습니다.");
		}

	}

	@Override
	public void delete(int userId) throws RuntimeException {
		try {
			executer.execute("DELETE FROM bil_user WHERE user_Id = ? ", userId);
		} catch (Exception e) {
			throw new RuntimeException("데이터베이스에 연결할 수 없습니다.");
		}

	}

	@Override
	public List<User> list() throws RuntimeException {

		ResultSetReader<List<User>> reader = new ResultSetReader<List<User>>() {

			@Override
			protected List<User> readRs(ResultSet rs) throws SQLException {
				List<User> result = new LinkedList<>();
				User user = null;

				while (rs.next()) {
					user = new User();
					user.setUserId(rs.getInt("user_id"));
					user.setEmail(rs.getString("email"));
					user.setPassword(rs.getString("password"));

					result.add(user);
				}
				return result;

			}
		};

		executer.query("SELECT * FROM bil_user", reader);

		return reader.getValue();
	}

	@Override
	public User read(int userId) throws RuntimeException {
		ResultSetReader<User> reader = new ResultSetReader<User>() {

			@Override
			protected User readRs(ResultSet rs) throws SQLException {
				User user = new User();

				if (rs.next()) {
					user.setUserId(userId);
					user.setEmail(rs.getString("email"));
					user.setPassword(rs.getString("password"));
				}
				return user;
			}
		};

		executer.query("SELECT * FROM bil_user WHERE user_id = ?", reader, userId);

		return reader.getValue();
	}	
	@Override
	public User read(String email) throws RuntimeException
	{
		ResultSetReader<User> reader = new ResultSetReader<User>()
		{

			@Override
			protected User readRs(ResultSet rs) throws SQLException
			{
				User user = new User();
				
				if (rs.next())
				{
					user.setUserId(rs.getInt("user_id"));
					user.setEmail(email);
					user.setPassword(rs.getString("password"));
				}
				
				return user;
			}
		};
		
		executer.query("SELECT * FROM bil_user WHERE email = ?", reader, email);
		
		return reader.getValue();
	}
	
}

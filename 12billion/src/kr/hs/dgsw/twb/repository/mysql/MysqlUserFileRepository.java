package kr.hs.dgsw.twb.repository.mysql;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import kr.hs.dgsw.twb.domain.UserFile;
import kr.hs.dgsw.twb.jdbc.ResultSetReader;
import kr.hs.dgsw.twb.jdbc.SqlExecuter;
import kr.hs.dgsw.twb.jdbc.SqlExecuterImpl;
import kr.hs.dgsw.twb.repository.UserFileRepository;

public class MysqlUserFileRepository implements UserFileRepository {

	SqlExecuter executer = new SqlExecuterImpl();
	
	@Override
	public synchronized int create(int userId, UserFile userFile) throws RuntimeException {

		int id = -1;
		try {
			executer.execute("INSERT INTO bil_file (user_id, title, code, moidfied_date) VALUES (?, ?, ?, now()) ",
					userId, userFile.getUserFileTitle(), userFile.getUserFileCode());
			
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
			executer.query("SELECT MAX(file_id) AS id FROM bil_file", rsReader);
			id = rsReader.getValue();
		} catch (Exception e) {
			throw new RuntimeException("데이터베이스에 연결할 수 없습니다.");
		}

		return id;
		
	}

	@Override
	public UserFile read(int userFileId) throws RuntimeException {
		
		UserFile userFile = null;
		
		try {
			ResultSetReader<UserFile> rsReader = new ResultSetReader<UserFile>() {

				@Override
				public UserFile readRs(ResultSet rs) throws SQLException {
					
					UserFile rsFile = new UserFile();
					if (rs.next()) {
						rsFile.setUserFileId(rs.getInt(1));
						rsFile.setUserFileTitle(rs.getString(2));
						rsFile.setUserFileCode(rs.getString(3));
					}
					return rsFile;
				}
			};
			
			executer.query("SELECT file_id, title, code FROM bil_file WHERE file_id = ?", rsReader, userFileId);
			userFile = rsReader.getValue();
		} catch (Exception e) {
			throw new RuntimeException("데이터베이스에 연결할 수 없습니다.");
		}

		return userFile;
	}

	@Override
	public void update(UserFile userFile) throws RuntimeException {		
		try {
			executer.execute("UPDATE bil_file SET code = ?, moidfied_date = now() WHERE file_id = ? ",
					userFile.getUserFileCode(), userFile.getUserFileId());
		} catch (Exception e) {
			throw new RuntimeException("데이터베이스에 연결할 수 없습니다.");
		}

	}

	@Override
	public void delete(int userFileId) throws RuntimeException {
		try {
			executer.execute("DELETE FROM bil_file WHERE file_id = ? ", userFileId);
		} catch (Exception e) {
			throw new RuntimeException("데이터베이스에 연결할 수 없습니다.");
		}
	}

	@Override
	public List<UserFile> list(int userFileId, int index) throws RuntimeException {
		ResultSetReader<List<UserFile>> reader = new ResultSetReader<List<UserFile>>() {

			@Override
			protected List<UserFile> readRs(ResultSet rs) throws SQLException {
				List<UserFile> result = new LinkedList<UserFile>();
				UserFile userfile = null;

				while (rs.next()) {
					userfile = new UserFile();
					userfile.setUserFileId(rs.getInt("file_id"));
					userfile.setUserFileCode(rs.getString("code"));
					userfile.setUserFileTitle(rs.getString("title"));
					result.add(userfile);
				}
				return result;

			}
		};
		
		index = (index - 1) * 10;
		executer.query("SELECT * FROM bil_file WHERE user_id = ? LIMIT ?, 10;", reader, userFileId, index);
		return reader.getValue();
	}

	@Override
	public int getCount(int userId) throws RuntimeException {
		int count = -1;
		
		try {
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
			executer.query(" SELECT count(*) FROM bil_file WHERE user_id = ? ", rsReader, userId);
			count = rsReader.getValue();
		} catch (Exception e) {
			throw new RuntimeException("데이터베이스에 연결할 수 없습니다.");
		}

		return count;
	}

	@Override
	public int findDuplicateName(int userId, String title) throws RuntimeException {

		int fileId = 0;
		try{
			ResultSetReader<Integer> reader = new ResultSetReader<Integer>()
			{

				@Override
				protected Integer readRs(ResultSet rs) throws SQLException
				{
					int userId = -1;
				
					if (rs.next())
					{
						userId = rs.getInt(1);
					}
				
					return userId;
				}
			};		
			executer.query(" SELECT file_id FROM bil_file WHERE title = ? AND user_id = ?", reader, title, userId);
			fileId = reader.getValue();
		} catch (Exception e) {
			throw new RuntimeException("데이터베이스에 연결할 수 없습니다.");
		}
		
		return fileId;
	}

}

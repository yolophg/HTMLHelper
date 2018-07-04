package kr.hs.dgsw.twb.service.impl;

import java.util.List;

import kr.hs.dgsw.twb.domain.UserFile;
import kr.hs.dgsw.twb.repository.mysql.MysqlUserFileRepository;
import kr.hs.dgsw.twb.service.UserFileService;

public class CommonFileService implements UserFileService {

	private MysqlUserFileRepository repository = new MysqlUserFileRepository();
	
	@Override
	public int fileCreate(int userId, String title, String code) {
		
		UserFile File = new UserFile();
		File.setUserFileTitle(title);
		File.setUserFileCode(code);
		int result = 0;
		
		try
		{
			result = repository.create(userId, File);
		}
		catch (Exception e){ throw new RuntimeException(e); }
		
		return result;
	}

	@Override
	public UserFile fileRead(int fileId) {		
		UserFile resultFile = null;		
		try
		{
			resultFile = repository.read(fileId);
		}
		catch (Exception e){ throw new RuntimeException(e); }
	
		return resultFile;
	}

	@Override
	public void fileUpdate(int fileId, String code) {
		UserFile File = new UserFile();
		File.setUserFileId(fileId);
		File.setUserFileCode(code);

		try
		{		
			repository.update(File);
		}
		catch (Exception e){ throw new RuntimeException(e); }
	}

	@Override
	public void fileDelete(int fileId) {
		try
		{
			repository.delete(fileId);
		}
		catch (Exception e){ throw new RuntimeException(e); }
	}

	@Override
	public List<UserFile> fileList(int userId, int index) {
		List<UserFile> list = null;	
		
		try
		{
			list = repository.list(userId, index);
		}
		catch (Exception e){ throw new RuntimeException(e); }
		
		return list;		
	}

	@Override
	public int getFileCount(int userId) {
		int count = 0;
		
		try
		{		
			count = repository.getCount(userId);
		}
		catch (Exception e){ throw new RuntimeException(e); }
		
		return count;
	}

	@Override
	public int fileDuplicateNameFind(int userId, String title) {
		int fileId = 0;
		
		try
		{		
			fileId = repository.findDuplicateName(userId, title);
			if(fileId <= 0){ throw new RuntimeException(); }
		}
		catch (Exception e){ throw new RuntimeException(e); }
		
		return fileId;
	}

}

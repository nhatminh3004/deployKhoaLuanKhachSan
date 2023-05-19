package com.example.hotelserver.repository;

import java.util.List;

public interface CustomRepoNhanVien {
	List<String> findMaNhanVienByCustomField(String query);
}

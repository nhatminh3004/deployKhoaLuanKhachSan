package com.example.hotelserver.repository;

import java.util.List;

public interface CustomRepoKhachHang {
	List<String> findMaKhachHangByCustomField(String query);
}

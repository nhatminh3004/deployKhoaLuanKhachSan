package com.example.hotelserver.service;

import java.util.List;

import com.example.hotelserver.entity.Tang;

public interface TangService {
	boolean themTang(Tang tang);
	List<Tang> layTatCaTang();
	boolean kiemTraTangTonTaiTheoTen(String tenTang);
	List<Tang> timTangTheoTen(String tenTang);
	Tang timTangTheoMa(int maTang);
}

package com.example.hotelserver.service;

import java.util.List;

import com.example.hotelserver.dto.ThemCaLamViecDto;
import com.example.hotelserver.entity.CaLamViec;

public interface CaLamViecService {
	List<CaLamViec> layTatCaCaLamViec();
	
	boolean themCa(ThemCaLamViecDto caLamViecDto);
	boolean kiemTraCaLamViecTonTaiTheoTen(String tenCa);
	List<CaLamViec> timCaLamViecTheoTen(String tenCa);
	CaLamViec timCaLamViecTheoMa(long maCa);
	List<CaLamViec> timCaLamViecSapXepGioBatDau();
}

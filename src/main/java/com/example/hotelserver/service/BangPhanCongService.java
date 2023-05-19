package com.example.hotelserver.service;

import java.util.Date;
import java.util.List;

import com.example.hotelserver.dto.BangPhanCongDto;
import com.example.hotelserver.dto.ChiTietPhanCongDto;

public interface BangPhanCongService {
	List<BangPhanCongDto> layHetBangPhanCong();
	BangPhanCongDto layHetBangPhanCongTheoMaNhanVien(long maNhanVien);
	BangPhanCongDto themBangPhanCong(BangPhanCongDto bangPhanCongDto);
	List<ChiTietPhanCongDto> layBangPhanCongTheoThu(int thu, Date ngayBatDau);
}

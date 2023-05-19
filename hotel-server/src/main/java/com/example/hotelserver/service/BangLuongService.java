package com.example.hotelserver.service;

import java.util.List;

import com.example.hotelserver.dto.BangLuongDto;

public interface BangLuongService {
	List<BangLuongDto> themBangLuong(int thang, int nam);
	List<BangLuongDto> layBangLuongTheoMaNhanVien(long maNhanVien);
}

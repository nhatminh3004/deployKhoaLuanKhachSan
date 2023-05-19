package com.example.hotelserver.service;

import java.util.List;

import com.example.hotelserver.entity.LoaiPhong;

public interface LoaiPhongService {
	List<LoaiPhong> layTatCaLoaiPhong();
	
	boolean themLoaiPhong(LoaiPhong loaiPhong);
	boolean kiemTraLoaiPhongTonTaiTheoTen(String tenLoaiPhong);
	List<LoaiPhong> timLoaiPhongTheoTen(String tenLoaiPhong);
	LoaiPhong timLoaiPhongTheoMa(long maLoaiPhong);
}

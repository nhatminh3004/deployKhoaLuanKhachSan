package com.example.hotelserver.service;

import com.example.hotelserver.entity.DichVu;
import com.example.hotelserver.entity.LoaiDichVu;
import com.example.hotelserver.entity.LoaiPhong;

import java.util.List;

public interface LoaiDichVuService {
	List<LoaiDichVu> layTatCaLoaiDichVu();
	
	boolean themLoaiDichVu(LoaiDichVu loaiDichVu);
	boolean kiemTraLoaiDichVuTonTaiTheoTen(String tenLoaiDichVu);
	List<LoaiDichVu> timLoaiDichVuTheoTen(String tenLoaiDichVu);
	LoaiDichVu timLoaiDichVuTheoMa(long maLoaiDichVu);
}

package com.example.hotelserver.service;

import java.util.List;

import com.example.hotelserver.dto.ThemBangChamCongDto;
import com.example.hotelserver.entity.BangChamCong;

public interface BangChamCongService {
	BangChamCong layBangChamCongTheoThuVaMaChiTietPhanCong(int thu, long maChiTietPhanCong);
	List<BangChamCong> themBangChamCong(List<ThemBangChamCongDto> dsThemBangChamCongDto);
}

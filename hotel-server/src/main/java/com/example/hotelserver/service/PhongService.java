package com.example.hotelserver.service;

import java.util.Date;
import java.util.List;

import com.example.hotelserver.dto.PhongResponseDto;
import com.example.hotelserver.entity.Phong;

public interface PhongService {
	List<PhongResponseDto> layTatCaPhongSapXepTheoTrangThai(Date ngayNhanPhong, Date ngayTraPhong);
	List<PhongResponseDto> layTatCaPhong();
	boolean kiemTraPhongTonTaiTheoTen(String tenPhong);
	List<PhongResponseDto> timPhongTheoTenLike(String tenPhong);
	List<PhongResponseDto> timPhongTheoMa(String maPhong);
	boolean themPhong(Phong phong);
	boolean xoaPhong(String maPhong);
	List<PhongResponseDto> timPhongTheoMaTang(int maTang);
	List<PhongResponseDto> timPhongTheoMaLoaiPhong(long maLoaiPhong);
	List<PhongResponseDto> timPhongCustomQuery(String query);
}

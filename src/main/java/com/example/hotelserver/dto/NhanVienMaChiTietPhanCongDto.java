package com.example.hotelserver.dto;

import com.example.hotelserver.entity.NhanVien;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
public class NhanVienMaChiTietPhanCongDto {
	private NhanVien nhanVien;
	private long maChiTietPhanCong;
}

package com.example.hotelserver.dto;

import java.util.Date;
import java.util.List;

import com.example.hotelserver.entity.ChiTietPhanCong;
import com.example.hotelserver.entity.NhanVien;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
public class BangPhanCongDto {
	private long maBangPhanCong;
	private Date ngayPhanCong;
	private Date ngayChinhSua;
	private Date ngayBatDau;
	private NhanVien nhanVien;
	private List<ChiTietPhanCong> dsChiTietPhanCong;
}

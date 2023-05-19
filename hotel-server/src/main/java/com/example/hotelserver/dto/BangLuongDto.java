package com.example.hotelserver.dto;

import java.util.List;

import com.example.hotelserver.entity.ChiTietBangLuong;
import com.example.hotelserver.entity.NhanVien;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
public class BangLuongDto {
	private String maBangLuong;
	private int thang;
	private int nam;
	private NhanVien nhanVien;
	private List<ChiTietBangLuong> dsChiTietBangLuong;
	private double tongLuong;
}

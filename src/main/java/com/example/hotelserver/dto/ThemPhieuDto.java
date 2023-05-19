package com.example.hotelserver.dto;

import java.util.Date;
import java.util.List;

import com.example.hotelserver.entity.KhachHang;
import com.example.hotelserver.entity.TrangThaiDatPhong;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
public class ThemPhieuDto {
	private long maPhieuDatPhong;
	
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	private Date ngayDatPhong;
	
	private double giamGia;
	private String ghiChuDatPhong;
	
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	private Date ngayNhanPhong;
	
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	private Date ngayTraPhong;
	
	private TrangThaiDatPhong trangThaiDatPhong;
	private List<String> dsMaPhong;
	private KhachHang khachHang;
}

package com.example.hotelserver.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter @Getter
@AllArgsConstructor @NoArgsConstructor
@ToString
@Builder
public class ChiTietPhongDichVuDto {
	private long maChiTietDichVu;
	private long maDichVu;
	private String tenDichVu;
	private double giaDichVu;
	private int soLuong;

	private String tenLoaiDichVu;
	private String maPhong;
}

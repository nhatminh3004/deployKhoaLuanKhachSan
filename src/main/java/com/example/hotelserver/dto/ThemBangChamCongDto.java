package com.example.hotelserver.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
public class ThemBangChamCongDto {
	private long maBangChamCong;
	private Date ngayChamCong;
	private int thu;
	private long maChiTietPhanCong;
	private long maNhanVien;
	private boolean duocChon;
}

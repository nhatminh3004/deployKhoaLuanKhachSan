package com.example.hotelserver.dto;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
@ToString
public class ThemBangPhanCongDto {
	private long maBangPhanCong;
//	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	private Date ngayChinhSua;
//	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	private Date ngayPhanCong;
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	private Date ngayBatDau;
	private long maNhanVien;
	private List<Map<String, Object>> dsChiTietPhanCong;
}

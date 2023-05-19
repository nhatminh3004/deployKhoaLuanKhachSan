package com.example.hotelserver.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.*;

@Setter @Getter
@AllArgsConstructor @NoArgsConstructor
@ToString
@Builder
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)

public class ThongKeSoLanDatDichVuDto {
	private long maDichVu;
	private String tenDichVu;
	private double giaDichVu;
	private int soLuongTon;
	private String donViTinh;
	private String tenLoaiDichVu;
	private double tongSoLanDatDichVu;


}

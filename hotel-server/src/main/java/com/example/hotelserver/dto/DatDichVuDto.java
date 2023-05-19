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
public class DatDichVuDto {
	private long maDichVu;
	private int soLuongTong;
	private int soLuongMoi;
}

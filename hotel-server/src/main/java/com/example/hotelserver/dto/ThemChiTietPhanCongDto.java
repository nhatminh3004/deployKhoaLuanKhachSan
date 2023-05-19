package com.example.hotelserver.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
public class ThemChiTietPhanCongDto {
	private long maChiTietPhanCong;
	private long maCa;
	private List<Integer> thu;
}
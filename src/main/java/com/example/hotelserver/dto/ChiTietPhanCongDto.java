package com.example.hotelserver.dto;

import java.util.List;

import com.example.hotelserver.entity.CaLamViec;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
public class ChiTietPhanCongDto {
	private List<NhanVienMaChiTietPhanCongDto> dsNhanVienMaChiTietPhanCongDto; 
	private CaLamViec caLamViec;
	private int thu;
}

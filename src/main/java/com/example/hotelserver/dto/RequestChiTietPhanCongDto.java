package com.example.hotelserver.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
public class RequestChiTietPhanCongDto {
	private int thu;
	private Date  ngayHienTai;
}

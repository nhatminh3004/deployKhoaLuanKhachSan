package com.example.hotelserver.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
	private String hoTen;
	private String cccd;
	private String soDienThoai;
	private String diaChi;
	private String email;
	private String matKhau;
	
}

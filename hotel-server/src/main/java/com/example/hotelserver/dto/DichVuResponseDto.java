package com.example.hotelserver.dto;

import lombok.*;

import java.util.List;

@Setter @Getter
@ToString
@Builder
@Data
@AllArgsConstructor @NoArgsConstructor
public class DichVuResponseDto {
	private long maDichVu;
	private String tenDichVu;
	private long maLoaiDichVu;
	private String tenLoaiDichVu;
	private String donViLoaiDichVu;
	private double giaDichVu;
	private int soLuong;


}

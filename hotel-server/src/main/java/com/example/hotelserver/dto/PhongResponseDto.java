package com.example.hotelserver.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter @Getter
@ToString
@AllArgsConstructor @NoArgsConstructor
public class PhongResponseDto {
	private String maPhong;
	private String tenPhong;
	private boolean trangThaiPhong;
	private List<String> hinhAnhPhong;
	private String moTaPhong;
	private int maTang;
	private String tenTang;
	private long maLoaiPhong;
	private String tenLoaiPhong;
	private double giaPhong;
	private int sucChua;
	private boolean duocHutThuoc;
	private boolean mangThuCung;
	private int soGiuong;


}

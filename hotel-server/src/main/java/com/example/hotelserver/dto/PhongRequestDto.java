package com.example.hotelserver.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PhongRequestDto {
	private long maPhong;
    private String tenPhong;
    private String moTaPhong;
    private long maLoaiPhong;
    private int maTang;
    private boolean trangThaiPhong;
    private List<String> hinhAnhPhong;
}

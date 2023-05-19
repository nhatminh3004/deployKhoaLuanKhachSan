package com.example.hotelserver.dto;

import java.util.Date;
import java.util.List;

import com.example.hotelserver.entity.KhachHang;
import com.example.hotelserver.entity.TrangThaiDatPhong;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonFormat;

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
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
public class PhieuDatPhongDto{
	private long maPhieuDatPhong;
	
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Jakarta")
	private Date ngayDatPhong;
	
	private double giamGia;
	private String ghiChuDatPhong;
	
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Jakarta")
	private Date ngayNhanPhong;
	
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Jakarta")
	private Date ngayTraPhong;
	private TrangThaiDatPhong trangThaiDatPhong;
	private KhachHang khachHang;
	private List<PhongResponseDto> dsPhong;

}

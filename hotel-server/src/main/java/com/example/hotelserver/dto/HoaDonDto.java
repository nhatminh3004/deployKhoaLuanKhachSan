package com.example.hotelserver.dto;

import java.util.Date;
import java.util.List;

import com.example.hotelserver.entity.KhachHang;
import com.example.hotelserver.entity.NhanVien;
import com.example.hotelserver.entity.PhieuDatPhong;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;

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
public class HoaDonDto{
	private long maHoaDon;
	
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Jakarta")
	private Date ngayLap;
	
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Jakarta")
	private Date ngayNhanPhong;
	
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Jakarta")
	private Date ngayTraPhong;
	private double tienNhan;
//	private String hinhThucThanhToan;
	private PhieuDatPhong phieuDatPhong;
	private KhachHang khachHang;
	private NhanVien nhanVien;
	private List<ChiTietDichVuDto> dsChiTietDichVuDto;
	private List<PhongResponseDto> dsPhong;

}

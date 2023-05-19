package com.example.hotelserver.service;

import java.util.List;
import java.util.Map;

import com.example.hotelserver.dto.DatDichVuDto;
import com.example.hotelserver.dto.HoaDonDto;
import com.example.hotelserver.dto.TaoHoaDonRequestDto;
import org.springframework.web.bind.annotation.RequestBody;

public interface HoaDonService {
	boolean themHoaDon(TaoHoaDonRequestDto hoaDonDto);
//	List<PhieuDatPhongDto> layHoaDon();
	List<HoaDonDto> layHoaDonTheoNgay();
	List<HoaDonDto> layDanhSachHoaDonDeThongKeTheoPhong(@RequestBody Map<String, Object> request );
	List<HoaDonDto> layDanhSachHoaDonDeThongKeTheoNgay(@RequestBody Map<String, Object> request );
	List<HoaDonDto> layDanhSachHoaDonDeThongKeTheoPhongTheoThang(@RequestBody Map<String, Object> request );
	List<HoaDonDto> layHoaDonTheoNgayCCCD(String cccd);
	List<HoaDonDto> layHoaDonTheoTenPhong(String tenPhong);
	List<HoaDonDto> layHetHoaDon();
	List<HoaDonDto> timHoaDonTheoMa(long maHoaDon);
	List<HoaDonDto> layHetHoaDonTheoCCCD(String cccd);
	HoaDonDto datDichVu(long maHoaDon, List<DatDichVuDto> datDichVuDtos);
}	

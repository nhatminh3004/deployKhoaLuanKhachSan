package com.example.hotelserver.service;

import java.util.List;
import java.util.Map;

import com.example.hotelserver.dto.DatDichVuDto;
import com.example.hotelserver.dto.DatDichVuPhongDto;
import com.example.hotelserver.dto.HoaDonDto;
import com.example.hotelserver.dto.HoaDonPhongDichVuDto;
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
	List<HoaDonPhongDichVuDto> layHoaDonTheoTenPhong(String tenPhong);
	List<HoaDonDto> layHetHoaDon();
	List<HoaDonDto> timHoaDonTheoMa(long maHoaDon);
	List<HoaDonDto> layHetHoaDonTheoCCCD(String cccd);
	HoaDonPhongDichVuDto datDichVu(long maHoaDon, List<DatDichVuPhongDto> datDichVuDtos, String maPhong);
	
	List<HoaDonPhongDichVuDto> layHoaDonPhongTheoNgay();
	List<HoaDonPhongDichVuDto> timHoaDonPhongTheoMa(long maHoaDon);
	List<HoaDonPhongDichVuDto> layHetHoaDonPhong();
}	

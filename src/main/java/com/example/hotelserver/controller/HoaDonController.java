package com.example.hotelserver.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotelserver.dto.DatDichVuRequestDto;
import com.example.hotelserver.dto.HoaDonDto;
import com.example.hotelserver.dto.PhongResponseDto;
import com.example.hotelserver.dto.TaoHoaDonRequestDto;
import com.example.hotelserver.service.HoaDonService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/hoaDon")
public class HoaDonController {
	@Autowired
	private HoaDonService hoaDonService;
	
	@PostMapping
	public ResponseEntity<Boolean> themHoaDon(@RequestBody TaoHoaDonRequestDto hoaDonDto) {
		System.out.println(hoaDonDto.getNgayLap());
		if (hoaDonService.themHoaDon(hoaDonDto)) {
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		}
		return new ResponseEntity<Boolean>(false, HttpStatus.OK);
	}
	
	@GetMapping("/orderDate")
	public ResponseEntity<List<HoaDonDto>> layHoaDonTheoNgay() {
//		List<PhieuDatPhongDto> results = phieuDatPhongService.layPhieuDatPhongTheoNgay();
		return new ResponseEntity<List<HoaDonDto>>(hoaDonService.layHoaDonTheoNgay(), HttpStatus.OK);
	}
	
	@PostMapping("/searchByCCCD")
	public ResponseEntity<List<HoaDonDto>> layHoaDonTheoCCCD(@RequestBody Map<String, Object> request) {
//		List<PhieuDatPhongDto> results = phieuDatPhongService.layPhieuDatPhongTheoNgay();
		return new ResponseEntity<List<HoaDonDto>>(hoaDonService.layHoaDonTheoNgayCCCD(request.get("cccd").toString()), HttpStatus.OK);
	}
	
	@PostMapping("/datDichVu")
	public ResponseEntity<HoaDonDto> datDichVu(@RequestBody DatDichVuRequestDto request) {
		System.out.println(request.getMaHoaDon());
		System.out.println(request.getDsDichVu());
		HoaDonDto hoaDonDto = hoaDonService.datDichVu(request.getMaHoaDon()
				, request.getDsDichVu());
		if (hoaDonDto != null) {
			return new ResponseEntity<HoaDonDto>(hoaDonDto, HttpStatus.OK);
		}
		return new ResponseEntity<HoaDonDto>(new HoaDonDto(), HttpStatus.OK);
	}
	
	@PostMapping("/searchHoaDonForDichVu")
	public ResponseEntity<List<HoaDonDto>> layHoaDonTheoCCCDVaTenPhong(@RequestBody Map<String, Object> request) {
		List<HoaDonDto> hoaDonDto = hoaDonService.layHoaDonTheoNgayCCCD(request.get("keyword").toString());
		
		
		
		return new ResponseEntity<List<HoaDonDto>>(hoaDonService.layHoaDonTheoNgayCCCD(request.get("cccd").toString()), HttpStatus.OK);
	}
	
	@GetMapping
	public ResponseEntity<List<HoaDonDto>> layHetHoaDon() {
//		List<PhieuDatPhongDto> results = phieuDatPhongService.layPhieuDatPhongTheoNgay();
		return new ResponseEntity<List<HoaDonDto>>(hoaDonService.layHetHoaDon(), HttpStatus.OK);
	}
	
	@PostMapping("/searchHoaDon")
	public ResponseEntity<List<HoaDonDto>> timHoaDon(@RequestBody List<Map<String, Object>> request) {
		List<HoaDonDto> results = new ArrayList<>();
		if (!request.isEmpty()) {
			for (Map<String, Object> map : request) {
				if (map.get("theo").toString().equals("Theo mã hóa đơn") && !map.get("keyword").toString().trim().equals("")) {
					results = hoaDonService.timHoaDonTheoMa(Long.parseLong(map.get("keyword").toString()));
					if (results != null && !results.isEmpty()) {
						return new ResponseEntity<List<HoaDonDto>>(results, HttpStatus.OK);
					}
				} else if (map.get("theo").toString().equals("Theo cccd") && !map.get("keyword").toString().trim().equals("")) {
					results = hoaDonService.layHetHoaDonTheoCCCD(map.get("keyword").toString());
					if (results != null && !results.isEmpty()) {
						return new ResponseEntity<List<HoaDonDto>>(results, HttpStatus.OK);
					}
				}
			}
//			results = phongService.timPhongCustomQuery(query);
 		}
		return new ResponseEntity<List<HoaDonDto>>(results, HttpStatus.OK);
	}
	
	@PostMapping("/searchHoaDonByPhong")
	public ResponseEntity<List<HoaDonDto>> timHoaDon(@RequestBody Map<String, Object> request) {
		return new ResponseEntity<List<HoaDonDto>>(hoaDonService
				.layHoaDonTheoTenPhong(request.get("maPhong").toString()), HttpStatus.OK);
	}
}

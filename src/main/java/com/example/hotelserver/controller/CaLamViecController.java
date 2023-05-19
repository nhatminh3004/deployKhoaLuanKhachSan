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

import com.example.hotelserver.dto.ThemCaLamViecDto;
import com.example.hotelserver.entity.CaLamViec;
import com.example.hotelserver.service.CaLamViecService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/caLamViec")
public class CaLamViecController {
	@Autowired
	private CaLamViecService caLamViecService;
	
	@GetMapping
	public List<CaLamViec> layHetCaLamViec() {
		return caLamViecService.layTatCaCaLamViec();
	}
	
	@GetMapping("/orderByGioBatDau")
	public List<CaLamViec> layHetCaLamViecSapXepGioBatDau() {
		return caLamViecService.timCaLamViecSapXepGioBatDau();
	}
	
	@PostMapping
	public ResponseEntity<List<CaLamViec>> themCaLamViec(@RequestBody ThemCaLamViecDto caLamViecDto) {
		caLamViecDto.setGioBatDau(caLamViecDto.getGioBatDau().plusHours(7));
		caLamViecDto.setGioKetThuc(caLamViecDto.getGioKetThuc().plusHours(7));
//		if (!caLamViecService.kiemTraCaLamViecTonTaiTheoTen(caLamViecDto.getTenCa())) {
			if(caLamViecService.themCa(caLamViecDto)) {
				return new ResponseEntity<List<CaLamViec>>(caLamViecService.layTatCaCaLamViec(), HttpStatus.OK);
			}		
//		}
		return new ResponseEntity<List<CaLamViec>>(new ArrayList<>(), HttpStatus.OK);
	}
	
	@PostMapping("/timKiemCa")
	public ResponseEntity<List<CaLamViec>> timKiemTang(@RequestBody Map<String, Object> request) {
		List<CaLamViec> results = new ArrayList<>();
		if (request.get("theo").toString().equals("Theo tên")) {
			results = caLamViecService.timCaLamViecTheoTen(request.get("keyword").toString());
		} else if (request.get("theo").toString().equals("Theo mã")) {
			try {
				results.add(caLamViecService.timCaLamViecTheoMa(Long.parseLong(request.get("keyword").toString())));		
			} catch (Exception e) {
				System.out.println("Error when parse to int " + e);
			}
		}
		return new ResponseEntity<List<CaLamViec>>(results, HttpStatus.OK);
	}
	
}

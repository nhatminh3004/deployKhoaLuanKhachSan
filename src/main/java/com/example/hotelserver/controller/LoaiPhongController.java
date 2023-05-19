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

import com.example.hotelserver.entity.LoaiPhong;
import com.example.hotelserver.service.LoaiPhongService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/loaiPhong")
public class LoaiPhongController {
	@Autowired
	private LoaiPhongService loaiPhongService;

	@GetMapping
	public ResponseEntity<List<LoaiPhong>> layHetLoaiPhong() {
		List<LoaiPhong> results = loaiPhongService.layTatCaLoaiPhong();
		if (results.isEmpty() || results == null) {
			return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
		}
		return new ResponseEntity<>(results, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<List<LoaiPhong>> themLoaiPhong(@RequestBody LoaiPhong loaiPhong) {
		if (!loaiPhongService.kiemTraLoaiPhongTonTaiTheoTen(loaiPhong.getTenLoaiPhong())) {
			if(loaiPhongService.themLoaiPhong(loaiPhong)) {
				return new ResponseEntity<List<LoaiPhong>>(loaiPhongService.layTatCaLoaiPhong(), HttpStatus.OK);
			}		
		}
		return new ResponseEntity<List<LoaiPhong>>(new ArrayList<>(), HttpStatus.OK);
	}
	
	@PostMapping("/timKiemLoaiPhong")
	public ResponseEntity<List<LoaiPhong>> timKiemTang(@RequestBody Map<String, Object> request) {
		List<LoaiPhong> results = new ArrayList<>();
		if (request.get("theo").toString().equals("Theo tên")) {
			results = loaiPhongService.timLoaiPhongTheoTen(request.get("keyword").toString());
		} else if (request.get("theo").toString().equals("Theo mã")) {
			try {
				results.add(loaiPhongService.timLoaiPhongTheoMa(Long.parseLong(request.get("keyword").toString())));		
			} catch (Exception e) {
				System.out.println("Error when parse to int " + e);
				return new ResponseEntity<List<LoaiPhong>>(results, HttpStatus.OK);
			}
		}
		return new ResponseEntity<List<LoaiPhong>>(results, HttpStatus.OK);
	}
	
}

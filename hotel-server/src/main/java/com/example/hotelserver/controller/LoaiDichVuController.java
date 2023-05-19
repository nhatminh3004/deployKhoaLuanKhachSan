package com.example.hotelserver.controller;

import com.example.hotelserver.entity.LoaiDichVu;
import com.example.hotelserver.entity.LoaiPhong;
import com.example.hotelserver.service.LoaiDichVuService;
import com.example.hotelserver.service.LoaiPhongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/loaiDichVu")
public class LoaiDichVuController {
	@Autowired
	private LoaiDichVuService loaiDichVuService;

	@GetMapping
	public ResponseEntity<List<LoaiDichVu>> layHetLoaiDichVu() {
		List<LoaiDichVu> results = loaiDichVuService.layTatCaLoaiDichVu();
		if (results.isEmpty() || results == null) {
			return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
		}
		return new ResponseEntity<>(results, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<List<LoaiDichVu>> themLoaiDichVu(@RequestBody LoaiDichVu loaiDichVu) {
		System.out.println("Request :"+loaiDichVu);
		if (!loaiDichVuService.kiemTraLoaiDichVuTonTaiTheoTen(loaiDichVu.getTenLoaiDichVu())) {
			if(loaiDichVuService.themLoaiDichVu(loaiDichVu)) {
				return new ResponseEntity<List<LoaiDichVu>>(loaiDichVuService.layTatCaLoaiDichVu(), HttpStatus.OK);
			}
		}
		return new ResponseEntity<List<LoaiDichVu>>(new ArrayList<>(), HttpStatus.OK);
	}
	
	@PostMapping("/timKiemLoaiDichVu")
	public ResponseEntity<List<LoaiDichVu>> timKiemLoaiDichVu(@RequestBody Map<String, Object> request) {
		System.out.println("Request search loai Dich vu :"+request);
		List<LoaiDichVu> results = new ArrayList<>();
		if (request.get("theo").toString().equals("Theo tên loại dịch vụ")) {
			results = loaiDichVuService.timLoaiDichVuTheoTen(request.get("keyword").toString());
		} else if (request.get("theo").toString().equals("Theo mã loại dịch vụ")) {
			try {
				results.add(loaiDichVuService.timLoaiDichVuTheoMa(Long.parseLong(request.get("keyword").toString())));
			} catch (Exception e) {
				System.out.println("Error when parse to long " + e);
				return new ResponseEntity<List<LoaiDichVu>>(results, HttpStatus.OK);
			}
		}
		return new ResponseEntity<List<LoaiDichVu>>(results, HttpStatus.OK);
	}
	
}

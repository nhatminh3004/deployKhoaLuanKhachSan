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

import com.example.hotelserver.entity.Tang;
import com.example.hotelserver.service.TangService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/tang")
public class TangController {
	@Autowired
	private TangService tangService;
	
	@GetMapping
	public List<Tang> layHetTang() {
		return tangService.layTatCaTang();
	}
	
	@PostMapping
	public ResponseEntity<List<Tang>> themTang(@RequestBody Tang tang) {
		if (!tangService.kiemTraTangTonTaiTheoTen(tang.getTenTang())) {
			if(tangService.themTang(tang)) {
				return new ResponseEntity<List<Tang>>(tangService.layTatCaTang(), HttpStatus.OK);
			}		
		}
		return new ResponseEntity<List<Tang>>(new ArrayList<>(), HttpStatus.OK);
	}
	
	@PostMapping("/timKiemTang")
	public ResponseEntity<List<Tang>> timKiemTang(@RequestBody Map<String, Object> request) {
		List<Tang> results = new ArrayList<>();
		if (request.get("theo").toString().equals("Theo tên")) {
			results = tangService.timTangTheoTen(request.get("keyword").toString());
		} else if (request.get("theo").toString().equals("Theo mã")) {
			try {
				results.add(tangService.timTangTheoMa(Integer.parseInt(request.get("keyword").toString())));		
			} catch (Exception e) {
				System.out.println("Error when parse to int " + e);
			}
		}
		return new ResponseEntity<List<Tang>>(results, HttpStatus.OK);
	}
	
}

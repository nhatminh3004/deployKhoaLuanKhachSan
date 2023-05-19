package com.example.hotelserver.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotelserver.dto.BangLuongDto;
import com.example.hotelserver.service.BangLuongService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/bangLuong")
public class BangLuongController {
	@Autowired
	private BangLuongService bangLuongService;
	
	@PostMapping
	public List<BangLuongDto> getBangLuong(@RequestBody Map<String, Object> request) {
		List<BangLuongDto> dsBangLuongDto =bangLuongService.themBangLuong(Integer.parseInt(request.get("thang").toString())
				, Integer.parseInt(request.get("nam").toString()));
//		System.out.println(dsBangLuongDto);
		return dsBangLuongDto;
	}
	
	@PostMapping("/getByMaNhanVien")
	public List<BangLuongDto> getBangLuongTheoMaNhanVien(@RequestBody Long maNhanVien) {
		System.out.println(maNhanVien);
		List<BangLuongDto> dsBangLuongDto =bangLuongService.layBangLuongTheoMaNhanVien(maNhanVien);
		System.out.println(dsBangLuongDto);
		return dsBangLuongDto;
	}
}

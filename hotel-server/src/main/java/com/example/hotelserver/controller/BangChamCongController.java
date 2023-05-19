package com.example.hotelserver.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotelserver.dto.ThemBangChamCongDto;
import com.example.hotelserver.entity.BangChamCong;
import com.example.hotelserver.service.BangChamCongService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/bangChamCong")
public class BangChamCongController {
	@Autowired
	private BangChamCongService bangChamCongService;
	
	@PostMapping("/getByThuAndMaChiTietPhanCong")
	public BangChamCong getBangChamCongByThuAndMaChiTietPhanCong(@RequestBody Map<String, Object> request) {
		return bangChamCongService.layBangChamCongTheoThuVaMaChiTietPhanCong(Integer.parseInt(request.get("thu").toString())
				, Long.parseLong(request.get("maChiTietPhanCong").toString()));
	}
	
	@PostMapping("/themBangChamCong")
	public List<BangChamCong> themBangChamCong(@RequestBody List<ThemBangChamCongDto> dsBangChamCongDto) {
		return bangChamCongService.themBangChamCong(dsBangChamCongDto);
	}
}

package com.example.hotelserver.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotelserver.dto.BangPhanCongDto;
import com.example.hotelserver.dto.ChiTietPhanCongDto;
import com.example.hotelserver.dto.RequestChiTietPhanCongDto;
import com.example.hotelserver.dto.ThemBangPhanCongDto;
import com.example.hotelserver.entity.CaLamViec;
import com.example.hotelserver.entity.ChiTietPhanCong;
import com.example.hotelserver.entity.NhanVien;
import com.example.hotelserver.service.BangPhanCongService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/bangPhanCong")
public class BangPhanCongController {
	@Autowired
	private BangPhanCongService bangPhanCongService;
	
	@GetMapping
	public List<BangPhanCongDto> layHetBangPhanCong() {
		return bangPhanCongService.layHetBangPhanCong();
	}
	
	@PostMapping("/getByMaNhanVien")
	public BangPhanCongDto layBangPhanCongTheoMaNhanVien(@RequestBody long request) {
//		System.out.println(request.get("maNhanVien").toString());
		System.out.println(request);
		return bangPhanCongService.layHetBangPhanCongTheoMaNhanVien(request);
	}
	
	@PostMapping
	public BangPhanCongDto themBangPhanCong(@RequestBody ThemBangPhanCongDto request) {
		
//		System.out.println(request);
		List<ChiTietPhanCong> dsChiTietPhanCong = new ArrayList<>();
		for (Map<String, Object> chiTietPhanCongMap : request.getDsChiTietPhanCong()) {
//			System.out.println(chiTietPhanCongMap.get("duocChon").toString());
//			if (chiTietPhanCongMap.get("duocChon").toString() == "true") {
				ChiTietPhanCong chiTietPhanCong = ChiTietPhanCong.builder()
						.maChiTietPhanCong(Long.parseLong(chiTietPhanCongMap.get("maChiTietPhanCong").toString()))
						.caLamViec(CaLamViec.builder()
								.maCa(Long.parseLong(chiTietPhanCongMap.get("maCa").toString()))
								.build())
						.thu((List<Integer>) chiTietPhanCongMap.get("thu"))
						.build();
				dsChiTietPhanCong.add(chiTietPhanCong);	
//			}
		}
		NhanVien nv = new NhanVien(request.getMaNhanVien(), "", "", "", "", "", null, 0, null, null);
		BangPhanCongDto bangPhanCongDto = BangPhanCongDto.builder()
				.maBangPhanCong(request.getMaBangPhanCong())
				.ngayChinhSua(request.getNgayChinhSua())
				.ngayPhanCong(request.getNgayPhanCong())
				.nhanVien(nv)
				.ngayBatDau(request.getNgayBatDau())
				.dsChiTietPhanCong(dsChiTietPhanCong)
				.build();
		return bangPhanCongService.themBangPhanCong(bangPhanCongDto);
//		return null;
	}
	
	@PostMapping("/getDetailByThu")
	public List<ChiTietPhanCongDto> layBangPhanCongTheoThu(@RequestBody RequestChiTietPhanCongDto request) {
		return bangPhanCongService.layBangPhanCongTheoThu(request.getThu()
				, request.getNgayHienTai());
	}
}

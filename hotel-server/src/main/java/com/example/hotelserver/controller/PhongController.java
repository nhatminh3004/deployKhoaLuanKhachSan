package com.example.hotelserver.controller;

import java.util.ArrayList;
import java.util.Iterator;
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

import com.example.hotelserver.dto.PhongGetRequestOrderDto;
import com.example.hotelserver.dto.PhongResponseDto;
import com.example.hotelserver.entity.LoaiPhong;
import com.example.hotelserver.entity.Phong;
import com.example.hotelserver.entity.Tang;
import com.example.hotelserver.service.PhongService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/phong")
public class PhongController {
	@Autowired
	private PhongService phongService;

	@PostMapping("/sapXepTrangThai")
	public ResponseEntity<List<PhongResponseDto>> getAllPhongOrderByTrangThai(@RequestBody PhongGetRequestOrderDto request) {
		List<PhongResponseDto> dataFromQuery = phongService
				.layTatCaPhongSapXepTheoTrangThai(request.getNgayNhanPhong()
						, request.getNgayTraPhong());
		if (dataFromQuery == null ||dataFromQuery.isEmpty()) {
			return new ResponseEntity<>(null, HttpStatus.OK);
		}
		return new ResponseEntity<>(dataFromQuery, HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<List<PhongResponseDto>> getAllPhong() {
		List<PhongResponseDto> dataFromQuery = phongService.layTatCaPhong();
		if (dataFromQuery == null ||dataFromQuery.isEmpty()) {
			return new ResponseEntity<>(null, HttpStatus.OK);
		}
		return new ResponseEntity<>(dataFromQuery, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Boolean> savePhong(@RequestBody Map<String, Object> request) {
		try {
			Map<String, Object> phongRequestDto = (Map<String, Object>) request.get("phong");
			System.out.println(phongRequestDto);
			Phong phong = new Phong(phongRequestDto.get("maPhong").toString()
					, phongRequestDto.get("tenPhong").toString()
					, phongRequestDto.get("trangThaiPhong").toString().equals("true")
					, (List<String>) phongRequestDto.get("hinhAnhPhong")
					, phongRequestDto.get("moTaPhong").toString()
					, new Tang(Integer.parseInt(phongRequestDto.get("maTang").toString()), ""), 
					new LoaiPhong(Long.parseLong(phongRequestDto.get("maLoaiPhong").toString()), "", "")
					, Double.parseDouble(phongRequestDto.get("giaPhong").toString())
					, phongRequestDto.get("duocHutThuoc").toString().equals("true")
					, phongRequestDto.get("mangThuCung").toString().equals("true")
					, Integer.parseInt(phongRequestDto.get("soGiuong").toString())
					, Integer.parseInt(phongRequestDto.get("sucChua").toString())
					);
			if (phongService.themPhong(phong)) {
				return new ResponseEntity<Boolean>(true, HttpStatus.OK);
			}

		} catch (Exception e) {
			System.out.println("Error at savePhong " + e);
			return new ResponseEntity<Boolean>(false, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Boolean>(false, HttpStatus.OK);

	}
	@PostMapping("/xoaPhong")
	public ResponseEntity<Boolean> deletePhong(@RequestBody Map<String, Object> request) {
		if (phongService.xoaPhong(request.get("maPhongCu").toString())) {
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		}
		return new ResponseEntity<Boolean>(false, HttpStatus.OK);

	}
//	@PostMapping("/timKiemPhong")
//	public ResponseEntity<List<PhongResponseDto>> timKiemPhong(@RequestBody List<Map<String, Object>> request) {
//		List<PhongResponseDto> results = new ArrayList<>();
//		if (!request.isEmpty()) {
//			results = phongService.layTatCaPhong();
//			if (results.isEmpty()) {
//				return new ResponseEntity<List<PhongResponseDto>>(new ArrayList<>(), HttpStatus.OK);
//			}
//			for (Map<String, Object> map : request) {
//				if (map.get("theo").toString().equals("Theo tên") && !map.get("keyword").toString().trim().equals("")) {
//					List<PhongResponseDto> dsPhong = phongService.timPhongTheoTenLike(map.get("keyword").toString());
//					if (!dsPhong.isEmpty()) {
//						if (!results.isEmpty()) {
//							for (int j = 0; j < results.size(); j++) {
//								for (int i = 0; i < dsPhong.size(); i++) {
//									if (dsPhong.get(i).getMaPhong().equals(results.get(j).getMaPhong())) {
//										break;
//									}
//									if (i == dsPhong.size() - 1) {
//										results.remove(results.get(j));
//									}
//								}
//							}
//						}
//					}
//				} else if (map.get("theo").toString().equals("Theo mã") && !map.get("keyword").toString().trim().equals("")) {
//					List<PhongResponseDto> dsPhong = phongService.timPhongTheoMa(map.get("keyword").toString());
//					if (!dsPhong.isEmpty()) {
//						if (!results.isEmpty()) {
//							for (int j = 0; j < results.size(); j++) {
//								for (int i = 0; i < dsPhong.size(); i++) {
//									if (dsPhong.get(i).getMaPhong().equals(results.get(j).getMaPhong())) {
//										break;
//									}
//									if (i == dsPhong.size() - 1) {
//										results.remove(results.get(j));
//									}
//								}
//							}
//						}
//					}	
//				} else if (map.get("theo").toString().equals("Theo tầng") && !map.get("keyword").toString().trim().equals("")) {
//					List<PhongResponseDto> dsPhong = phongService.timPhongTheoMaTang(Integer.parseInt(map.get("keyword").toString()));
//					if (!dsPhong.isEmpty()) {
//						if (!results.isEmpty()) {
//							for (int j = 0; j < results.size(); j++) {
//								for (int i = 0; i < dsPhong.size(); i++) {
//									if (dsPhong.get(i).getMaPhong().equals(results.get(j).getMaPhong())) {
//										break;
//									}
//									if (i == dsPhong.size() - 1) {
//										results.remove(results.get(j));
//									}
//								}
//							}
//						}
//					}
//				} else if (map.get("theo").toString().equals("Theo loại phòng") && !map.get("keyword").toString().trim().equals("")) {
//					List<PhongResponseDto> dsPhong = phongService.timPhongTheoMaLoaiPhong(Long.parseLong(map.get("keyword").toString()));
//					if (!dsPhong.isEmpty()) {
//						if (!results.isEmpty()) {
//							for (int j = 0; j < results.size(); j++) {
//								for (int i = 0; i < dsPhong.size(); i++) {
//									if (dsPhong.get(i).getMaPhong().equals(results.get(j).getMaPhong())) {
//										break;
//									}
//									if (i == dsPhong.size() - 1) {
//										results.remove(results.get(j));
//									}
//								}
//							}
//						}
//					}
//				}
//			}
//		}
//		System.out.println(results);
//		return new ResponseEntity<List<PhongResponseDto>>(results, HttpStatus.OK);
//	}

	
	@PostMapping("/timKiemPhong")
	public ResponseEntity<List<PhongResponseDto>> timKiemPhong(@RequestBody List<Map<String, Object>> request) {
		List<PhongResponseDto> results = new ArrayList<>();
		String query = "select ma_phong from phong"; 
		List<String> conditions = new ArrayList<>();
		if (!request.isEmpty()) {
			for (Map<String, Object> map : request) {
				if (map.get("theo").toString().equals("Theo tên") && !map.get("keyword").toString().trim().equals("")) {
					conditions.add("ten_phong like '%" + map.get("keyword").toString()+ "%'");
				} else if (map.get("theo").toString().equals("Theo mã") && !map.get("keyword").toString().trim().equals("")) {
					conditions.add("ma_phong = '" + map.get("keyword").toString() + "'");
				} else if (map.get("theo").toString().equals("Theo tầng") && !map.get("keyword").toString().trim().equals("")) {
					conditions.add("ma_tang = " + map.get("keyword").toString());
				} else if (map.get("theo").toString().equals("Theo loại phòng") && !map.get("keyword").toString().trim().equals("")) {
					conditions.add("ma_loai_phong = " + map.get("keyword").toString());
				}
			}
			if (!conditions.isEmpty()) {
				query += " where ";
				for (int i = 0; i < conditions.size(); i++) {
					query += conditions.get(i);
					if (i != conditions.size() - 1) {
						query += " and ";
					}
					
				}
			}
			results = phongService.timPhongCustomQuery(query);
 		}
		return new ResponseEntity<List<PhongResponseDto>>(results, HttpStatus.OK);
	}
}

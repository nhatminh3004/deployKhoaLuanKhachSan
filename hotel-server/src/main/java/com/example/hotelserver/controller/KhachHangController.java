package com.example.hotelserver.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.example.hotelserver.dto.PhongResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotelserver.entity.KhachHang;
import com.example.hotelserver.service.KhachHangService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(path= "/api/khachhang")
@RequiredArgsConstructor
public class KhachHangController {
    @Autowired
    private KhachHangService khachHangService;

    @GetMapping
    public List<KhachHang> getAllKhachHang() {
        return khachHangService.layAllDanhSachKhachHang();
    }

    @PostMapping
    public ResponseEntity<List<KhachHang>> themKhachHang(@RequestBody KhachHang khachHang) {
        System.out.println("Request Khach Hang nhan :" + khachHang);
        //Nếu khách hàng đó chưa tồn tại
        var a = khachHangService.kiemtraKhachHangTonTai(khachHang.getCccdKhachHang());

        if (!a) {
            if (khachHangService.themKhachHang(khachHang)) {
                return new ResponseEntity<List<KhachHang>>(khachHangService.layAllDanhSachKhachHang(), HttpStatus.OK);
            }
        }
        return new ResponseEntity<List<KhachHang>>(new ArrayList<>(), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<List<KhachHang>> capnhatKhachHang(@RequestBody KhachHang khachHang) {
        if (khachHangService.themKhachHang(khachHang)) {
            return new ResponseEntity<List<KhachHang>>(khachHangService.layAllDanhSachKhachHang(), HttpStatus.OK);
        }
        return new ResponseEntity<List<KhachHang>>(khachHangService.layAllDanhSachKhachHang(), HttpStatus.OK);


    }
    @PostMapping("/timKiemKhachHangCCCD")
    public ResponseEntity<List<KhachHang>> timKiemKhachHangCCCD(@RequestBody Map<String, Object> request) {
        List<KhachHang> results = new ArrayList<>();
        if (request.get("theo").toString().equals("Theo họ tên")) {
            results = khachHangService.timKhachHangTheoTen(request.get("keyword").toString());
        } else if (request.get("theo").toString().equals("Theo căn cước công dân")) {
            try {
                results.add(khachHangService.timKhachHangTheoCCCD(request.get("keyword").toString()));
            } catch (Exception e) {
                System.out.println("Error Khach Hang " + e);
            }
        }
        return new ResponseEntity<List<KhachHang>>(results, HttpStatus.OK);
    }
    @PostMapping("/timKiemKhachHang")
    public ResponseEntity<List<KhachHang>> timKhachHangCustomeQuery(@RequestBody List<Map<String, Object>> request) {
        List<KhachHang> results = new ArrayList<>();
        String query = "select ma_khach_hang from khach_hang";
        List<String> conditions = new ArrayList<>();
        if (!request.isEmpty()) {
            for (Map<String, Object> map : request) {
                if (map.get("theo").toString().equals("Theo tên") && !map.get("keyword").toString().trim().equals("")) {
                    conditions.add("ho_ten like '%" + map.get("keyword").toString()+ "%'");
                } else if (map.get("theo").toString().equals("Theo mã") && !map.get("keyword").toString().trim().equals("")) {
                    conditions.add("ma_khach_hang = " + map.get("keyword").toString());
                } else if (map.get("theo").toString().equals("Theo số điện thoại") && !map.get("keyword").toString().trim().equals("")) {
                    conditions.add("so_dien_thoai_kh = '" + map.get("keyword").toString() + "'");
                } else if (map.get("theo").toString().equals("Theo địa chỉ") && !map.get("keyword").toString().trim().equals("")) {
                    conditions.add("dia_chi_kh  like '%" + map.get("keyword").toString()+ "%'");
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
            results = khachHangService.timKhachHangCustomeQuey(query);
        }
        return new ResponseEntity<List<KhachHang>>(results, HttpStatus.OK);
    }
}


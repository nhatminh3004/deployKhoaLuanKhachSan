package com.example.hotelserver.controller;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.example.hotelserver.dto.ThongKeSoLanDatPhongDto;
import com.example.hotelserver.entity.KhachHang;
import com.example.hotelserver.entity.NhanVien;
import com.example.hotelserver.entity.TaiKhoan;
import com.example.hotelserver.entity.VaiTro;
import com.example.hotelserver.repository.ChiTietPhieuDatPhongRepo;
import com.example.hotelserver.repository.NhanVienRepo;
import com.example.hotelserver.repository.TaiKhoanRepo;
import com.example.hotelserver.repository.VaiTroRepo;
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

import com.example.hotelserver.dto.NhanVienDto;
import com.example.hotelserver.service.NhanVienService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(path= "/api/nhanvien")
@RequiredArgsConstructor
public class NhanVienController {
    @Autowired
    private NhanVienService employeeService;
    @Autowired
    private ChiTietPhieuDatPhongRepo chiTietPhieuDatPhongRepo;
    @Autowired
    private VaiTroRepo vaiTroRepo;
    @Autowired
    private TaiKhoanRepo taiKhoanRepo;
    @Autowired
    private NhanVienRepo employeeRepo;
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getALLInfoNhanVien() {
        List<Map<String, Object>> dataFromQuery = employeeService.getAllInfoNhanVienWithAccount();
        if (dataFromQuery == null ||dataFromQuery.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
        return new ResponseEntity<>(dataFromQuery, HttpStatus.OK);
    }
//    @PostMapping("/timKiemNhanVien")
//    public ResponseEntity<List<Map<String, Object>>> timNhanVien(@RequestBody Map<String, Object> request) {
//        List<Map<String, Object>> dataFromQuery = new ArrayList<>();
//        if (request.get("theo").toString().equals("Theo họ tên")) {
//             dataFromQuery = employeeService.getAllInfoNhanVienWithAccountByHoTen(request.get("keyword").toString());
//
//        } else if (request.get("theo").toString().equals("Theo số điện thoại")) {
//            try {
//               dataFromQuery = employeeService.getAllInfoNhanVienWithAccountByPhone(request.get("keyword").toString());
//            } catch (Exception e) {
//                System.out.println("Error tim nhan vien " + e);
//            }
//        }
//        return new ResponseEntity<>(dataFromQuery, HttpStatus.OK);
//    }
    @PostMapping("/timKiemNhanVien")
    public ResponseEntity<List<NhanVienDto>> timNhanVienDTOCustomeQuery(@RequestBody List<Map<String, Object>> request) {
        List<NhanVienDto> results = new ArrayList<>();
        String query = "select ma_nhan_vien from nhan_vien";
        List<String> conditions = new ArrayList<>();
        if (!request.isEmpty()) {
            for (Map<String, Object> map : request) {
                if (map.get("theo").toString().equals("Theo tên") && !map.get("keyword").toString().trim().equals("")) {
                    conditions.add("ho_ten like '%" + map.get("keyword").toString()+ "%'");
                } else if (map.get("theo").toString().equals("Theo mã") && !map.get("keyword").toString().trim().equals("")) {
                    conditions.add("ma_nhan_vien = " + map.get("keyword").toString());
                } else if (map.get("theo").toString().equals("Theo số điện thoại") && !map.get("keyword").toString().trim().equals("")) {
                    conditions.add("so_dien_thoai like '" + map.get("keyword").toString() + "'");
                } else if (map.get("theo").toString().equals("Theo địa chỉ") && !map.get("keyword").toString().trim().equals("")) {
                    conditions.add("dia_chi  like '%" + map.get("keyword").toString()+ "%'");
                }
                else if (map.get("theo").toString().equals("Theo tình trạng tài khoản") && !map.get("keyword").toString().trim().equals("")) {
                    conditions.add("ma_tai_khoan in (select nv.ma_nhan_vien from nhan_vien nv JOIN tai_khoan tk on nv.ma_tai_khoan=tk.ma_tai_khoan where tk.da_kich_hoat = '"+map.get("keyword").toString() + "')" );
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
            results = employeeService.timNhanVienCustomQuery(query);
        }
        return new ResponseEntity<List<NhanVienDto>>(results, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<String> themMoiNhanVien(@RequestBody NhanVienDto request) {
        System.out.println("Request them nhan vien controller nhận vào : "+request);
        var a = employeeService.checkNhanVienExist(request.getSoDienThoai(),request.getCccd());
        if(a){
            String token = employeeService.themMoiNhanVien(request);
            if (token == null) {
                return ResponseEntity.ok("Username or Identification already exist");
            }
            else   return ResponseEntity.ok(token);
        }
        else {
            return ResponseEntity.ok("Nhân viên đã tồn tại trong hệ thống");
        }
    }
    @PutMapping
    public ResponseEntity<String> updateNhanVien(@RequestBody NhanVienDto request) {
        System.out.println("Request update nhan vien controller nhận vào : "+request);


            String result = employeeService.capnhatNhanVien(request);
            if (result != null) {
                return ResponseEntity.ok("Update Success");
            }
            else   return ResponseEntity.ok("Update Fail");


    }





}

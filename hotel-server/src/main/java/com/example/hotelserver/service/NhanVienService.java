package com.example.hotelserver.service;

import com.example.hotelserver.dto.NhanVienDto;
import com.example.hotelserver.dto.PhongResponseDto;
import com.example.hotelserver.entity.NhanVien;

import java.util.List;
import java.util.Map;

public interface NhanVienService {
    List<Map<String, Object>> getAllInfoNhanVienWithAccount();
    List<Map<String,Object>> getAllInfoNhanVienWithAccountByHoTen(String tenNhanVien);
    List<Map<String,Object>> getAllInfoNhanVienWithAccountByPhone(String phone);
    NhanVien findBySoDienThoai (String phone);
    NhanVien findByCCCD (String cccd);
    public String themMoiNhanVien(NhanVienDto request);
    public boolean checkNhanVienExist(String sdt, String cccd);
    public String capnhatNhanVien(NhanVienDto request);
    public List<NhanVienDto> timNhanVienCustomQuery(String query);
}

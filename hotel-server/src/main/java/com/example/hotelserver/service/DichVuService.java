package com.example.hotelserver.service;

import java.util.List;

import com.example.hotelserver.dto.DichVuResponseDto;
import com.example.hotelserver.dto.PhongResponseDto;
import com.example.hotelserver.entity.DichVu;

public interface DichVuService {
    List<DichVu> layAllDanhSachDichVu();
    boolean themDichVu(DichVu dichVu);
    boolean kiemtraDichVuTonTai(String tenDichVu,double giaDichVu);
    List<DichVu> timDichVuTheoTen(String tenDichVu);
    DichVu timDichVuTheoMa(long maDichVu);
    public List<DichVuResponseDto> layTatCaDichVuAndLoaiDichVu();
}

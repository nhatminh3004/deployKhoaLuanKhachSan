package com.example.hotelserver.service;

import java.util.List;

import com.example.hotelserver.dto.PhieuDatPhongDto;
import com.example.hotelserver.dto.ThemPhieuDto;

public interface PhieuDatPhongService {
	boolean themPhieuDatPhong(ThemPhieuDto phieuDatPhongDto);
	List<PhieuDatPhongDto> layPhieuDatPhong();
	List<PhieuDatPhongDto> layPhieuDatPhongTheoNgay();
	List<PhieuDatPhongDto> layPhieuDatPhongTheoNgayCCCD(String cccd);

}

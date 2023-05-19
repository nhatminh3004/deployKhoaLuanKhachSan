package com.example.hotelserver.service;

import com.example.hotelserver.entity.DichVu;
import com.example.hotelserver.entity.KhachHang;

import java.util.List;

public interface KhachHangService {
	KhachHang findByGuestIdentification(String guestIdentification);
	KhachHang findByGuestPhoneNumber(String guestPhoneNumber);
	List<KhachHang> layAllDanhSachKhachHang();
	boolean themKhachHang(KhachHang kh);
	boolean kiemtraKhachHangTonTai(String cccdKhachHang);
	List<KhachHang> timKhachHangTheoTen(String tenKhachHang);
	KhachHang timKhachHangTheoCCCD(String cccdKhachHang);
	List<KhachHang> timKhachHangCustomeQuey(String query);

}

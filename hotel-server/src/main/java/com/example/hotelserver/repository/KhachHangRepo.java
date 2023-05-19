package com.example.hotelserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.hotelserver.entity.KhachHang;

public interface KhachHangRepo extends JpaRepository<KhachHang, Integer>,CustomRepoKhachHang {
	KhachHang findByCccdKhachHang(String cccdKhachHang);
	KhachHang findBySoDienThoaiKH(String soDienThoaiKH);
	KhachHang findByMaKhachHang(int maKhachHang);
	@Query(nativeQuery = true, value = ("select * from khach_hang "))
	List<KhachHang> layAllDanhSachKhachHang();
	@Query(nativeQuery = true, value = "select * from khach_hang kh where kh.cccd_khach_hang= :cccdKhachHang AND kh.so_dien_thoai_kh= :soDienThoaiKH")
	KhachHang timKhachHangBangCCCDVaSoDienThoai(@Param("cccdKhachHang") String cccdKhachHang, @Param("soDienThoaiKH") String soDienThoaiKH);
	@Query(nativeQuery = true, value = "select * from khach_hang kh where kh.ho_ten like %:ho_ten%")
	List<KhachHang> findByTenKhachHang(@Param("ho_ten") String ho_ten);
	
	@Query(nativeQuery = true, value = "select * from khach_hang kh where kh.cccd_khach_hang = :cccdKhachHang")
	KhachHang timKhachHangBangCCCD(@Param("cccdKhachHang") String cccdKhachHang);

}

package com.example.hotelserver.repository;

import java.util.List;

import com.example.hotelserver.entity.KhachHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.NhanVien;

@Repository
public interface NhanVienRepo extends JpaRepository<NhanVien, Long>,CustomRepoNhanVien{
	NhanVien findBySoDienThoai(String soDienThoai);
	NhanVien findByCccd(String cccd);
	
	@Query(nativeQuery = true, value = ("select * from nhan_vien "))
    List<NhanVien> getAllNhanVien();
	@Query(nativeQuery = true, value = "select * from nhan_vien nv where nv.ho_ten like %:ho_ten%")
	List<NhanVien> timNhanVienBangHoTen(@Param("ho_ten") String ho_ten);
}

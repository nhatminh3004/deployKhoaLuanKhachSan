package com.example.hotelserver.repository;

import java.util.*;

import com.example.hotelserver.dto.NhanVienTestDTO;
import com.example.hotelserver.dto.ThongKeSoLanDatPhongDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.ChiTietPhieuDatPhong;
import com.example.hotelserver.entity.ChiTietPhieuDatPhongPK;

@Repository
public interface ChiTietPhieuDatPhongRepo extends JpaRepository<ChiTietPhieuDatPhong, ChiTietPhieuDatPhongPK> {
	@Query(nativeQuery = true, value = "select * from chi_tiet_phieu_dat_phong ctpdp where "
			+ "ctpdp.ma_phieu_dat_phong = :maPhieuDatPhong "
			+ "and ctpdp.ma_phong = :maPhong")
	ChiTietPhieuDatPhong layChiTietPhieuDatTheoMa(@Param("maPhieuDatPhong") long maPhieuDatPhong
			, @Param("maPhong") long maPhong);
	
	@Query(nativeQuery = true, value = "select * from chi_tiet_phieu_dat_phong ctpdp where "
			+ "ctpdp.ma_phieu_dat_phong = :maPhieuDatPhong ")
	List<ChiTietPhieuDatPhong> layChiTietPhieuDatThepMaPhiet(@Param("maPhieuDatPhong") long maPhieuDatPhong);

	@Query(name = "thongKePhongWithSoLuongPhong", nativeQuery = true)
	List<ThongKeSoLanDatPhongDto> getThongKeSoLanDatPhong(@Param("start") Date start
			, @Param("end") Date end);
	@Query(name = "findAllNhanVienWithTaiKhoan",nativeQuery = true)
	List<NhanVienTestDTO> getNhanVienTestDTO(@Param("param") String param);
}

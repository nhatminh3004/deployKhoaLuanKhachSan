package com.example.hotelserver.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.BangPhanCong;

@Repository
public interface BangPhanCongRepo extends JpaRepository<BangPhanCong, Long> {
	@Query(nativeQuery = true, value = "select * from bang_phan_cong bpc "
			+ "where bpc.ma_nhan_vien = :maNhanVien")
	BangPhanCong findBangPhanCongTheoNhanVien(@Param("maNhanVien") long maNhanVien);
	
	@Query(nativeQuery = true, value = "select * from bang_phan_cong bpc "
			+ "where bpc.ngay_bat_dau <= :ngay")
	List<BangPhanCong> getBangPhanCongTheoNgayBatDau(@Param("ngay") Date ngay);
}

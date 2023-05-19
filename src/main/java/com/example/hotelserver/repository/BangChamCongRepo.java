package com.example.hotelserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.BangChamCong;

@Repository
public interface BangChamCongRepo extends JpaRepository<BangChamCong, Long> {
	@Query(nativeQuery = true, value = "select * from bang_cham_cong bcc "
			+ "where bcc.thu = :thu and bcc.ma_chi_tiet_phan_cong = :maChiTietPhanCong "
			+ "and day(ngay_cham_cong) = :ngay "
			+ "and month(ngay_cham_cong) = :thang "
			+ "and year(ngay_cham_cong) = :nam ")
	BangChamCong findBangChamCongByThuAndMaChiTiet(@Param("thu") int thu, @Param("maChiTietPhanCong") long maChiTietPhanCong
			, @Param("ngay") int ngay
			, @Param("thang") int thang
			, @Param("nam") int nam);
	
	@Query(nativeQuery = true, value = "select * from bang_cham_cong bcc "
			+ "where month(ngay_cham_cong) = :thang "
			+ "and year(ngay_cham_cong) = :nam and ma_nhan_vien = :maNhanVien")
	List<BangChamCong> findBangChamCongByThangAndNamAndMaNhanVien(@Param("thang") int thang
			, @Param("nam") int nam
			, @Param("maNhanVien") long maNhanVien);
}

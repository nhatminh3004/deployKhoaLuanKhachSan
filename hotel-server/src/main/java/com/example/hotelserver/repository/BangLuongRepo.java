package com.example.hotelserver.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.BangLuong;

@Repository
public interface BangLuongRepo extends JpaRepository<BangLuong, String> {
	@Query(nativeQuery = true, value = "select ma_bang_luong as maBangLuong, thang, nam, ma_nhan_vien as maNhanVien from bang_luong where thang = :thang and nam = :nam")
	List<Map<String, Object>> findBangLuongByThangAndNam(@Param("thang") int thang, @Param("nam") int nam);
	
	@Query(nativeQuery = true, value = "select ma_bang_luong as maBangLuong, thang, nam, ma_nhan_vien as maNhanVien from bang_luong where thang = :thang and nam = :nam and ma_nhan_vien = :maNhanVien")
	Map<String, Object> findBangLuongByThangAndNamAndMaNhanVien(@Param("thang") int thang, @Param("nam") int nam, @Param("maNhanVien") long maNhanVien);

	@Query(nativeQuery = true, value = "select ma_bang_luong as maBangLuong, thang, nam, ma_nhan_vien as maNhanVien from bang_luong where ma_nhan_vien = :maNhanVien")
	List<Map<String, Object>> findBangLuongByMaNhanVien(@Param("maNhanVien") long maNhanVien);
}

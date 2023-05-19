package com.example.hotelserver.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.ChiTietBangLuong;

@Repository
public interface ChiTietBangLuongRepo extends JpaRepository<ChiTietBangLuong, Long> {
	@Query(nativeQuery = true, value = "select ma_chi_tiet_bang_luong as maChiTietBangLuong, ma_bang_cham_cong as maBangChamCong, ma_bang_luong as maBangLuong from chi_tiet_bang_luong where ma_bang_luong = :maBangLuong")
	List<Map<String, Object>> findChiTietBangLuongByMaBangLuong(@Param("maBangLuong") String maBangLuong);
	
	@Query(nativeQuery = true, value = "select ma_chi_tiet_bang_luong as maChiTietBangLuong"
			+ ", ma_bang_cham_cong as maBangChamCong, ma_bang_luong as maBangLuong "
			+ "from chi_tiet_bang_luong "
			+ "where ma_bang_cham_cong = :maBangChamCong")
	Map<String, Object> findChiTietBangLuongByBangChamCong(@Param("maBangChamCong") long maBangChamCong);
}

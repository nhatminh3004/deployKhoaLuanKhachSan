package com.example.hotelserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.ChiTietPhanCong;

@Repository
public interface ChiTietPhanCongRepo extends JpaRepository<ChiTietPhanCong, Long> {
	
	@Query(nativeQuery = true, value = "select * from chi_tiet_phan_cong ctpc "
			+ "where ctpc.ma_bang_phan_cong = :maBangPhanCong")
	List<ChiTietPhanCong> findByMaBangPhanCong(@Param("maBangPhanCong") long maBangPhanCong);
	
//	@Query(nativeQuery = true, value = "select thu from thu t "
//			+ "where t.ma_chi_tiet_phan_cong = :maChiTietPhanCong")
//	List<Integer> findThuByMaPhanCong(@Param("maChiTietPhanCong") long maChiTietPhanCong);
	
}

package com.example.hotelserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.LoaiPhong;

@Repository
public interface LoaiPhongRepo extends JpaRepository<LoaiPhong, Long>{
	LoaiPhong findByTenLoaiPhong(String tenLoaiPhong);
	
	@Query(nativeQuery = true, value = "select * from loai_phong lp where lp.ten_loai_phong like %:tenLoaiPhong%")
	List<LoaiPhong> findByTenLoaiPhongLike(@Param("tenLoaiPhong") String tenLoaiPhong);
}

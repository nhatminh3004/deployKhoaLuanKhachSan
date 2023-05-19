package com.example.hotelserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.Phong;

@Repository
public interface PhongRepo extends JpaRepository<Phong, String>, CustomRepo{
	@Query(nativeQuery = true, value = ("select * from phong where trang_thai_phong = 1"))
	List<Phong> getRoomsOrderByState();
	
	@Query(nativeQuery = true, value = "select * from phong p where p.ten_phong like %:tenPhong%")
	List<Phong> findByTenPhongLike(@Param("tenPhong") String tenPhong);
	
	Phong findByTenPhong(String tenPhong);
	
	@Query(nativeQuery = true, value = "select * from phong p where p.ma_tang = :maTang")
	List<Phong> findByMaTang(@Param("maTang") int maTang);
	
	@Query(nativeQuery = true, value = "select * from phong p where p.ma_loai_phong = :maLoaiPhong")
	List<Phong> findByMaLoaiPhong(@Param("maLoaiPhong") long maLoaiPhong);
	
}

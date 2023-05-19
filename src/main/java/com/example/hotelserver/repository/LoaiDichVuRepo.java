package com.example.hotelserver.repository;

import com.example.hotelserver.entity.LoaiDichVu;
import com.example.hotelserver.entity.LoaiPhong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoaiDichVuRepo extends JpaRepository<LoaiDichVu, Long>{
	LoaiDichVu findByTenLoaiDichVu(String tenLoaiDichVu);
	
	@Query(nativeQuery = true, value = "select * from loai_dich_vu dv where dv.ten_loai_dich_vu like %:tenLoaiDichVu%")
	List<LoaiDichVu> findByTenLoaiDichVuLike(@Param("tenLoaiDichVu") String tenLoaiDichVu);
}

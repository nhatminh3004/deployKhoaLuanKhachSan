package com.example.hotelserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.CaLamViec;

@Repository
public interface CaLamViecRepo extends JpaRepository<CaLamViec, Long>{ 
	CaLamViec findByTenCa(String tenCa);
	
	@Query(nativeQuery = true, value = "select * from ca_lam_viec c where c.ten_ca like %:tenCa%")
	List<CaLamViec> findByTenCaLike(@Param("tenCa") String tenCa);
	
	@Query(nativeQuery = true, value = "select * from ca_lam_viec c order by c.gio_bat_dau")
	List<CaLamViec> findAllOrderByGioBatDau();
}

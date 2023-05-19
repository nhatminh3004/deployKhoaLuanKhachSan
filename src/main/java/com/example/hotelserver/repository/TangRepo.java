package com.example.hotelserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.Tang;

@Repository
public interface TangRepo extends JpaRepository<Tang, Integer>{ 
	Tang findByTenTang(String tenTang);
	
	@Query(nativeQuery = true, value = "select * from tang t where t.ten_tang like %:tenTang%")
	List<Tang> findByTenTangLike(@Param("tenTang") String tenTang);
}

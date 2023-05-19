package com.example.hotelserver.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.hotelserver.entity.TaiKhoan;



public interface TaiKhoanRepo extends JpaRepository<TaiKhoan, Long> {
	@Query(nativeQuery = true, value = "select * from tai_khoan tk where tk.ten_tai_khoan=:tenTaiKhoan")
	Optional<TaiKhoan> findByTenTaiKhoan(@Param("tenTaiKhoan") String tenTaiKhoan);
	TaiKhoan findTaiKhoansByMaTaiKhoan(long maTaiKhoan);
}

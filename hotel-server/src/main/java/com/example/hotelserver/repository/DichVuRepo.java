package com.example.hotelserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.DichVu;

import jakarta.transaction.Transactional;

@Repository
public interface DichVuRepo extends JpaRepository<DichVu, Long> {
    @Query(nativeQuery = true, value = ("select * from dich_vu "))
    List<DichVu>layAllDanhSachDichVu();
    @Query(nativeQuery = true,value = "select * from dich_vu dv where dv.ten_dich_vu= :tenDichVu and dv.gia_dich_vu= :giaDichVu")
    DichVu findByTenAndGiaDichVu(@Param("tenDichVu") String tenDichVu ,@Param("giaDichVu") double giaDichVu);
    @Query(nativeQuery = true, value = "select * from dich_vu dv where dv.ten_dich_vu like %:tenDichVu%")
    List<DichVu> findByTenDichVuLike(@Param("tenDichVu") String tenDichVu);
    
    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "update dich_vu set so_luong = :soLuong  where ma_dich_vu = :maDichVu")
    void updateSoLuongTonDichVu(@Param("maDichVu") long maDichVu , @Param("soLuong") int soLuong);
}

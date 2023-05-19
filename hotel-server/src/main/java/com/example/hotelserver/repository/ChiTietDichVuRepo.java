package com.example.hotelserver.repository;

import com.example.hotelserver.dto.ThongKeSoLanDatDichVuDto;
import com.example.hotelserver.dto.ThongKeSoLanDatPhongDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.ChiTietDichVu;
import com.example.hotelserver.entity.ChiTietDichVuPK;

import java.util.Date;
import java.util.List;

@Repository
public interface ChiTietDichVuRepo extends JpaRepository<ChiTietDichVu, ChiTietDichVuPK> {
    @Query(name = "thongKeDichVuWithSoLuongDichVu", nativeQuery = true)
    List<ThongKeSoLanDatDichVuDto> getThongKeSoLanDatDichVu(@Param("start") Date start
            , @Param("end") Date end);

}

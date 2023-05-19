package com.example.hotelserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.ChiTietHoaDon;
import com.example.hotelserver.entity.ChiTietHoaDonPK;

@Repository
public interface ChiTietHoaDonRepo extends JpaRepository<ChiTietHoaDon, ChiTietHoaDonPK> {
	@Query(nativeQuery = true, value = "select * from chi_tiet_hoa_don cthd "
			+ "where cthd.ma_phong = :maPhong")
	List<ChiTietHoaDon> layChiTietHoaDonTheoPhong(@Param("maPhong") String maPhong);
}

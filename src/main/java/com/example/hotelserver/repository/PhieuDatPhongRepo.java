package com.example.hotelserver.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.PhieuDatPhong;

@Repository
public interface PhieuDatPhongRepo extends JpaRepository<PhieuDatPhong, Long> {
	@Query(nativeQuery = true, value = "select ma_phieu_dat_phong from phieu_dat_phong pdp "
			+ "where pdp.trang_thai_dat_phong != 'HUY' "
			+ "and (pdp.ngay_nhan_phong between :ngayNhanPhong and :ngayTraPhong "
			+ "or pdp.ngay_tra_phong between :ngayNhanPhong and :ngayTraPhong "
			+ "or :ngayNhanPhong between pdp.ngay_nhan_phong and pdp.ngay_tra_phong "
			+ "or :ngayTraPhong between pdp.ngay_nhan_phong and pdp.ngay_tra_phong)")
	List<Long> layMaPhieuTheoNgayNhanNgayTra(@Param("ngayNhanPhong") Date ngayNhanPhong
			, @Param("ngayTraPhong") Date ngayTraPhong);
	
	@Query(nativeQuery = true, value = "select p.ma_phong "
			+ "from phong p inner join chi_tiet_phieu_dat_phong ctpdp "
			+ "on p.ma_phong = ctpdp.ma_phong "
			+ "where ctpdp.ma_phieu_dat_phong = :maPhieuDatPhong")
	List<String> layMaPhongTuMaPhieu(@Param("maPhieuDatPhong") long maPhieuDatPhong);
	
	@Query(nativeQuery = true, value = "select * from phieu_dat_phong "
			+ "where trang_thai_dat_phong = 'MOI_DAT' "
			+ "order by ngay_nhan_phong DESC")
	List<PhieuDatPhong> layPhieuSapXepTheoNgayTrangThaiMoiDat();
	
	@Query(nativeQuery = true, value = "select * from phieu_dat_phong "
			+ "where trang_thai_dat_phong = 'MOI_DAT' and ma_khach_hang = :maKhachHang "
			+ "order by ngay_nhan_phong")
	List<PhieuDatPhong> layPhieuSapXepTheoNgayTrangThaiMoiDatTheoMaKH(@Param("maKhachHang") int maKhachHang);
}

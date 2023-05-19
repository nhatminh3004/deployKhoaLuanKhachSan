package com.example.hotelserver.entity;

import java.util.Date;
import java.util.List;

import com.example.hotelserver.dto.DanhSachSoLanDatPhongThanhCongVaMaKhachHangDto;
import com.example.hotelserver.dto.DanhSachSoLanHuyDatPhongVaMaKhachHangDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@NamedNativeQuery(
		name = "danhSachSoLanHuyDatPhongVaMaKhachHang",
		query = "select pdp.ma_khach_hang as maKhachHang ,COUNT(*) as tongSoLanHuyPhong from phieu_dat_phong pdp  where pdp.trang_thai_dat_phong like 'HUY' AND pdp.ngay_dat_phong BETWEEN :start AND :end GROUP BY pdp.ma_khach_hang",
		resultSetMapping = "danh_sach_khachhang_voi_so_lan_huy_dat_phong"
)
@SqlResultSetMapping(
		name = "danh_sach_khachhang_voi_so_lan_huy_dat_phong",
		classes = @ConstructorResult(
				targetClass = DanhSachSoLanHuyDatPhongVaMaKhachHangDto.class,
				columns = {
						@ColumnResult(name = "maKhachHang",type = Integer.class),
						@ColumnResult(name = "tongSoLanHuyPhong",type = Integer.class),
				}
		)
)
@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "phieu_dat_phong")
public class PhieuDatPhong {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ma_phieu_dat_phong")
	private long maPhieuDatPhong;
	
	@Column(name = "ngay_dat_phong")
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Jakarta")
	private Date ngayDatPhong;
	
	@Column(name = "giam_gia")
	private double giamGia;
	
	@Column(name = "ghi_chu_dat_phong", columnDefinition = "nvarchar(255)")
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Jakarta")
	private String ghiChuDatPhong;
	
	@Column(name = "ngay_nhan_phong")
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Jakarta")
	private Date ngayNhanPhong;
	
	@Column(name = "ngay_tra_phong")
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Jakarta")
	private Date ngayTraPhong;
	
	@Enumerated(EnumType.STRING)
	private TrangThaiDatPhong trangThaiDatPhong;
	
	@OneToMany(mappedBy = "phieuDatPhong")
	@JsonIgnore
	private List<ChiTietPhieuDatPhong> dsChiTietPhieuDatPhong;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
	@JoinColumn(name = "ma_khach_hang")
	private KhachHang khachHang;
	
	public double tinhTongTien() {
		if (dsChiTietPhieuDatPhong == null || dsChiTietPhieuDatPhong.isEmpty()) {
			return 0;
		}
		double result = 0;
		for (ChiTietPhieuDatPhong ct : dsChiTietPhieuDatPhong) {
			result += ct.getPhong().getGiaPhong();
		}
		
		return result;
	}

	@Override
	public String toString() {
		return "PhieuDatPhong [maPhieuDatPhong=" + maPhieuDatPhong + ", ngayDatPhong=" + ngayDatPhong + ", giamGia="
				+ giamGia + ", ghiChuDatPhong=" + ghiChuDatPhong + ", ngayNhanPhong=" + ngayNhanPhong
				+ ", ngayTraPhong=" + ngayTraPhong + ", trangThaiDatPhong=" + trangThaiDatPhong
				+ ", dsChiTietPhieuDatPhong=" + dsChiTietPhieuDatPhong + ", khachHang=" + khachHang + "]";
	}
	
	 
}

package com.example.hotelserver.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Builder
@Table(name = "khach_hang")
public class KhachHang {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ma_khach_hang")
	private int maKhachHang;
	
	@Column(columnDefinition = "nvarchar(255)", name = "ho_ten")
	private String hoTen;
	
	@Column(name = "cccd_khach_hang", columnDefinition = "nvarchar(255)")
	private String cccdKhachHang;

	@Column(name = "so_dien_thoai_kh", columnDefinition = "nvarchar(255)")
	private String soDienThoaiKH;
	
	@Column(name = "dia_chi_kh", columnDefinition = "nvarchar(255)")
	private String diaChiKH;
	
	@Column(name = "email_kh", columnDefinition = "nvarchar(255)")
	private String emailKH;
	
//	@OneToOne(fetch = FetchType.EAGER)
//	@JoinColumn(name = "ma_tai_khoan")
//	private TaiKhoan taiKhoan;
}

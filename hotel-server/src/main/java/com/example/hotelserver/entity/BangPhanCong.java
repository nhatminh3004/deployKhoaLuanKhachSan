package com.example.hotelserver.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Builder
@Table(name = "bang_phan_cong")
public class BangPhanCong {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ma_bang_phan_cong")
	private long maBangPhanCong;
	
	@Column(name = "ngay_phan_cong")
	private Date ngayPhanCong;
	
	@Column(name = "ngay_chinh_sua")
	private Date ngayChinhSua;
	
	@Column(name = "ngay_bat_dau")
	private Date ngayBatDau;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ma_nhan_vien")
	private NhanVien nhanVien;
}

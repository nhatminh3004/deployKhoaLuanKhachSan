package com.example.hotelserver.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "bang_cham_cong")
public class BangChamCong {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ma_bang_cham_cong")
	private long maBangChamCong;
	
	@Column(name = "ngay_cham_cong")
	private Date ngayChamCong;
	
	private int thu;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "ma_chi_tiet_phan_cong")
	private ChiTietPhanCong chiTietPhanCong;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "ma_nhan_vien")
	private NhanVien nhanVien;
}

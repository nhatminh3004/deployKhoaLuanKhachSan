package com.example.hotelserver.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Builder
@Table(name = "dich_vu")
public class DichVu {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ma_dich_vu")
	private long maDichVu;
	
	@Column(name = "ten_dich_vu", columnDefinition = "nvarchar(255)")
	private String tenDichVu;
//	@Column(name = "mo_ta_dich_vu", columnDefinition = "nvarchar(255)")
//	private String motaDichVu;
//	@Column(name = "don_vi_tinh", columnDefinition = "nvarchar(255)")
//	private String donviTinh;
	@Column(name = "giaDichVu")
	private double giaDichVu;
	
	@Column(name = "soLuong")
	private int soLuong;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
	@JsonIgnore
	@JoinColumn(name = "ma_loai_dich_vu")
	private LoaiDichVu loaiDichVu;
	
//	@OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
//	@Nullable
//	private Set<BookingProduct> bookingProducts;
}

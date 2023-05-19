package com.example.hotelserver.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name = "chi_tiet_bang_luong")
public class ChiTietBangLuong {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ma_chi_tiet_bang_luong")
	private long maChiTietBangLuong;
	
	@OneToOne(fetch = FetchType.LAZY)
//	@JsonIgnore
	@JoinColumn(name = "ma_bang_cham_cong")
	private BangChamCong bangChamCong;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	@JoinColumn(name = "ma_bang_luong")
	private BangLuong bangLuong;
}

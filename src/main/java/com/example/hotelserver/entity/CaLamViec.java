package com.example.hotelserver.entity;

import java.time.LocalTime;

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
@Table(name = "ca_lam_viec")
public class CaLamViec {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ma_ca")
	private long maCa;
	
	@Column(name = "ten_ca", columnDefinition = "nvarchar(255)")
	private String tenCa;
	
	@Column(name = "gio_bat_dau")
	private LocalTime gioBatDau;
	
	@Column(name = "so_gio")
	private float soGio;
	
	@Column(name = "gio_ket_thuc")
	private LocalTime gioKetThuc;
}

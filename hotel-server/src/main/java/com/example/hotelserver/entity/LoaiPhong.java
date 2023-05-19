package com.example.hotelserver.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter
@AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "loai_phong")
public class LoaiPhong{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ma_loai_phong")
	private long maLoaiPhong;
	
	@Column(name = "ten_loai_phong", columnDefinition = "nvarchar(255)")
	private String tenLoaiPhong;
	
	@Column(name = "mo_ta_loai_phong", columnDefinition = "nvarchar(255)")
	private String moTaLoaiPhong;
}

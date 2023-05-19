package com.example.hotelserver.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "vai_tro")
public class VaiTro {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ma_vai_tro")
	private long maVaiTro;
	
	@Column(columnDefinition = "nvarchar(255)", name = "ten_vai_tro")
	private String tenVaiTro;
}

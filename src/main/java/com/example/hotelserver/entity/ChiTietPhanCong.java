package com.example.hotelserver.entity;

import java.util.List;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
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
@Table(name = "chi_tiet_phan_cong")
public class ChiTietPhanCong {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ma_chi_tiet_phan_cong")
	private long maChiTietPhanCong; 
	
	@ManyToOne
	@JoinColumn(name="ma_ca")
	private CaLamViec caLamViec;
	
	@Column(name = "thu")
	@ElementCollection(fetch = FetchType.EAGER)
	@Cascade(value={CascadeType.ALL})
	@JoinTable(name = "thu", joinColumns = @JoinColumn(name = "ma_chi_tiet_phan_cong"))
	private List<Integer> thu;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	@JoinColumn(name = "ma_bang_phan_cong")
	private BangPhanCong bangPhanCong;
	
}

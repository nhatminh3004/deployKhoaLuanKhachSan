package com.example.hotelserver.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter
@AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "phong")
public class Phong {
	@Id
	@Column(name = "ma_phong")
	private String maPhong;
	
	@Column(name = "ten_phong", columnDefinition = "nvarchar(255)")
	private String tenPhong;
	
	@Column(name = "trang_thai_phong")
	private boolean trangThaiPhong;
	
	@Column(name = "hinh_anh_phong", columnDefinition = "varchar(8000)")
	@MapKeyColumn(columnDefinition="varchar(8000)")
	@ElementCollection(fetch = FetchType.EAGER)
	@JoinTable(name = "hinh_anh_phong", joinColumns = @JoinColumn(name = "ma_phong"))
	private List<String> hinhAnhPhong;
	
	@Column(name = "mo_ta_phong", columnDefinition = "nvarchar(255)")
	private String moTaPhong;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
	@JsonIgnore
	@JoinColumn(name = "ma_tang")
	private Tang tang;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
	@JsonIgnore
	@JoinColumn(name = "ma_loai_phong")
	private LoaiPhong loaiPhong;
	
	@Column(name = "gia_phong")
	private double giaPhong;
	
	@Column(name = "duoc_hut_thuoc")
	private boolean duocHutThuoc;
	
	@Column(name = "mang_thu_cung")
	private boolean mangThuCung;
	
	@Column(name = "suc_chua")
	private int sucChua;
	
	@Column(name = "so_giuong")
	private int soGiuong;

	@Override
	public String toString() {
		return "Phong [maPhong=" + maPhong + ", tenPhong=" + tenPhong + ", trangThaiPhong=" + trangThaiPhong
				+ ", hinhAnhPhong=" + hinhAnhPhong + ", moTaPhong=" + moTaPhong + ", tang=" + tang + ", loaiPhong="
				+ loaiPhong + ", giaPhong=" + giaPhong + ", duocHutThuoc=" + duocHutThuoc + ", mangThuCung="
				+ mangThuCung + ", sucChua=" + sucChua + ", soGiuong=" + soGiuong + "]";
	}
	
	
	
	
}

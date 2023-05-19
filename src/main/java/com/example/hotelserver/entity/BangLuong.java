package com.example.hotelserver.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Builder
@Table(name = "bang_luong")
public class BangLuong {
	@Id
	@Column(name = "ma_bang_luong")
	private String maBangLuong;
	private int thang;
	private int nam;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	@JoinColumn(name = "ma_nhan_vien")
	private NhanVien nhanVien;
	
	@OneToMany(mappedBy = "bangLuong", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<ChiTietBangLuong> dsChiTietBangLuong;
	
	public double tinhLuong() {
		double luongCoBan = this.nhanVien.getLuongCoBan();
		double soGio = 0;

		if (dsChiTietBangLuong !=  null && !dsChiTietBangLuong.isEmpty()) {
			for (ChiTietBangLuong chiTietBangLuong : dsChiTietBangLuong) {
				soGio += chiTietBangLuong.getBangChamCong().getChiTietPhanCong().getCaLamViec().getSoGio();
			}
		}
		return soGio * luongCoBan;
	}
}

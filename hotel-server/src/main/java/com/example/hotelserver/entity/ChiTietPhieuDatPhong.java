package com.example.hotelserver.entity;

import com.example.hotelserver.dto.NhanVienTestDTO;
import com.example.hotelserver.dto.ThongKeSoLanDatPhongDto;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
//@NamedNativeQuery(name ="ChiTietPhieuDatPhong.getThongKeSoLanDatPhong",query = "SELECT c.ma_phong as maPhong,p.ten_phong as tenPhong,p.gia_phong as giaPhong,t.ten_tang as tenTang,lp.ten_loai_phong as tenLoaiPhong,COUNT(*) as tongSoLanDat\n" +
//		"            FROM chi_tiet_phieu_dat_phong c  \n" +
//		"            JOIN phieu_dat_phong pdp ON c.ma_phieu_dat_phong =pdp.ma_phieu_dat_phong JOIN phong p on c.ma_phong =p.ma_phong\n" +
//		"\t\t\tJOIN tang t on t.ma_tang = p.ma_tang\n" +
//		"\t\t\tJOIN loai_phong lp on lp.ma_loai_phong = p.ma_loai_phong\n" +
//		" WHERE pdp.ngay_nhan_phong BETWEEN :start AND :end " +
//		" GROUP BY c.ma_phong,p.ten_phong,t.ten_tang,p.gia_phong,lp.ten_loai_phong")
//@SqlResultSetMapping(name="Mapping.ThongKeSoLanDatPhongDto",classes = @ConstructorResult(targetClass = ThongKeSoLanDatPhongDto.class,
//columns = {@ColumnResult(name = "maPhong"),@ColumnResult(name = "tenPhong"),@ColumnResult(name = "giaPhong"),
//@ColumnResult(name = "tenTang"),@ColumnResult(name = "tenLoaiPhong"),@ColumnResult(name = "tongSoLanDat")}))
@NamedNativeQuery(
		name = "thongKePhongWithSoLuongPhong",
		query = "SELECT c.ma_phong as maPhong,p.ten_phong as tenPhong,p.gia_phong as giaPhong,t.ten_tang as tenTang,lp.ten_loai_phong as tenLoaiPhong,COUNT(*) as tongSoLanDat\n" +
				"            FROM chi_tiet_phieu_dat_phong c  \n" +
				"            JOIN phieu_dat_phong pdp ON c.ma_phieu_dat_phong =pdp.ma_phieu_dat_phong JOIN phong p on c.ma_phong =p.ma_phong\n" +
				"\t\t\tJOIN tang t on t.ma_tang = p.ma_tang\n" +
				"\t\t\tJOIN loai_phong lp on lp.ma_loai_phong = p.ma_loai_phong\n" +
				"            WHERE pdp.ngay_nhan_phong BETWEEN :start AND  :end\n" +
				"            GROUP BY c.ma_phong,p.ten_phong,t.ten_tang,p.gia_phong,lp.ten_loai_phong",
		resultSetMapping = "thong_ke_so_lan_dat_phong_dto"
)
@SqlResultSetMapping(
		name = "thong_ke_so_lan_dat_phong_dto",
		classes = @ConstructorResult(
				targetClass = ThongKeSoLanDatPhongDto.class,
				columns = {
						@ColumnResult(name = "maPhong",type = String.class),
						@ColumnResult(name = "tenPhong",type = String.class),
						@ColumnResult(name = "giaPhong",type = Double.class),
						@ColumnResult(name = "tenTang",type = String.class),
						@ColumnResult(name = "tenLoaiPhong",type = String.class),
						@ColumnResult(name = "tongSoLanDat",type = Double.class),

				}
		)
)

@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@IdClass(ChiTietPhieuDatPhongPK.class)
@Table(name = "chi_tiet_phieu_dat_phong")
public class ChiTietPhieuDatPhong {
	@Id
	@ManyToOne
	@JoinColumn(name="ma_phieu_dat_phong")
	private PhieuDatPhong phieuDatPhong;
	
	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	@JoinColumn(name="ma_phong")
	private Phong phong;
}

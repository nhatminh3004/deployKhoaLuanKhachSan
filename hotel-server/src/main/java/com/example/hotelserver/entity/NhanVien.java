package com.example.hotelserver.entity;

import java.util.Date;

import com.example.hotelserver.dto.NhanVienTestDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Builder
@Table(name = "nhan_vien")
@NamedNativeQuery(
		name = "findAllNhanVienWithTaiKhoan",
		query = "select nv.ma_nhan_vien as maNhanVien,nv.ho_ten as tenNhanVien,tk.ten_tai_khoan as tenTaiKhoan from nhan_vien nv join tai_khoan tk on nv.ma_tai_khoan=tk.ma_tai_khoan where tk.ten_tai_khoan like  :param ",
		resultSetMapping = "nhan_vien_test_dto"
)
@SqlResultSetMapping(
		name = "nhan_vien_test_dto",
		classes = @ConstructorResult(
				targetClass = NhanVienTestDTO.class,
				columns = {
						@ColumnResult(name = "maNhanVien",type = Long.class),
						@ColumnResult(name = "tenNhanVien",type = String.class),
						@ColumnResult(name = "tenTaiKhoan",type = String.class)
				}
		)
)
public class NhanVien {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ma_nhan_vien")
	private long maNhanVien;
	
	@Column(name = "ho_ten", columnDefinition = "nvarchar(255)")
	private String hoTen;
	
	@Column(name = "dia_chi", columnDefinition = "nvarchar(255)")
	private String diaChi;
	
	@Column(name = "email", columnDefinition = "nvarchar(255)")
	private String email;

	@Column(name = "so_dien_thoai", columnDefinition = "nvarchar(255)")
	private String soDienThoai;
	
	private String cccd;
	
	@Column(name = "ngay_sinh")
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	private Date ngaySinh;
	
	@Column(name = "luong_co_Ban")
	private double luongCoBan;
	
	@Column(name = "ngay_vao_lam")
	private Date ngayVaoLam;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "ma_tai_khoan")
	private TaiKhoan taiKhoan;
}

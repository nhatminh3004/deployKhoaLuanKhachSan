create database khachsan
use khachsan
/****** Vai Trò******/
CREATE TABLE [dbo].[vai_tro](
	[ma_vai_tro] [bigint] IDENTITY(1,1) NOT NULL,
	[ten_vai_tro] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_vai_tro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
/****** Tài khoản ******/
CREATE TABLE [dbo].[tai_khoan](
	[ma_tai_khoan] [bigint] IDENTITY(1,1) NOT NULL,
	[da_kich_hoat] [bit] NULL,
	[mat_khau] [varchar](255) NULL,
	[ten_tai_khoan] [varchar](255) NULL,
	[ma_vai_tro] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_tai_khoan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
/****** Nhân viên ******/
CREATE TABLE [dbo].[nhan_vien](
	[ma_nhan_vien] [bigint] IDENTITY(1,1) NOT NULL,
	[cccd] [varchar](255) NULL,
	[dia_chi] [nvarchar](255) NULL,
	[email] [nvarchar](255) NULL,
	[ho_ten] [nvarchar](255) NULL,
	[luong_co_ban] [float] NULL,
	[ngay_sinh] [datetime2](6) NULL,
	[ngay_vao_lam] [datetime2](6) NULL,
	[so_dien_thoai] [nvarchar](255) NULL,
	[ma_tai_khoan] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_nhan_vien] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[nhan_vien]  WITH CHECK ADD  CONSTRAINT [FKdpk3u6xuawsiksnkklx1pfeyw] FOREIGN KEY([ma_tai_khoan])
REFERENCES [dbo].[tai_khoan] ([ma_tai_khoan])

ALTER TABLE [dbo].[nhan_vien] CHECK CONSTRAINT [FKdpk3u6xuawsiksnkklx1pfeyw]

/****** Loại phòng******/
CREATE TABLE [dbo].[loai_phong](
	[ma_loai_phong] [bigint] IDENTITY(1,1) NOT NULL,
	[mo_ta_loai_phong] [nvarchar](255) NULL,
	[ten_loai_phong] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_loai_phong] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
/****** Tầng******/
CREATE TABLE [dbo].[tang](
	[ma_tang] [int] IDENTITY(1,1) NOT NULL,
	[ten_tang] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_tang] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


/****** Phòng******/
CREATE TABLE [dbo].[phong](
	[ma_phong] [varchar](255) NOT NULL,
	[duoc_hut_thuoc] [bit] NULL,
	[gia_phong] [float] NULL,
	[mang_thu_cung] [bit] NULL,
	[mo_ta_phong] [nvarchar](255) NULL,
	[so_giuong] [int] NULL,
	[suc_chua] [int] NULL,
	[ten_phong] [nvarchar](255) NULL,
	[trang_thai_phong] [bit] NULL,
	[ma_loai_phong] [bigint] NULL,
	[ma_tang] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_phong] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[phong]  WITH CHECK ADD  CONSTRAINT [FK378h0h60ooky42egxi2ckdqu] FOREIGN KEY([ma_loai_phong])
REFERENCES [dbo].[loai_phong] ([ma_loai_phong])
GO

ALTER TABLE [dbo].[phong] CHECK CONSTRAINT [FK378h0h60ooky42egxi2ckdqu]
GO

ALTER TABLE [dbo].[phong]  WITH CHECK ADD  CONSTRAINT [FK6sj0wd1xme7949208vkvfa6xf] FOREIGN KEY([ma_tang])
REFERENCES [dbo].[tang] ([ma_tang])
GO

ALTER TABLE [dbo].[phong] CHECK CONSTRAINT [FK6sj0wd1xme7949208vkvfa6xf]
GO

/****** Hình ảnh phòng******/
CREATE TABLE [dbo].[hinh_anh_phong](
	[ma_phong] [varchar](255) NOT NULL,
	[hinh_anh_phong] [varchar](8000) NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[hinh_anh_phong]  WITH CHECK ADD  CONSTRAINT [FKoc1u6e4v3fhy0b1emuwkedggr] FOREIGN KEY([ma_phong])
REFERENCES [dbo].[phong] ([ma_phong])
GO

ALTER TABLE [dbo].[hinh_anh_phong] CHECK CONSTRAINT [FKoc1u6e4v3fhy0b1emuwkedggr]
GO

/****** Loại dịch vụ******/
CREATE TABLE [dbo].[loai_dich_vu](
	[ma_loai_dich_vu] [bigint] IDENTITY(1,1) NOT NULL,
	[don_vi_loai_dich_vu] [nvarchar](255) NULL,
	[ten_loai_dich_vu] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_loai_dich_vu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

/****** Dịch vụ******/
CREATE TABLE [dbo].[dich_vu](
	[ma_dich_vu] [bigint] IDENTITY(1,1) NOT NULL,
	[gia_dich_vu] [float] NULL,
	[so_luong] [int] NULL,
	[ten_dich_vu] [nvarchar](255) NULL,
	[ma_loai_dich_vu] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_dich_vu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[dich_vu]  WITH CHECK ADD  CONSTRAINT [FK7oi64ccvace8kk9h4wqw2dey] FOREIGN KEY([ma_loai_dich_vu])
REFERENCES [dbo].[loai_dich_vu] ([ma_loai_dich_vu])
GO

ALTER TABLE [dbo].[dich_vu] CHECK CONSTRAINT [FK7oi64ccvace8kk9h4wqw2dey]
GO


/****** Khách hàng******/
CREATE TABLE [dbo].[khach_hang](
	[ma_khach_hang] [int] IDENTITY(1,1) NOT NULL,
	[cccd_khach_hang] [nvarchar](255) NULL,
	[dia_chi_kh] [nvarchar](255) NULL,
	[email_kh] [nvarchar](255) NULL,
	[ho_ten] [nvarchar](255) NULL,
	[so_dien_thoai_kh] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_khach_hang] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Phiếu đặt phòng******/
CREATE TABLE [dbo].[phieu_dat_phong](
	[ma_phieu_dat_phong] [bigint] IDENTITY(1,1) NOT NULL,
	[ghi_chu_dat_phong] [nvarchar](255) NULL,
	[giam_gia] [float] NULL,
	[ngay_dat_phong] [datetime2](6) NULL,
	[ngay_nhan_phong] [datetime2](6) NULL,
	[ngay_tra_phong] [datetime2](6) NULL,
	[trang_thai_dat_phong] [varchar](255) NULL,
	[ma_khach_hang] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_phieu_dat_phong] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[phieu_dat_phong]  WITH CHECK ADD  CONSTRAINT [FKowoyrd9mrgwyno21m9fsdgoy3] FOREIGN KEY([ma_khach_hang])
REFERENCES [dbo].[khach_hang] ([ma_khach_hang])
GO

ALTER TABLE [dbo].[phieu_dat_phong] CHECK CONSTRAINT [FKowoyrd9mrgwyno21m9fsdgoy3]
GO


/****** Chi tiết phiếu đặt phòng******/
CREATE TABLE [dbo].[chi_tiet_phieu_dat_phong](
	[ma_phieu_dat_phong] [bigint] NOT NULL,
	[ma_phong] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_phieu_dat_phong] ASC,
	[ma_phong] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[chi_tiet_phieu_dat_phong]  WITH CHECK ADD  CONSTRAINT [FK4vpbsnofl4ldprfbblp089b0i] FOREIGN KEY([ma_phieu_dat_phong])
REFERENCES [dbo].[phieu_dat_phong] ([ma_phieu_dat_phong])
GO

ALTER TABLE [dbo].[chi_tiet_phieu_dat_phong] CHECK CONSTRAINT [FK4vpbsnofl4ldprfbblp089b0i]
GO

ALTER TABLE [dbo].[chi_tiet_phieu_dat_phong]  WITH CHECK ADD  CONSTRAINT [FK67gffdkgddu4tq7g7xfs46bll] FOREIGN KEY([ma_phong])
REFERENCES [dbo].[phong] ([ma_phong])
GO

ALTER TABLE [dbo].[chi_tiet_phieu_dat_phong] CHECK CONSTRAINT [FK67gffdkgddu4tq7g7xfs46bll]
GO


/****** Hóa đơn******/
CREATE TABLE [dbo].[hoa_don](
	[ma_hoa_don] [bigint] IDENTITY(1,1) NOT NULL,
	[ngay_lap] [datetime2](6) NULL,
	[ngay_nhan_phong] [datetime2](6) NULL,
	[ngay_tra_phong] [datetime2](6) NULL,
	[tien_nhan] [float] NULL,
	[ma_khach_hang] [int] NULL,
	[ma_nhan_vien] [bigint] NULL,
	[ma_phieu_dat_phong] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_hoa_don] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[hoa_don]  WITH CHECK ADD  CONSTRAINT [FKmmmh9inpr7x99jo4xqdcsltn6] FOREIGN KEY([ma_phieu_dat_phong])
REFERENCES [dbo].[phieu_dat_phong] ([ma_phieu_dat_phong])
GO

ALTER TABLE [dbo].[hoa_don] CHECK CONSTRAINT [FKmmmh9inpr7x99jo4xqdcsltn6]
GO

ALTER TABLE [dbo].[hoa_don]  WITH CHECK ADD  CONSTRAINT [FKnuqkgajew2traqcy7umgm7i1g] FOREIGN KEY([ma_khach_hang])
REFERENCES [dbo].[khach_hang] ([ma_khach_hang])
GO

ALTER TABLE [dbo].[hoa_don] CHECK CONSTRAINT [FKnuqkgajew2traqcy7umgm7i1g]
GO

ALTER TABLE [dbo].[hoa_don]  WITH CHECK ADD  CONSTRAINT [FKsh87ilak874fkwk9pw28pafx7] FOREIGN KEY([ma_nhan_vien])
REFERENCES [dbo].[nhan_vien] ([ma_nhan_vien])
GO

ALTER TABLE [dbo].[hoa_don] CHECK CONSTRAINT [FKsh87ilak874fkwk9pw28pafx7]
GO

/****** Chi tiết hóa đơn******/
CREATE TABLE [dbo].[chi_tiet_hoa_don](
	[ma_hoa_don] [bigint] NOT NULL,
	[ma_phong] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_hoa_don] ASC,
	[ma_phong] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[chi_tiet_hoa_don]  WITH CHECK ADD  CONSTRAINT [FK6wilbkb79kkjnlpj5srem0ebe] FOREIGN KEY([ma_phong])
REFERENCES [dbo].[phong] ([ma_phong])
GO

ALTER TABLE [dbo].[chi_tiet_hoa_don] CHECK CONSTRAINT [FK6wilbkb79kkjnlpj5srem0ebe]
GO

ALTER TABLE [dbo].[chi_tiet_hoa_don]  WITH CHECK ADD  CONSTRAINT [FKk49dolcd69qi88u6a25i9x2e] FOREIGN KEY([ma_hoa_don])
REFERENCES [dbo].[hoa_don] ([ma_hoa_don])
GO

ALTER TABLE [dbo].[chi_tiet_hoa_don] CHECK CONSTRAINT [FKk49dolcd69qi88u6a25i9x2e]
GO
/****** Chi tiết dịch vụ******/
CREATE TABLE [dbo].[chi_tiet_dich_vu](
	[ma_dich_vu] [bigint] NOT NULL,
	[ma_hoa_don] [bigint] NOT NULL,
	[so_luong] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_dich_vu] ASC,
	[ma_hoa_don] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[chi_tiet_dich_vu]  WITH CHECK ADD  CONSTRAINT [FK4uedyawrwwjb6td58q2us2l1l] FOREIGN KEY([ma_dich_vu])
REFERENCES [dbo].[dich_vu] ([ma_dich_vu])
GO

ALTER TABLE [dbo].[chi_tiet_dich_vu] CHECK CONSTRAINT [FK4uedyawrwwjb6td58q2us2l1l]
GO

ALTER TABLE [dbo].[chi_tiet_dich_vu]  WITH CHECK ADD  CONSTRAINT [FKjsqbb5x7xcwrg5agf6taqur2t] FOREIGN KEY([ma_hoa_don])
REFERENCES [dbo].[hoa_don] ([ma_hoa_don])
GO

ALTER TABLE [dbo].[chi_tiet_dich_vu] CHECK CONSTRAINT [FKjsqbb5x7xcwrg5agf6taqur2t]
GO


/****** Ca làm việc******/
CREATE TABLE [dbo].[ca_lam_viec](
	[ma_ca] [bigint] IDENTITY(1,1) NOT NULL,
	[gio_bat_dau] [time](7) NULL,
	[gio_ket_thuc] [time](7) NULL,
	[so_gio] [real] NULL,
	[ten_ca] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_ca] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


/****** Bảng phân công******/
CREATE TABLE [dbo].[bang_phan_cong](
	[ma_bang_phan_cong] [bigint] IDENTITY(1,1) NOT NULL,
	[ngay_bat_dau] [datetime2](6) NULL,
	[ngay_chinh_sua] [datetime2](6) NULL,
	[ngay_phan_cong] [datetime2](6) NULL,
	[ma_nhan_vien] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_bang_phan_cong] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[bang_phan_cong]  WITH CHECK ADD  CONSTRAINT [FKqko3v6trwgasmmnving4jw5ba] FOREIGN KEY([ma_nhan_vien])
REFERENCES [dbo].[nhan_vien] ([ma_nhan_vien])
GO

ALTER TABLE [dbo].[bang_phan_cong] CHECK CONSTRAINT [FKqko3v6trwgasmmnving4jw5ba]
GO

/****** Chi tiết phân công******/
CREATE TABLE [dbo].[chi_tiet_phan_cong](
	[ma_chi_tiet_phan_cong] [bigint] IDENTITY(1,1) NOT NULL,
	[ma_bang_phan_cong] [bigint] NULL,
	[ma_ca] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_chi_tiet_phan_cong] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[chi_tiet_phan_cong]  WITH CHECK ADD  CONSTRAINT [FK91433g4khw776i8xo7xnpv44] FOREIGN KEY([ma_bang_phan_cong])
REFERENCES [dbo].[bang_phan_cong] ([ma_bang_phan_cong])
GO

ALTER TABLE [dbo].[chi_tiet_phan_cong] CHECK CONSTRAINT [FK91433g4khw776i8xo7xnpv44]
GO

ALTER TABLE [dbo].[chi_tiet_phan_cong]  WITH CHECK ADD  CONSTRAINT [FKplplowmyo6nkhqd1regacjc72] FOREIGN KEY([ma_ca])
REFERENCES [dbo].[ca_lam_viec] ([ma_ca])
GO

ALTER TABLE [dbo].[chi_tiet_phan_cong] CHECK CONSTRAINT [FKplplowmyo6nkhqd1regacjc72]
GO


/****** Thứ******/
CREATE TABLE [dbo].[thu](
	[ma_chi_tiet_phan_cong] [bigint] NOT NULL,
	[thu] [int] NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[thu]  WITH CHECK ADD  CONSTRAINT [FK8sffxt92m3mpaoe89lsj2rjgs] FOREIGN KEY([ma_chi_tiet_phan_cong])
REFERENCES [dbo].[chi_tiet_phan_cong] ([ma_chi_tiet_phan_cong])
GO

ALTER TABLE [dbo].[thu] CHECK CONSTRAINT [FK8sffxt92m3mpaoe89lsj2rjgs]
GO


/****** Bảng chấm công******/
CREATE TABLE [dbo].[bang_cham_cong](
	[ma_bang_cham_cong] [bigint] IDENTITY(1,1) NOT NULL,
	[ngay_cham_cong] [datetime2](6) NULL,
	[thu] [int] NOT NULL,
	[ma_chi_tiet_phan_cong] [bigint] NULL,
	[ma_nhan_vien] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_bang_cham_cong] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[bang_cham_cong]  WITH CHECK ADD  CONSTRAINT [FK2008j8aopsfq059jjfga6m79a] FOREIGN KEY([ma_chi_tiet_phan_cong])
REFERENCES [dbo].[chi_tiet_phan_cong] ([ma_chi_tiet_phan_cong])
GO

ALTER TABLE [dbo].[bang_cham_cong] CHECK CONSTRAINT [FK2008j8aopsfq059jjfga6m79a]
GO

ALTER TABLE [dbo].[bang_cham_cong]  WITH CHECK ADD  CONSTRAINT [FK8d1210voh20sgyowbutqw36q8] FOREIGN KEY([ma_nhan_vien])
REFERENCES [dbo].[nhan_vien] ([ma_nhan_vien])
GO

ALTER TABLE [dbo].[bang_cham_cong] CHECK CONSTRAINT [FK8d1210voh20sgyowbutqw36q8]
GO


/****** Bảng lương******/
CREATE TABLE [dbo].[bang_luong](
	[ma_bang_luong] [varchar](255) NOT NULL,
	[nam] [int] NOT NULL,
	[thang] [int] NOT NULL,
	[ma_nhan_vien] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_bang_luong] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[bang_luong]  WITH CHECK ADD  CONSTRAINT [FKs4j3v3abgxj6tvnmhcjucusgv] FOREIGN KEY([ma_nhan_vien])
REFERENCES [dbo].[nhan_vien] ([ma_nhan_vien])
GO

ALTER TABLE [dbo].[bang_luong] CHECK CONSTRAINT [FKs4j3v3abgxj6tvnmhcjucusgv]
GO

/****** Chi tiết bảng lương******/
CREATE TABLE [dbo].[chi_tiet_bang_luong](
	[ma_chi_tiet_bang_luong] [bigint] IDENTITY(1,1) NOT NULL,
	[ma_bang_cham_cong] [bigint] NULL,
	[ma_bang_luong] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_chi_tiet_bang_luong] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[chi_tiet_bang_luong]  WITH CHECK ADD  CONSTRAINT [FKsoajmm2mlijf8ujurdas3upov] FOREIGN KEY([ma_bang_cham_cong])
REFERENCES [dbo].[bang_cham_cong] ([ma_bang_cham_cong])
GO

ALTER TABLE [dbo].[chi_tiet_bang_luong] CHECK CONSTRAINT [FKsoajmm2mlijf8ujurdas3upov]
GO

ALTER TABLE [dbo].[chi_tiet_bang_luong]  WITH CHECK ADD  CONSTRAINT [FKtn54e5fuu778ccw70vsug3rxv] FOREIGN KEY([ma_bang_luong])
REFERENCES [dbo].[bang_luong] ([ma_bang_luong])
GO

ALTER TABLE [dbo].[chi_tiet_bang_luong] CHECK CONSTRAINT [FKtn54e5fuu778ccw70vsug3rxv]
GO
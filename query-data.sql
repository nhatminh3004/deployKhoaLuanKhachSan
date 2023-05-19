use khachsan

select * from phong
select * from loai_phong
select * from dich_vu
select * from loai_dich_vu

select * from vai_tro
select * from tai_khoan
select * from nhan_vien

select * from khach_hang
select * from ca_lam_viec
select * from bang_phan_cong
select * from chi_tiet_phan_cong
select * from bang_cham_cong where Day(ngay_cham_cong) = '09' and MONTH(ngay_cham_cong) = '05' and YEAR(ngay_cham_cong) = '2023';
select * from bang_phan_cong where ngay_bat_dau <= '2023-05-06';

select COUNT(*) from bang_cham_cong where MONTH(ngay_cham_cong) = '04' and YEAR(ngay_cham_cong) = '2023';

-- 12345678
--$2a$10$h27./FD4LJEPvDPtqHeWOeA2Ec3EMJ6lXNq8UeF9bY0VKQtCwmV4G 

select * from phieu_dat_phong
select * from chi_tiet_phieu_dat_phong

select * from hoa_don
select * from chi_tiet_hoa_don 
select * from chi_tiet_dich_vu

select ma_phieu_dat_phong from phieu_dat_phong pdp where 
pdp.ngay_nhan_phong between '2023-03-19' and '2023-03-20'
or pdp.ngay_tra_phong between '2023-03-19' and '2023-03-20'

select * from phong p inner join chi_tiet_phieu_dat_phong ctpdp 
on p.ma_phong = ctpdp.ma_phong 
where ctpdp.ma_phieu_dat_phong = 52

select * from phieu_dat_phong pdb inner join khach_hang kh on pdb.ma_khach_hang=kh.ma_khach_hang where kh.cccd_khach_hang = '012345678900'
select * from phieu_dat_phong where trang_thai_dat_phong = 'MOI_DAT' and ma_khach_hang = '2' order by ngay_nhan_phong

select p.ma_phong, mo_ta_phong, ten_phong, trang_thai_phong, mang_thu_cung, gia_phong, duoc_hut_thuoc, ma_tang, ma_loai_phong 
from phong p inner join chi_tiet_phieu_dat_phong ctpdp on p.ma_phong = ctpdp.ma_phong 
where ctpdp.ma_phieu_dat_phong = 102 or ctpdp.ma_phieu_dat_phong = 103;


select ctdv.ma_dich_vu as maDichVu, ten_dich_vu as tenDichVu, gia_dich_vu as giaDichVu, ctdv.so_luong as soLuong 
from chi_tiet_dich_vu ctdv inner join dich_vu dv 
on ctdv.ma_dich_vu = dv.ma_dich_vu where ctdv.ma_hoa_don=1

select ctdv.ma_dich_vu as maDichVu, dv.ten_dich_vu as tenDichVu
, dv.gia_dich_vu as giaDichVu, ctdv.so_luong as soLuong 
from chi_tiet_dich_vu ctdv 
inner join dich_vu dv on ctdv.ma_dich_vu = dv.ma_dich_vu
where ctdv.ma_hoa_don=1

select * from phieu_dat_phong;

select ma_phieu_dat_phong from phieu_dat_phong pdp where
pdp.trang_thai_dat_phong != 'HUY' and
(pdp.ngay_nhan_phong between '2023-04-17 09:14' and '2023-04-17 09:16'
or pdp.ngay_tra_phong between '2023-04-17 09:14' and '2023-04-17 09:16'
or '2023-04-17 09:16' between pdp.ngay_nhan_phong and pdp.ngay_tra_phong
or '2023-04-17 09:14' between pdp.ngay_nhan_phong and pdp.ngay_tra_phong)
;

select * from bang_luong where thang = 4 and nam = 2023;
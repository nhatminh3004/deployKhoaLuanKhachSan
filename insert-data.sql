use khachsan

delete from chi_tiet_dich_vu;
delete from chi_tiet_hoa_don;
delete from hoa_don;

delete from chi_tiet_phieu_dat_phong;
delete from phieu_dat_phong;

delete from dich_vu
delete from nhan_vien

delete from tai_khoan
delete from khach_hang
delete from vai_tro

delete from hinh_anh_phong;
delete from phong;
delete from tang;
delete from loai_phong;

delete from ca_lam_viec;


Insert into loai_phong(ten_loai_phong, mo_ta_loai_phong) values
(N'Phòng STD', N'Phòng đơn giản với những trang bị tối thiểu, có diện tích nhỏ'),
(N'Phòng SUP', N'Trang bị nhiều trang thiết bị tiện nghi, có view đẹp, diện tích trung bình'),
(N'Phòng DLX', N'Diện tích rộng, có tầm nhìn đẹp với các trang thiết bị cao cấp'),
(N'Phòng SUT', N'Có phòng khách và phòng ngủ riêng biệt, có ban công với view đẹp nhất khách sạn');

Insert into tang(ten_tang) values
(N'Tầng 1'),
(N'Tầng 2'),
(N'Tầng 3'),
(N'Tầng 4'),
(N'Tầng 5');

Insert into phong(ma_phong, mo_ta_phong, ten_phong, trang_thai_phong, mang_thu_cung, gia_phong, duoc_hut_thuoc, suc_chua, so_giuong, ma_tang, ma_loai_phong) values
('0101', N'Phòng đơn giản với những trang bị tối thiểu, có diện tích nhỏ', N'Phòng 1', 1, 1, 10000, 1, 4, 2, 1, 1),
('0102', N'Trang bị nhiều trang thiết bị tiện nghi, có view đẹp, diện tích trung bình', N'Phòng 2', 1, 1, 20000, 0, 2, 1, 1, 2),
('0103', N'Diện tích rộng, có tầm nhìn đẹp với các trang thiết bị cao cấp', N'Phòng 3', 0, 0, 30000, 0, 1, 1, 1, 3),
('0104', N'Có phòng khách và phòng ngủ riêng biệt, có ban công với view đẹp nhất khách sạn', N'Phòng 4', 0, 1, 50000, 1, 5, 4, 1, 4),
('0105', N'Trang bị nhiều trang thiết bị tiện nghi, có view đẹp, diện tích trung bình', N'Phòng 5', 1, 1, 20000, 0, 4, 3, 1, 2),
('0106', N'Phòng đơn giản với những trang bị tối thiểu, có diện tích nhỏ', N'Phòng 6', 1, 0, 10000, 1, 6, 6, 1, 1),

('0201', N'Phòng đơn giản với những trang bị tối thiểu, có diện tích nhỏ', N'Phòng 1', 1, 0, 5000, 0, 3, 2, 2, 1),
('0202', N'Trang bị nhiều trang thiết bị tiện nghi, có view đẹp, diện tích trung bình', N'Phòng 2', 1, 1, 10000, 1, 5, 5, 2, 2),
('0203', N'Diện tích rộng, có tầm nhìn đẹp với các trang thiết bị cao cấp', N'Phòng 3', 0, 0, 15000, 0, 7, 6, 2, 3),
('0204', N'Có phòng khách và phòng ngủ riêng biệt, có ban công với view đẹp nhất khách sạn', N'Phòng 4', 0, 1, 20000, 1, 7, 7, 2, 4),
('0205', N'Có phòng khách và phòng ngủ riêng biệt, có ban công với view đẹp nhất khách sạn', N'Phòng 5', 0, 0, 30000, 1, 8, 8, 2, 4),
('0206', N'Phòng đơn giản với những trang bị tối thiểu, có diện tích nhỏ', N'Phòng 6', 0, 1, 20000, 0, 1, 1, 2, 1),

('0301', N'Phòng đơn giản với những trang bị tối thiểu, có diện tích nhỏ', N'Phòng 1', 0, 1, 12000, 1, 2, 2, 3, 1),
('0302', N'Trang bị nhiều trang thiết bị tiện nghi, có view đẹp, diện tích trung bình', N'Phòng 2', 1, 1, 40000, 1, 2, 1, 3, 2),
('0303', N'Diện tích rộng, có tầm nhìn đẹp với các trang thiết bị cao cấp', N'Phòng 3', 0, 1, 12000, 1, 3, 3, 3, 3),
('0304', N'Có phòng khách và phòng ngủ riêng biệt, có ban công với view đẹp nhất khách sạn', N'Phòng 4', 1, 1, 50000, 1, 4, 4, 3, 4),
('0305', N'Diện tích rộng, có tầm nhìn đẹp với các trang thiết bị cao cấp', N'Phòng 5', 0, 1, 35000, 1, 4, 3, 3, 3),
('0306', N'Phòng đơn giản với những trang bị tối thiểu, có diện tích nhỏ', N'Phòng 6', 1, 0, 10000, 0, 1, 1, 3, 1),

('0401', N'Phòng đơn giản với những trang bị tối thiểu, có diện tích nhỏ', N'Phòng 1', 0, 1, 10000, 1, 2, 1, 4, 1),
('0402', N'Trang bị nhiều trang thiết bị tiện nghi, có view đẹp, diện tích trung bình', N'Phòng 2', 0, 1, 20000, 0, 3, 2, 4, 2),
('0403', N'Diện tích rộng, có tầm nhìn đẹp với các trang thiết bị cao cấp', N'Phòng 3', 0, 0, 30000, 1, 4, 3, 4, 3),
('0404', N'Có phòng khách và phòng ngủ riêng biệt, có ban công với view đẹp nhất khách sạn', N'Phòng 4', 0, 1, 5000, 1, 4, 4, 4, 4),
('0405', N'Phòng đơn giản với những trang bị tối thiểu, có diện tích nhỏ', N'Phòng 5', 0, 1, 12000, 0, 5, 5, 4, 1),
('0406', N'Phòng đơn giản với những trang bị tối thiểu, có diện tích nhỏ', N'Phòng 6', 1, 1, 13000, 1, 6, 5, 4, 1),

('0501', N'Phòng đơn giản với những trang bị tối thiểu, có diện tích nhỏ', N'Phòng 1', 0, 1, 30000, 1, 7, 7, 5, 1),
('0502', N'Trang bị nhiều trang thiết bị tiện nghi, có view đẹp, diện tích trung bình', N'Phòng 2', 1, 0, 10000, 1, 1, 1, 5, 2),
('0503', N'Diện tích rộng, có tầm nhìn đẹp với các trang thiết bị cao cấp', N'Phòng 3', 1, 0, 4000, 1, 2, 1, 5, 3),
('0504', N'Có phòng khách và phòng ngủ riêng biệt, có ban công với view đẹp nhất khách sạn', N'Phòng 4', 1, 1, 8000, 1, 3, 2, 5, 4),
('0505', N'Phòng đơn giản với những trang bị tối thiểu, có diện tích nhỏ', N'Phòng 5', 1, 1, 9000, 0, 3, 3, 5, 1),
('0506', N'Phòng đơn giản với những trang bị tối thiểu, có diện tích nhỏ', N'Phòng 6', 0, 1, 55000, 0, 4, 3, 5, 1);


Insert into hinh_anh_phong(ma_phong, hinh_anh_phong) values
('0101', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW8OHFXYiMye-iZhQxLQdgO7n-cd-2o-aGJGFizObT8Mc88FeMHmBmnQzjXY8sAa3MUHA&usqp=CAU'),
('0102', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9HGGkFWqa2Agtm6WpOwAuz16NEGdMTzu1sbdWFr24aeuw7QdFuoj7gBULAGJFbnsFvLE&usqp=CAU'),
('0103', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdfLuJaAVHCnjqnwPmgXAkH-pZENovp48ZQkZpukUmFUreQZGXAHvGR7RonA5PB3GALKY&usqp=CAU'),
('0104', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrGXdqAs3mfIj_PPhQNf2rRius1dMeLXjPQ3vmstWiZI_n6s9gf-eS2sR2o129E8-_0Ss&usqp=CAU'),
('0105', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNzxUYI9dohyejsl0Gqpp-IsZwo47BkzkUI_D-fULeyw60gGpZTbyV9rxT68nENQbiTAw&usqp=CAU'),
('0106', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4M190ig71cH8eQdGN8oqmQCHczvwiY1AncNe7vOjz3RhM21Mij1yB2wm0XtoMvfm3D9g&usqp=CAU'),

('0201', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5e6i3lL0icEYvIuViRu_TiAr1AMOBRlKe1wlZqikvqCHQLeABl4uPHvP1XeqZZEamUjI&usqp=CAU'),
('0202', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfkDCnX5NVxV86DOGs3K1S9XrRJu29x4TcDE4oI5-LFW-qBgCKROm4_flPxdOQw5YC3ek&usqp=CAU'),
('0203', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7svCPEzFZWJ72O5dw8B67zvI69Xx6WEY2Ojl2wSYvOM56V9t3PiPEfighSaPN9k4J9Yg&usqp=CAU'),
('0204', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWPnCuL3QmvmXUTw5EwZMR-uFWDZf8LuilHwPIjouKvpin44zCgGoMMwi_80yJU4p3iJw&usqp=CAU'),
('0205', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzRp_xBq796b_0j772v_3TwQpFqYuzze7n5_yBhTnjMHEV3VNDnIRGZmfh_HTRnskZY_8&usqp=CAU'),
('0206', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxxTNHft_VuE5Dlom23EA-mNi32jB--sC7Ag&usqp=CAU'),

('0301', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT28zj14-yTsc98U9rpoptPCYIUdingXLjgLA&usqp=CAU'),
('0302', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRCt1y9SJOtR_Q0mGkodlXprmApW4I7ZayOA&usqp=CAU'),
('0303', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-5x2r0lNLmf0CXpCTfK6QiJClHl_nxEDFag&usqp=CAU'),
('0304', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCAHQVkBwebZ9WVqBMtqNgAg4nJ_dmju1COg&usqp=CAU'),
('0305', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ3a_HpPqY0w_kKpWhNSQm58xS_KWDyLyAVA&usqp=CAU'),
('0306', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvH9GcR3soVPIwuduPdJj-1jNM4belfrhykg&usqp=CAU'),

('0401', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKHnKkgP-7Qn1HViior82LsOkoQQVLQy0OTA&usqp=CAU'),
('0402', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEh5IVwqerHVVYHx4BeiMv3dLxDNEOcrEMvQ&usqp=CAU'),
('0403', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1_rg9bj0tWA16z94VmbQB1B2yswBfVVzomg&usqp=CAU'),
('0404', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRdXvw3Ue6roTx78S4lPRxCjzC3fRXVZb8Gw&usqp=CAU'),
('0405', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPh3-7SVe2op3GufdEate5f5yPvdR2J3_Hog&usqp=CAU'),
('0406', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJG--0PmjRMIgT3JPzAiqIQjx_YqxDoHyElA&usqp=CAU'),

('0501', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcuwt434v5yZGlSWkUczLXNT4uecq3JYrM2A&usqp=CAU'),
('0502', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDOQg-v1Rt6c1FkNf0upzFq8KBsQ8BVOUuw&usqp=CAU'),
('0503', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLAQuSW8Ti-RDYzt2eqv1LXV2Bm4UPx5tzbg&usqp=CAU'),
('0504', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU3xQ3tTwlI_RBrytr5hfdqkGPcZVpF7UgJg&usqp=CAU'),
('0505', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx3Ywwxh17JOEIBcVjuOyYP5V7HWFGQ7pwrA&usqp=CAU'),
('0506', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG6z03IpAuO5DSxn-2o-AxG7x2MRA4ShOPNA&usqp=CAU'),

('0101', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIpt2-sXqe-aizMYMTXh4hCAgDOAxZ14lLNw&usqp=CAU'),
('0102', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDq7PEWI-Cp9kX9Q34rPIjI3FRnMnJp0BSVw&usqp=CAU'),
('0103', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR1YZ_Sh70ojPOY4ZDEyW1KH0PDSEKJdoJLA&usqp=CAU'),
('0104', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvN_JWB0OHftMF31FBdW2aA1QNI6EEfR0Jsw&usqp=CAU'),
('0105', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJymAoO4KEm2r48Si5rCh4A8NvnprFlXtueA&usqp=CAU'),
('0106', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRihae9luY91rTcK756i7dW_KFnHPgdNY-ryw&usqp=CAU'),

('0201', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSntjP-sEJNdX0jaQ8yOZEJS1eF0K0HYVYDMQ&usqp=CAU'),
('0202', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ67SirOlvby8EUk_7PrE353ymxBwT9LXrlKw&usqp=CAU'),
('0203', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Ndqryux2SizdvrKX3pl38y7iDf5UlFtsjw&usqp=CAU'),
('0204', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK3Y708vap2CeA-iV3x9N0rTCzySf281RROA&usqp=CAU'),
('0205', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnTBWOREq5vmINCNu1_BRh32en_z3i1DK_ww&usqp=CAU'),
('0206', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Ot7w75oqSdZ7mB8ViqmCd79tOB2C_53_XA&usqp=CAU'),

('0301', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnyfDnv5V883tleWEQUEwoY8N3i7QduFDxyA&usqp=CAU'),
('0302', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBf0c3CMiEKqDjMPLheDHB54mkTZMAbxTf6w&usqp=CAU'),
('0303', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ92mp0Boq3VcBxnqMePcAyPIPeW-c8ADj-bQ&usqp=CAU'),
('0304', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSch8N3VsO_-qxvjX7nWhZr3GjT65CSpFFGaQ&usqp=CAU'),
('0305', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR47nSfV_Evz3zyhq8KQacGf_FwmRXekieA3Q&usqp=CAU'),
('0306', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbJ3uFxqmndQ9_U8wlOo0sv0MqujDNuBSZg&usqp=CAU'),

('0401', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzgUCEHhD9ClbUX0D7iRk8ilaYJStZx5RhSQ&usqp=CAU'),
('0402', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzzJvHeMceErxkC-pg-oRqBMk5uZHIaLEV1w&usqp=CAU'),
('0403', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgo7f-lyNTgF-b_PhBoFIJveugv7uThZEezA&usqp=CAU'),
('0404', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyqMKPHUs_sSK5wsL_kxY5SmXKWM9s1PnBdw&usqp=CAU'),
('0405', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9IAbM6eMznj5udZfj2ymZODAFpOXkurBDg&usqp=CAU'),
('0406', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGZi2RSkbK7ABgCYVa4j05b71YQchL6r9Yw&usqp=CAU'),

('0501', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF8TGu-S1gKqN8DIk87jE8V-V4B2e2stU1Jw&usqp=CAU'),
('0502', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMfDcODJ3LHPawvuPTuI688A0Yue_mopFtvA&usqp=CAU'),
('0503', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT88jBoK56h3c_wqanusF5z5yQ1TCMYPjp6RA&usqp=CAU'),
('0504', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCtOk7iOLyRGqPVjqvEgYOzhFQOuc2LwQzqA&usqp=CAU'),
('0505', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjHyr1qEVwjci-odxRRSKeluS7oGKLd4rikw&usqp=CAU'),
('0506', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-gSljIcniHWOYEqZhcxCebSX5iN80B7Hl7g&usqp=CAU');


insert into loai_dich_vu (don_vi_loai_dich_vu, ten_loai_dich_vu) values 
(N'chai', N'nước(chai)'),
(N'lon', N'nước(lon)'),
(N'thùng', N'nước(thùng)'),
(N'suất', N'thức ăn(suất)'),
(N'phần', N'thức ăn(phần)'),
(N'thùng', N'thức ăn(thùng)'),
(N'hộp', N'thức ăn(hộp)'),
(N'gói', N'thức ăn(gói)'),
(N'cái', N'thức ăn(cái)'),
(N'bịch', N'thức ăn(bịch)'),
(N'ly', N'thức ăn(ly)');

insert into dich_vu (gia_dich_vu, so_luong, ten_dich_vu, ma_loai_dich_vu) values
(20000, 100, N'Nước suối Aqua', 1),
(30000, 50, N'Bia Heniken', 3),
(30000, 50, N'Bia Tiger', 2),
(300000, 50, N'Bia Heniken', 3),
(30000, 50, N'Pizza thập cẩm', 5),
(30000, 50, N'Mì hảo hảo', 6),
(30000, 50, N'Bánh oreo', 7),
(15000, 150, N'Soda chanh', 2),
(15000, 250, N'String dâu', 1),
(10000, 150, N'Bò cụng', 2),
(9000, 50, N'Trà chanh hạt chia Fuze Tea', 1),
(41000, 150, N'Nước gạo hàn quốc OKF', 1),
(270000, 350, N'Cà phê sữa đá NesCafe', 3),
(128000, 50, N'Mì Kokomi chua cay', 6),
(18000, 150, N'Mì khoai tây cung đình', 11),
(25000, 150, N'Mì khoai tây Omachi sốt thái', 11),
(30000, 50, N'Kẹo dẻo', 10);

INSERT INTO vai_tro(ten_vai_tro) values('ROLE_EMPLOYEE'),('ROLE_MANAGEMENT');
INSERT INTO tai_khoan(da_kich_hoat,mat_khau,ten_tai_khoan,ma_vai_tro) values 
(1,'$2a$10$ggqnnTxpQEg2jqu9MGU5QeeK1X78pLukgyzlRA1opIqdnMuUa/Oli','+84392589774',1),
(1,'$2a$10$ggqnnTxpQEg2jqu9MGU5QeeK1X78pLukgyzlRA1opIqdnMuUa/Oli','+84523564371',2),
(1,'$2a$10$ggqnnTxpQEg2jqu9MGU5QeeK1X78pLukgyzlRA1opIqdnMuUa/Oli','+84111111111',1),
(1,'$2a$10$ggqnnTxpQEg2jqu9MGU5QeeK1X78pLukgyzlRA1opIqdnMuUa/Oli','+82222222222',1),
(1,'$2a$10$ggqnnTxpQEg2jqu9MGU5QeeK1X78pLukgyzlRA1opIqdnMuUa/Oli','+84333333333',1);

/*
INSERT INTO tai_khoan(da_kich_hoat,mat_khau,ten_tai_khoan,ma_vai_tro) values 
(0,'$2a$10$ggqnnTxpQEg2jqu9MGU5QeeK1X78pLukgyzlRA1opIqdnMuUa/Oli','+84392589772',1);
insert into nhan_vien(cccd, dia_chi, email, ho_ten, luong_co_ban, ngay_sinh,ngay_vao_lam, so_dien_thoai,ma_tai_khoan) values 
('012345678905', N'12 Trần Hưng Đạo','lap@gmail.com', N'Nguyễn Võ Vươn Lập',100000, '2001-03-19T10:00:56.117+00:00','2022-03-19T10:00:56.117+00:00', '+84392589772', 6);
*/

insert into nhan_vien(cccd, dia_chi, email, ho_ten, luong_co_ban, ngay_sinh,ngay_vao_lam, so_dien_thoai,ma_tai_khoan) values 
('012345678900', N'12 Trần Hưng Đạo','lap@gmail.com', N'Nguyễn Võ Vươn Lập',100000, '2001-03-19T10:00:56.117+00:00','2022-03-19T10:00:56.117+00:00', '+84392589774',1),
('012345678901', N'19 Trần Hưng Đạo','minh@gmail.com',N'Nguyễn Lâm Nhật Minh',300000, '2001-04-19T10:00:56.117+00:00','2023-03-19T10:00:56.117+00:00', '+84523564371',2),
('012345678902', N'12 Lê Lợi','nam@gmail.com', N'Lê Công Nam',200000, '2000-03-30T10:00:56.117+00:00','2022-12-20T10:00:56.117+00:00', '+84111111111',3),
('012345678903', N'141 Lê Duẩn','huong@gmail.com', N'Trần Thanh Hương',150000, '2001-02-12T10:00:56.117+00:00','2022-04-22T10:00:56.117+00:00', '+82222222222',4),
('012345678904', N'515 Trường Chinh','long@gmail.com', N'Lê Thành Long',120000, '2001-06-20T10:00:56.117+00:00','2022-05-21T10:00:56.117+00:00', '+84333333333',5);

Insert into khach_hang(cccd_khach_hang, dia_chi_kh, email_kh, ho_ten, so_dien_thoai_kh) values 
('123456789000', N'12 Lê Lợi', 'test@gmail.com', N'Trần Quang Linh', '0123456789'),
('123456789001', N'12 Lê Lai', 'test1@gmail.com', N'Trần Quang Thái', '0123456788'),
('123456789002', N'12 Huy Giáp', 'test2@gmail.com', N'Thái Anh Văn', '0123456787'),
('123456789003', N'12 Ánh Thủ', 'test3@gmail.com', N'Phùng Anh Tú', '0123456786'),
('123456789004', N'12 Lê Lai', 'test4@gmail.com', N'Bùi Xuân Nhàn', '0123456785'),
('123456789005', N'12 Hưng Đạo', 'test5@gmail.com', N'Đỗ Anh Dũng', '0123456784'),
('123456789006', N'12 Quốc Nghĩa', 'test6@gmail.com', N'Nguyễn Cửu Quang', '0123456783'),
('123456789007', N'12 Lê Quốc', 'test7@gmail.com', N'Đỗ Thị Diệu', '0123456782'),
('123456789008', N'12 Lê Gia Định', 'test8@gmail.com', N'Đỗ Xuân Cường', '0123456781'),
('123456789009', N'12 Lê Công Định', 'test9@gmail.com', N'Nguyễn Ánh Thủ', '0123456780'),
('123456789111', N'12 Lê Công Thành', 'test10@gmail.com', N'Đỗ Xuân Kiên', '0123456100'),
('123456789112', N'12 Tân Xuân', 'test11@gmail.com', N'Lưu Bá Trạc', '0123456101'),
('123456789113', N'12 Lê Tấn', 'test12@gmail.com', N'Bùi Tiến Dũng', '0123456102'),
('123456789114', N'12 Lê Lai', 'test13@gmail.com', N'Đỗ Bá Lam', '0123456103'),
('123456789115', N'12 Lê Công', 'test14@gmail.com', N'Mai Anh Tài', '0123456104');

Insert into phieu_dat_phong(ghi_chu_dat_phong,giam_gia,ngay_dat_phong,ngay_nhan_phong,ngay_tra_phong,trang_thai_dat_phong,ma_khach_hang)
values (null,0,'2023-04-10 15:53:55.874000','2023-04-10 15:53:55.874000','2023-04-10 16:53:35.196000','HOAN_TAT',1),
(null,0,'2023-04-10 15:56:19.482000','2023-04-10 15:56:19.482000','2023-04-10 16:56:04.324000','HOAN_TAT',2),
(null,0,'2023-04-10 15:57:09.818000','2023-04-10 15:57:09.818000','2023-04-10 17:56:59.628000','HOAN_TAT',3),
(null,0,'2023-04-10 15:57:36.363000','2023-04-10 15:57:36.363000','2023-04-10 17:57:25.963000','HOAN_TAT',4),
(null,0,'2023-04-10 15:58:01.906000','2023-04-10 15:58:01.906000','2023-04-10 19:57:48.565000','HOAN_TAT',5),
(null,0,'2023-04-10 15:58:24.035000','2023-04-10 15:58:24.035000','2023-04-10 19:58:14.788000','HOAN_TAT',6),
(null,0,'2023-04-10 15:58:46.514000','2023-04-10 15:58:46.514000','2023-04-10 17:58:36.859000','HOAN_TAT',7),
(null,0,'2023-04-10 15:59:23.002000','2023-04-10 15:59:23.002000','2023-04-10 18:59:02.659000','HOAN_TAT',8),
(null,0,'2023-04-10 16:00:18.786000','2023-04-10 16:00:18.786000','2023-04-10 21:00:04.371000','HOAN_TAT',9),
(null,0,'2023-04-10 16:00:51.514000','2023-04-11 16:00:32.000000','2023-04-11 20:00:37.000000','HOAN_TAT',10),
(null,0,'2023-04-10 16:01:16.106000','2023-04-11 16:00:56.000000','2023-04-11 18:00:58.000000','HOAN_TAT',11),
(null,0,'2023-04-10 16:01:36.979000','2023-04-11 16:01:23.000000','2023-04-11 18:01:25.000000','HOAN_TAT',12);

INSERT INTO chi_tiet_phieu_dat_phong (ma_phieu_dat_phong,ma_phong) values 
(1,'0105'),
(1,'0106'),
(2,'0102'),
(3,'0304'),
(4,'0406'),
(5,'0101'),
(6,'0302'),
(7,'0504'),
(7,'0505'),
(8,'0201'),
(8,'0302'),
(9,'0502'),
(9,'0503'),
(10,'0504'),
(10,'0505'),
(11,'0302'),
(11,'0304'),
(12,'0502'),
(12,'0503');

INSERT INTO hoa_don (ngay_lap,ngay_nhan_phong,ngay_tra_phong,tien_nhan,ma_khach_hang,ma_nhan_vien,ma_phieu_dat_phong) values 
('2022-01-04 00:41:20.526000','2023-04-10 15:53:55.874000','2023-04-10 16:53:35.196000',9000000,1,1,1),
('2022-02-04 00:41:20.5260000','2023-04-10 15:56:19.482000','2023-04-10 16:56:04.324000',9000000,1,2,2),
('2022-03-04 00:41:20.526000','2023-04-10 15:57:09.818000','2023-04-10 17:56:59.628000',9000000,1,1,3),
('2022-04-04 00:41:20.526000','2023-04-10 15:57:36.363000','2023-04-10 17:57:25.963000',9000000,1,2,4),
('2022-05-04 00:41:20.526000','2023-04-10 15:58:01.906000','2023-04-10 19:57:48.565000',9000000,1,1,5),
('2022-06-04 00:41:20.526000','2023-04-10 15:58:24.035000','2023-04-10 19:58:14.788000',9000000,1,2,6),
('2022-07-04 00:41:20.526000','2023-04-10 15:59:23.002000','2023-04-10 18:59:02.659000',9000000,1,1,7),
('2022-08-04 00:41:20.526000','2023-04-10 15:58:46.514000','2023-04-10 17:58:36.859000',9000000,1,2,8),
('2022-09-04 00:41:20.526000','2023-04-10 16:00:18.786000','2023-04-10 21:00:04.371000',9000000,1,1,9),
('2022-10-04 00:41:20.526000','2023-04-11 16:01:42.000000','2023-04-11 19:01:42.000000',9000000,1,2,10),
('2022-11-04 00:41:20.526000','2023-04-11 16:00:56.000000','2023-04-11 18:00:58.000000',9000000,1,1,11),
('2022-12-04 00:41:20.526000','2023-04-11 16:01:23.000000','2023-04-11 18:01:25.000000',9000000,1,2,12);


INSERT INTO chi_tiet_hoa_don(ma_hoa_don,ma_phong) values 
(1,'0105'),
(1,'0106'),
(2,'0102'),
(3,'0304'),
(4,'0406'),
(5,'0101'),
(6,'0302'),
(7,'0504'),
(7,'0505'),
(8,'0201'),
(8,'0302'),
(9,'0502'),
(9,'0503'),
(10,'0504'),
(10,'0505'),
(11,'0302'),
(11,'0304'),
(12,'0502'),
(12,'0503');


INSERT INTO chi_tiet_dich_vu(ma_dich_vu,ma_hoa_don,so_luong) values 
(1,1,2),
(2,1,5),
(3,2,3),
(4,3,4),
(5,4,6),
(6,5,1),
(7,6,3),
(8,7,4),
(9,7,1),
(10,8,2),
(11,8,3),
(1,9,4),
(2,9,5),
(3,10,2),
(4,10,3),
(5,11,4),
(6,11,2),
(7,12,1),
(8,12,5);

insert into ca_lam_viec (ten_ca, gio_bat_dau, so_gio, gio_ket_thuc) values
(N'Ca ngày', '06:00:00', 8, '14:00:00'),
(N'Ca chiều', '14:00:00', 8, '22:00:00'),
(N'Ca tối', '22:00:00', 8, '6:00:00');

/*
insert into bang_phan_cong (ngay_chinh_sua, ngay_phan_cong, ma_nhan_vien) values
('2023-04-13 00:41:20.526000', '2023-04-13 00:41:20.526000', 1),
('2023-04-13 00:41:20.526000', '2023-04-13 00:41:20.526000', 2);

insert into chi_tiet_phan_cong (ma_ca, ma_bang_phan_cong) values
(1, 1),
(2, 1),
(4, 1),
(1, 2),
(3, 2),
(5, 2);

insert into thu (ma_chi_tiet_phan_cong, thu) values
(1, 0),
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 0),
(2, 2),
(2, 4),
(2, 6),
(3, 5),
(3, 6),
(4, 1),
(4, 3),
(4, 5),
(5, 0),
(5, 2),
(5, 4),
(6, 6);
*/

insert into bang_phan_cong (ngay_chinh_sua, ngay_phan_cong, ngay_bat_dau, ma_nhan_vien) values
('2023-04-13 00:00:00.000000', '2023-04-13 00:00:00.000000', '2023-04-15 00:00:00', 1);

insert into chi_tiet_phan_cong (ma_ca, ma_bang_phan_cong) values
(1, 1),
(2, 1),
(3, 1);

insert into thu (ma_chi_tiet_phan_cong, thu) values
(1, 0),
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 0),
(2, 2),
(2, 4),
(2, 6),
(3, 5),
(3, 6);

insert into bang_cham_cong (ma_chi_tiet_phan_cong, thu, ma_nhan_vien, ngay_cham_cong) values
(1, 0, 1, '2023-04-08 00:00:00'),
(2, 0, 1, '2023-04-08 00:00:00');

insert into bang_luong (ma_bang_luong, thang, nam, ma_nhan_vien) values
('042023NV1', 4, 2023, 1);

insert into chi_tiet_bang_luong (ma_bang_cham_cong, ma_bang_luong) values
(1, '042023NV1'),
(2, '042023NV1');

update hoa_don set ngay_lap ='2023-04-13 00:41:20.526000' where ma_hoa_don=15

/*
update hoa_don set ngay_lap ='2023-01-04 00:41:20.526000' where ma_hoa_don=4
update hoa_don set ngay_lap ='2023-02-04 00:41:20.526000' where ma_hoa_don=5
update hoa_don set ngay_lap ='2023-03-04 00:41:20.526000' where ma_hoa_don=6
update hoa_don set ngay_lap ='2023-04-04 00:41:20.526000' where ma_hoa_don=7
update hoa_don set ngay_lap ='2023-05-04 00:41:20.526000' where ma_hoa_don=8
update hoa_don set ngay_lap ='2023-06-04 00:41:20.526000' where ma_hoa_don=9
update hoa_don set ngay_lap ='2023-08-04 00:41:20.526000' where ma_hoa_don=10
update hoa_don set ngay_lap ='2023-07-04 00:41:20.526000' where ma_hoa_don=11
update hoa_don set ngay_lap ='2023-09-04 00:41:20.526000' where ma_hoa_don=12
update hoa_don set ngay_lap ='2023-10-04 00:41:20.526000' where ma_hoa_don=13
update hoa_don set ngay_lap ='2023-11-04 00:41:20.526000' where ma_hoa_don=14
update hoa_don set ngay_lap ='2023-12-04 00:41:20.526000' where ma_hoa_don=15
*/





package com.example.hotelserver.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotelserver.dto.ChiTietDichVuDto;
import com.example.hotelserver.dto.DatDichVuDto;
import com.example.hotelserver.dto.HoaDonDto;
import com.example.hotelserver.dto.PhieuDatPhongDto;
import com.example.hotelserver.dto.PhongResponseDto;
import com.example.hotelserver.dto.TaoHoaDonRequestDto;
import com.example.hotelserver.entity.ChiTietDichVu;
import com.example.hotelserver.entity.ChiTietHoaDon;
import com.example.hotelserver.entity.DichVu;
import com.example.hotelserver.entity.HoaDon;
import com.example.hotelserver.entity.KhachHang;
import com.example.hotelserver.entity.NhanVien;
import com.example.hotelserver.entity.PhieuDatPhong;
import com.example.hotelserver.entity.Phong;
import com.example.hotelserver.repository.ChiTietDichVuRepo;
import com.example.hotelserver.repository.ChiTietHoaDonRepo;
import com.example.hotelserver.repository.DichVuRepo;
import com.example.hotelserver.repository.HoaDonRepo;
import com.example.hotelserver.repository.KhachHangRepo;
import com.example.hotelserver.repository.NhanVienRepo;
import com.example.hotelserver.repository.PhongRepo;

@Service
public class HoaDonServiceImpl implements HoaDonService{
	@Autowired
	private HoaDonRepo hoaDonRepo;

	@Autowired
	private ChiTietHoaDonRepo chiTietHoaDonRepo;

	@Autowired
	private ChiTietDichVuRepo chiTietDichVuRepo;

	@Autowired
	private NhanVienRepo nhanVienRepo;

	@Autowired
	private PhongRepo phongRepo;

	@Autowired
	private KhachHangRepo khachHangRepo;

	@Autowired
	private DichVuRepo dichVuRepo;

	@Override
	public boolean themHoaDon(TaoHoaDonRequestDto hoaDonDto) {
		List<ChiTietHoaDon> dsChiTietHoaDon = new ArrayList<>();
		List<String> dsMaPhong = hoaDonDto.getDsMaPhong();
		if (!dsMaPhong.isEmpty()) {
			for (String ma : dsMaPhong) {
				ChiTietHoaDon ct = new ChiTietHoaDon(null, new Phong(ma
						, null, false, null, null, null, null, 0, false, false, 0, 0));
				if (hoaDonDto.getMaHoaDon() != 0) {
					ct.setHoaDon(new HoaDon(hoaDonDto.getMaHoaDon(), null, null, null, 0, null, null, null, null, null));
				}
				dsChiTietHoaDon.add(ct);
			}
		}
		NhanVien tempNV = nhanVienRepo.findById(hoaDonDto.getMaNhanVien()).get();
		KhachHang tempKH = khachHangRepo.findById(hoaDonDto.getMaKhachHang()).get();
		HoaDon hoaDon = new HoaDon(hoaDonDto.getMaHoaDon()
				, hoaDonDto.getNgayLap()
				, hoaDonDto.getNgayNhanPhong()
				, hoaDonDto.getNgayTraPhong()
				, hoaDonDto.getTienNhan()
				, dsChiTietHoaDon, null
				, new PhieuDatPhong(hoaDonDto.getMaPhieuDatPhong(), null, 0, null, null, null, null, null, null) 
				, tempKH
				, tempNV);
		HoaDon newHoaDon = hoaDonRepo.save(hoaDon);
		if (newHoaDon != null) {
			List<ChiTietHoaDon> dsChiTiet = newHoaDon.getDsChiTietHoaDon();
			if (!dsChiTiet.isEmpty()) {
				for (ChiTietHoaDon chiTietHoaDon : dsChiTiet) {
					chiTietHoaDonRepo.save(new ChiTietHoaDon(newHoaDon, chiTietHoaDon.getPhong()));
				}
			}
			return true;
		}
		return false;
	}
	@Override
	public List<HoaDonDto> layDanhSachHoaDonDeThongKeTheoPhong(Map<String, Object> request) {
		List<HoaDonDto> dsHoaDonDto = new ArrayList<>();
		System.out.println("Request Nhận Thống Kế  : " + request);

			Instant tuNgay = Instant.parse(request.get("tuNgay").toString());
			Instant denNgay = Instant.parse(request.get("denNgay").toString());
			Date start = Date.from(tuNgay);
			int year = start.getYear()+1900;
		System.out.println("Năm chọn : " + year);
			Date end = Date.from(denNgay);
			try {
//				List<HoaDon> dsHoaDon = hoaDonRepo.layHoaDonDaThanhToanTheoNgayCuThe(start,end);
				List<HoaDon> dsHoaDon = hoaDonRepo.layHoaDonDaThanhToanTheoNam(year);
				for (HoaDon hoaDon : dsHoaDon) {
					KhachHang khachHang = khachHangRepo.findById(hoaDon.getKhachHang().getMaKhachHang()).get();
					HoaDonDto hoaDonDto = HoaDonDto.builder()
							.maHoaDon(hoaDon.getMaHoaDon())
							.ngayLap(hoaDon.getNgayLap())
							.ngayNhanPhong(hoaDon.getNgayNhanPhong())
							.ngayTraPhong(hoaDon.getNgayTraPhong())
							.tienNhan(hoaDon.getTienNhan())
							.phieuDatPhong(hoaDon.getPhieuDatPhong())
							.nhanVien(hoaDon.getNhanVien())
							.build();
					List<Phong> dsPhong = new ArrayList<>();
					List<String> dsMaPhong = hoaDonRepo.layMaPhongTuMaHoaDon(hoaDon.getMaHoaDon());
					if (!dsMaPhong.isEmpty()) {
						for (String maPhong : dsMaPhong) {
							Phong phong = phongRepo.findById(maPhong).get();
							dsPhong.add(phong);
						}
					}
					List<PhongResponseDto> phongResponseDtos = new ArrayList<>();
					if (!dsPhong.isEmpty()) {
						for (Phong phong : dsPhong) {
							phongResponseDtos.add(convertPhongToPhongDto(phong));
						}
					}
					List<Map<String, Object>> listObject = hoaDonRepo.layChiTietDichVuTuMaHoaDon(hoaDon.getMaHoaDon());
					List<ChiTietDichVuDto> dsChiTietDichVuDto = new ArrayList<>();
					if (!listObject.isEmpty()) {
						for (Map<String, Object> obj : listObject) {
							ChiTietDichVuDto chiTietDichVuDto = new ChiTietDichVuDto(Long.parseLong(obj.get("maDichVu").toString())
									, obj.get("tenDichVu").toString(), Double.parseDouble(obj.get("giaDichVu").toString())
									, Integer.parseInt(obj.get("soLuong").toString()), obj.get("tenLoaiDichVu").toString());
							dsChiTietDichVuDto.add(chiTietDichVuDto);
						}
					}
					hoaDonDto.setDsPhong(phongResponseDtos);
					hoaDonDto.setDsChiTietDichVuDto(dsChiTietDichVuDto);
					hoaDonDto.setKhachHang(khachHang);
					dsHoaDonDto.add(hoaDonDto);
				}
			}catch (Exception e) {
				System.out.println("Error at layHoaDonDeThongKePhong: " + e);
			}
		return dsHoaDonDto;
	}
	@Override
	public List<HoaDonDto> layDanhSachHoaDonDeThongKeTheoNgay(Map<String, Object> request) {
		List<HoaDonDto> dsHoaDonDto = new ArrayList<>();
		System.out.println("Request Nhận Thống Kế  : " + request);
		Instant tuNgay = Instant.parse(request.get("tuNgay").toString());
		Instant denNgay = Instant.parse(request.get("denNgay").toString());
		Date start = Date.from(tuNgay);
		Date end = Date.from(denNgay);
		try {
				List<HoaDon> dsHoaDon = hoaDonRepo.layHoaDonDaThanhToanTheoNgayCuThe(start,end);
			for (HoaDon hoaDon : dsHoaDon) {
				KhachHang khachHang = khachHangRepo.findById(hoaDon.getKhachHang().getMaKhachHang()).get();
				HoaDonDto hoaDonDto = HoaDonDto.builder()
						.maHoaDon(hoaDon.getMaHoaDon())
						.ngayLap(hoaDon.getNgayLap())
						.ngayNhanPhong(hoaDon.getNgayNhanPhong())
						.ngayTraPhong(hoaDon.getNgayTraPhong())
						.tienNhan(hoaDon.getTienNhan())
						.phieuDatPhong(hoaDon.getPhieuDatPhong())
						.nhanVien(hoaDon.getNhanVien())
						.build();
				List<Phong> dsPhong = new ArrayList<>();
				List<String> dsMaPhong = hoaDonRepo.layMaPhongTuMaHoaDon(hoaDon.getMaHoaDon());
				if (!dsMaPhong.isEmpty()) {
					for (String maPhong : dsMaPhong) {
						Phong phong = phongRepo.findById(maPhong).get();
						dsPhong.add(phong);
					}
				}
				List<PhongResponseDto> phongResponseDtos = new ArrayList<>();
				if (!dsPhong.isEmpty()) {
					for (Phong phong : dsPhong) {
						phongResponseDtos.add(convertPhongToPhongDto(phong));
					}
				}
				List<Map<String, Object>> listObject = hoaDonRepo.layChiTietDichVuTuMaHoaDon(hoaDon.getMaHoaDon());
				List<ChiTietDichVuDto> dsChiTietDichVuDto = new ArrayList<>();
				if (!listObject.isEmpty()) {
					for (Map<String, Object> obj : listObject) {
						ChiTietDichVuDto chiTietDichVuDto = new ChiTietDichVuDto(Long.parseLong(obj.get("maDichVu").toString())
								, obj.get("tenDichVu").toString(), Double.parseDouble(obj.get("giaDichVu").toString())
								, Integer.parseInt(obj.get("soLuong").toString()), obj.get("tenLoaiDichVu").toString());
						dsChiTietDichVuDto.add(chiTietDichVuDto);
					}
				}
				hoaDonDto.setDsPhong(phongResponseDtos);
				hoaDonDto.setDsChiTietDichVuDto(dsChiTietDichVuDto);
				hoaDonDto.setKhachHang(khachHang);
				dsHoaDonDto.add(hoaDonDto);
			}
		}catch (Exception e) {
			System.out.println("Error at layHoaDonDeThongKePhong: " + e);
		}
		return dsHoaDonDto;
	}
	@Override
	public List<HoaDonDto> layDanhSachHoaDonDeThongKeTheoPhongTheoThang(Map<String, Object> request) {
		List<HoaDonDto> dsHoaDonDto = new ArrayList<>();
		System.out.println("Request Nhận Thống Kế Theo Tháng  : " + request);
		Instant tuNgay = Instant.parse(request.get("tuNgay").toString());
		Date start = Date.from(tuNgay);
		int year = start.getYear()+1900;
		int month = start.getMonth()+1;
		System.out.println("Năm chọn : " + year);
		System.out.println("Tháng chọn : " + month);

		try {
			List<HoaDon> dsHoaDon = hoaDonRepo.layHoaDonDaThanhToanTheoThang(year,month);
			for (HoaDon hoaDon : dsHoaDon) {
				KhachHang khachHang = khachHangRepo.findById(hoaDon.getKhachHang().getMaKhachHang()).get();
				HoaDonDto hoaDonDto = HoaDonDto.builder()
						.maHoaDon(hoaDon.getMaHoaDon())
						.ngayLap(hoaDon.getNgayLap())
						.ngayNhanPhong(hoaDon.getNgayNhanPhong())
						.ngayTraPhong(hoaDon.getNgayTraPhong())
						.tienNhan(hoaDon.getTienNhan())
						.phieuDatPhong(hoaDon.getPhieuDatPhong())
						.nhanVien(hoaDon.getNhanVien())
						.build();
				List<Phong> dsPhong = new ArrayList<>();
				List<String> dsMaPhong = hoaDonRepo.layMaPhongTuMaHoaDon(hoaDon.getMaHoaDon());
				if (!dsMaPhong.isEmpty()) {
					for (String maPhong : dsMaPhong) {
						Phong phong = phongRepo.findById(maPhong).get();
						dsPhong.add(phong);
					}
				}
				List<PhongResponseDto> phongResponseDtos = new ArrayList<>();
				if (!dsPhong.isEmpty()) {
					for (Phong phong : dsPhong) {
						phongResponseDtos.add(convertPhongToPhongDto(phong));
					}
				}
				List<Map<String, Object>> listObject = hoaDonRepo.layChiTietDichVuTuMaHoaDon(hoaDon.getMaHoaDon());
				List<ChiTietDichVuDto> dsChiTietDichVuDto = new ArrayList<>();
				if (!listObject.isEmpty()) {
					for (Map<String, Object> obj : listObject) {
						ChiTietDichVuDto chiTietDichVuDto = new ChiTietDichVuDto(Long.parseLong(obj.get("maDichVu").toString())
								, obj.get("tenDichVu").toString(), Double.parseDouble(obj.get("giaDichVu").toString())
								, Integer.parseInt(obj.get("soLuong").toString()), obj.get("tenLoaiDichVu").toString());
						dsChiTietDichVuDto.add(chiTietDichVuDto);
					}
				}
				hoaDonDto.setDsPhong(phongResponseDtos);
				hoaDonDto.setDsChiTietDichVuDto(dsChiTietDichVuDto);
				hoaDonDto.setKhachHang(khachHang);
				dsHoaDonDto.add(hoaDonDto);
			}
		}catch (Exception e) {
			System.out.println("Error at layHoaDonDeThongKePhong: " + e);
		}
		return dsHoaDonDto;
	}
	@Override
	public List<HoaDonDto> layHoaDonTheoNgay() {
		List<HoaDonDto> dsHoaDonDto = new ArrayList<>();
		try {
			List<HoaDon> dsHoaDon = hoaDonRepo.layHoaDonChuaThanhToanSapXepTheoNgay();
			for (HoaDon hoaDon : dsHoaDon) {
				KhachHang khachHang = khachHangRepo.findById(hoaDon.getKhachHang().getMaKhachHang()).get();
//				PhieuDatPhong p = hoaDon.getPhieuDatPhong();
//				PhieuDatPhongDto phieuDatPhongDto = PhieuDatPhongDto.builder()
//					.maPhieuDatPhong(p.getMaPhieuDatPhong())
//					.ngayDatPhong(p.getNgayDatPhong())
//					.ngayTraPhong(p.getNgayTraPhong())
//					.ngayNhanPhong(p.getNgayNhanPhong())
//					.trangThaiDatPhong(p.getTrangThaiDatPhong())
//					.khachHang(khachHang)
//					.build();
						
				HoaDonDto hoaDonDto = HoaDonDto.builder()
						.maHoaDon(hoaDon.getMaHoaDon())
						.ngayLap(hoaDon.getNgayLap())
						.ngayNhanPhong(hoaDon.getNgayNhanPhong())
						.ngayTraPhong(hoaDon.getNgayTraPhong())
						.tienNhan(hoaDon.getTienNhan())
						.phieuDatPhong(hoaDon.getPhieuDatPhong())
						.nhanVien(hoaDon.getNhanVien())
						.build();
				List<Phong> dsPhong = new ArrayList<>();
				List<String> dsMaPhong = hoaDonRepo.layMaPhongTuMaHoaDon(hoaDon.getMaHoaDon());
				if (!dsMaPhong.isEmpty()) {
					for (String maPhong : dsMaPhong) {
						Phong phong = phongRepo.findById(maPhong).get();
						dsPhong.add(phong);
					}
				}
				List<PhongResponseDto> phongResponseDtos = new ArrayList<>();
				if (!dsPhong.isEmpty()) {
					for (Phong phong : dsPhong) {
						phongResponseDtos.add(convertPhongToPhongDto(phong));
					}
				}
				List<Map<String, Object>> listObject = hoaDonRepo.layChiTietDichVuTuMaHoaDon(hoaDon.getMaHoaDon());
				List<ChiTietDichVuDto> dsChiTietDichVuDto = new ArrayList<>();
				if (!listObject.isEmpty()) {
					for (Map<String, Object> obj : listObject) {
						ChiTietDichVuDto chiTietDichVuDto = new ChiTietDichVuDto(Long.parseLong(obj.get("maDichVu").toString())
								, obj.get("tenDichVu").toString(), Double.parseDouble(obj.get("giaDichVu").toString())
								, Integer.parseInt(obj.get("soLuong").toString()),  obj.get("tenLoaiDichVu").toString());
						dsChiTietDichVuDto.add(chiTietDichVuDto);
					}
				}
				hoaDonDto.setDsPhong(phongResponseDtos);
				hoaDonDto.setDsChiTietDichVuDto(dsChiTietDichVuDto);
				hoaDonDto.setKhachHang(khachHang);
				dsHoaDonDto.add(hoaDonDto);
			}
		} catch (Exception e) {
			System.out.println("Error at layPhieuDatPhong: " + e);
		}
		return dsHoaDonDto;
	}



	@Override
	public List<HoaDonDto> layHoaDonTheoNgayCCCD(String cccd) {
		List<HoaDonDto> dsHoaDonDto = new ArrayList<>();
		try {
			KhachHang khachHang = khachHangRepo.timKhachHangBangCCCD(cccd);
			if (khachHang != null) {
				List<HoaDon> dsHoaDon = hoaDonRepo.layHoaDonTheoKhachSapXepTheoNgay(khachHang.getMaKhachHang());
				for (HoaDon hoaDon : dsHoaDon) {
					HoaDonDto hoaDonDto = HoaDonDto.builder()
							.maHoaDon(hoaDon.getMaHoaDon())
							.ngayLap(hoaDon.getNgayLap())
							.ngayNhanPhong(hoaDon.getNgayNhanPhong())
							.ngayTraPhong(hoaDon.getNgayTraPhong())
							.tienNhan(hoaDon.getTienNhan())
							.phieuDatPhong(hoaDon.getPhieuDatPhong())
							.nhanVien(hoaDon.getNhanVien())
							.khachHang(hoaDon.getKhachHang())
							.build();
					List<Phong> dsPhong = new ArrayList<>();
					List<String> dsMaPhong = hoaDonRepo.layMaPhongTuMaHoaDon(hoaDon.getMaHoaDon());
					if (!dsMaPhong.isEmpty()) {
						for (String maPhong : dsMaPhong) {
							Phong phong = phongRepo.findById(maPhong).get();
							dsPhong.add(phong);
						}
					}
					List<PhongResponseDto> phongResponseDtos = new ArrayList<>();
					if (!dsPhong.isEmpty()) {
						for (Phong phong : dsPhong) {
							phongResponseDtos.add(convertPhongToPhongDto(phong));
						}
					}
					hoaDonDto.setDsPhong(phongResponseDtos);
					dsHoaDonDto.add(hoaDonDto);
				}
			}
		} catch (Exception e) {
			System.out.println("Error at layPhieuDatPhong: " + e);
		}
		return dsHoaDonDto;
	}

	public PhongResponseDto convertPhongToPhongDto(Phong phong) {
		PhongResponseDto phongResponseDto = new PhongResponseDto(phong.getMaPhong()
				, phong.getTenPhong(), phong.isTrangThaiPhong(), phong.getHinhAnhPhong()
				, phong.getMoTaPhong()
				, phong.getTang().getMaTang(), phong.getTang().getTenTang()
				, phong.getLoaiPhong().getMaLoaiPhong(), phong.getLoaiPhong().getTenLoaiPhong()
				, phong.getGiaPhong(), phong.getSucChua()
				, phong.isDuocHutThuoc(), phong.isMangThuCung()
				, phong.getSoGiuong());
		return phongResponseDto;
	}

	@Override
	public HoaDonDto datDichVu(long maHoaDon, List<DatDichVuDto> datDichVuDtos) {
		HoaDon hoaDon = hoaDonRepo.findById(maHoaDon).get();
		HoaDonDto result = new HoaDonDto();
		if (!datDichVuDtos.isEmpty()) {
			List<Map<String, Object>> listObject = hoaDonRepo.layChiTietDichVuTuMaHoaDon(maHoaDon);
			List<ChiTietDichVuDto> dsChiTietDichVuDto = new ArrayList<>();
			if (!listObject.isEmpty()) {
				for (Map<String, Object> obj : listObject) {
					ChiTietDichVuDto chiTietDichVuDto = new ChiTietDichVuDto(Long.parseLong(obj.get("maDichVu").toString())
							, obj.get("tenDichVu").toString(), Double.parseDouble(obj.get("giaDichVu").toString())
							, Integer.parseInt(obj.get("soLuong").toString()),  obj.get("tenLoaiDichVu").toString());
					dsChiTietDichVuDto.add(chiTietDichVuDto);
				}
			}
			if (dsChiTietDichVuDto.isEmpty()) {
				for (DatDichVuDto datDichVuDto : datDichVuDtos) {
					ChiTietDichVu ct = new ChiTietDichVu(hoaDon
							, new DichVu(datDichVuDto.getMaDichVu(), null, 0, 0, null)
							, datDichVuDto.getSoLuongTong());
					chiTietDichVuRepo.save(ct);
					DichVu dichVu = dichVuRepo.findById(datDichVuDto.getMaDichVu()).get();
//					dichVuRepo.updateSoLuongTonDichVu(datDichVuDto.getMaDichVu(), dichVu.getSoLuong() - datDichVuDto.getSoLuongMoi());
					dichVu.setSoLuong(dichVu.getSoLuong() - datDichVuDto.getSoLuongMoi());	
					dichVuRepo.save(dichVu);
				}
			} else {
				for(int i = 0; i < datDichVuDtos.size(); i++) {
					for (int j = 0; j < dsChiTietDichVuDto.size(); j++) {
						if (datDichVuDtos.get(i).getMaDichVu() == dsChiTietDichVuDto.get(j).getMaDichVu()) {	
							chiTietDichVuRepo.save(new ChiTietDichVu(new HoaDon(maHoaDon
									, null, null, null
									, 0, null, null
									, null, null, null),
									new DichVu(datDichVuDtos.get(i).getMaDichVu()
											, null, 0, 0, null), datDichVuDtos.get(i).getSoLuongTong()));
							break;
						}
						if (j == dsChiTietDichVuDto.size() - 1) {
							ChiTietDichVu ct = new ChiTietDichVu(hoaDon
									, new DichVu(datDichVuDtos.get(i).getMaDichVu(), null, 0, 0, null)
									, datDichVuDtos.get(i).getSoLuongTong());
							chiTietDichVuRepo.save(ct);
						}
					}
					DichVu dichVu = dichVuRepo.findById(datDichVuDtos.get(i).getMaDichVu()).get();
					dichVuRepo.updateSoLuongTonDichVu(datDichVuDtos.get(i).getMaDichVu()
							, dichVu.getSoLuong() - datDichVuDtos.get(i).getSoLuongMoi());

				}
			}
			try {
				KhachHang khachHang = khachHangRepo.findById(hoaDon.getKhachHang().getMaKhachHang()).get();
				HoaDonDto hoaDonDto = HoaDonDto.builder()
						.maHoaDon(hoaDon.getMaHoaDon())
						.ngayLap(hoaDon.getNgayLap())
						.ngayNhanPhong(hoaDon.getNgayNhanPhong())
						.ngayTraPhong(hoaDon.getNgayTraPhong())
						.tienNhan(hoaDon.getTienNhan())
						.phieuDatPhong(hoaDon.getPhieuDatPhong())
						.nhanVien(hoaDon.getNhanVien())
						.build();
				List<Phong> dsPhong = new ArrayList<>();
				List<String> dsMaPhong = hoaDonRepo.layMaPhongTuMaHoaDon(hoaDon.getMaHoaDon());
				if (!dsMaPhong.isEmpty()) {
					for (String maPhong : dsMaPhong) {
						Phong phong = phongRepo.findById(maPhong).get();
						dsPhong.add(phong);
					}
				}
				List<PhongResponseDto> phongResponseDtos = new ArrayList<>();
				if (!dsPhong.isEmpty()) {
					for (Phong phong : dsPhong) {
						phongResponseDtos.add(convertPhongToPhongDto(phong));
					}
				}
				List<Map<String, Object>> listObject2 = hoaDonRepo.layChiTietDichVuTuMaHoaDon(maHoaDon);
				List<ChiTietDichVuDto> dsChiTietDichVuDto2 = new ArrayList<>();
				if (!listObject2.isEmpty()) {
					for (Map<String, Object> obj : listObject2) {
						ChiTietDichVuDto chiTietDichVuDto = new ChiTietDichVuDto(Long.parseLong(obj.get("maDichVu").toString())
								, obj.get("tenDichVu").toString(), Double.parseDouble(obj.get("giaDichVu").toString())
								, Integer.parseInt(obj.get("soLuong").toString()),  obj.get("tenLoaiDichVu").toString());
						dsChiTietDichVuDto2.add(chiTietDichVuDto);
					}
				}
				hoaDonDto.setDsPhong(phongResponseDtos);
				hoaDonDto.setDsChiTietDichVuDto(dsChiTietDichVuDto2);
				hoaDonDto.setKhachHang(khachHang);
				result = hoaDonDto;
			} catch (Exception e) {
				System.out.println("Error at layPhieuDatPhong: " + e);
			}
			return result;
		}

		return result;
	}

	@Override
	public List<HoaDonDto> layHoaDonTheoTenPhong(String maPhong) {
//		Phong phong = phongRepo.findById(maPhong).get();
		List<HoaDonDto> results = new ArrayList<>();
		List<ChiTietHoaDon> dsChiTietHoaDon = chiTietHoaDonRepo.layChiTietHoaDonTheoPhong(maPhong);
		if (dsChiTietHoaDon != null && !dsChiTietHoaDon.isEmpty()) {
			for (ChiTietHoaDon chiTietHoaDon : dsChiTietHoaDon) {
				HoaDon hoaDon = hoaDonRepo.findById(chiTietHoaDon.getHoaDon().getMaHoaDon()).get();
				if (hoaDon != null) {
					if (hoaDon.getTienNhan() == 0) {
						return this.timHoaDonTheoMa(hoaDon.getMaHoaDon());
					}
				}
			}
		}

		return results;
	}
	@Override
	public List<HoaDonDto> layHetHoaDon() {
		List<HoaDonDto> dsHoaDonDto = new ArrayList<>();
		try {
			List<HoaDon> dsHoaDon = hoaDonRepo.findAll();
			for (HoaDon hoaDon : dsHoaDon) {
				KhachHang khachHang = khachHangRepo.findById(hoaDon.getKhachHang().getMaKhachHang()).get();
//				PhieuDatPhong p = hoaDon.getPhieuDatPhong();
//				PhieuDatPhongDto phieuDatPhongDto = PhieuDatPhongDto.builder()
//					.maPhieuDatPhong(p.getMaPhieuDatPhong())
//					.ngayDatPhong(p.getNgayDatPhong())
//					.ngayTraPhong(p.getNgayTraPhong())
//					.ngayNhanPhong(p.getNgayNhanPhong())
//					.trangThaiDatPhong(p.getTrangThaiDatPhong())
//					.khachHang(khachHang)
//					.build();
						
				HoaDonDto hoaDonDto = HoaDonDto.builder()
						.maHoaDon(hoaDon.getMaHoaDon())
						.ngayLap(hoaDon.getNgayLap())
						.ngayNhanPhong(hoaDon.getNgayNhanPhong())
						.ngayTraPhong(hoaDon.getNgayTraPhong())
						.tienNhan(hoaDon.getTienNhan())
						.phieuDatPhong(hoaDon.getPhieuDatPhong())
						.nhanVien(hoaDon.getNhanVien())
						.build();
				List<Phong> dsPhong = new ArrayList<>();
				List<String> dsMaPhong = hoaDonRepo.layMaPhongTuMaHoaDon(hoaDon.getMaHoaDon());
				if (!dsMaPhong.isEmpty()) {
					for (String maPhong : dsMaPhong) {
						Phong phong = phongRepo.findById(maPhong).get();
						dsPhong.add(phong);
					}
				}
				List<PhongResponseDto> phongResponseDtos = new ArrayList<>();
				if (!dsPhong.isEmpty()) {
					for (Phong phong : dsPhong) {
						phongResponseDtos.add(convertPhongToPhongDto(phong));
					}
				}
				List<Map<String, Object>> listObject = hoaDonRepo.layChiTietDichVuTuMaHoaDon(hoaDon.getMaHoaDon());
				List<ChiTietDichVuDto> dsChiTietDichVuDto = new ArrayList<>();
				if (!listObject.isEmpty()) {
					for (Map<String, Object> obj : listObject) {
						ChiTietDichVuDto chiTietDichVuDto = new ChiTietDichVuDto(Long.parseLong(obj.get("maDichVu").toString())
								, obj.get("tenDichVu").toString(), Double.parseDouble(obj.get("giaDichVu").toString())
								, Integer.parseInt(obj.get("soLuong").toString()),  obj.get("tenLoaiDichVu").toString());
						dsChiTietDichVuDto.add(chiTietDichVuDto);
					}
				}
				hoaDonDto.setDsPhong(phongResponseDtos);
				hoaDonDto.setDsChiTietDichVuDto(dsChiTietDichVuDto);
				hoaDonDto.setKhachHang(khachHang);
				dsHoaDonDto.add(hoaDonDto);
			}
		} catch (Exception e) {
			System.out.println("Error at layPhieuDatPhong: " + e);
		}
		return dsHoaDonDto;
	}
	@Override
	public List<HoaDonDto> layHetHoaDonTheoCCCD(String cccd) {
		List<HoaDonDto> dsHoaDonDto = new ArrayList<>();
		try {
			KhachHang khachHang = khachHangRepo.timKhachHangBangCCCD(cccd);
			if (khachHang != null) {
				List<HoaDon> dsHoaDon = hoaDonRepo.layTatCaHoaDonTheoKhach(khachHang.getMaKhachHang());
				for (HoaDon hoaDon : dsHoaDon) {
					HoaDonDto hoaDonDto = HoaDonDto.builder()
							.maHoaDon(hoaDon.getMaHoaDon())
							.ngayLap(hoaDon.getNgayLap())
							.ngayNhanPhong(hoaDon.getNgayNhanPhong())
							.ngayTraPhong(hoaDon.getNgayTraPhong())
							.tienNhan(hoaDon.getTienNhan())
							.phieuDatPhong(hoaDon.getPhieuDatPhong())
							.nhanVien(hoaDon.getNhanVien())
							.khachHang(hoaDon.getKhachHang())
							.build();
					List<Phong> dsPhong = new ArrayList<>();
					List<String> dsMaPhong = hoaDonRepo.layMaPhongTuMaHoaDon(hoaDon.getMaHoaDon());
					if (!dsMaPhong.isEmpty()) {
						for (String maPhong : dsMaPhong) {
							Phong phong = phongRepo.findById(maPhong).get();
							dsPhong.add(phong);
						}
					}
					List<PhongResponseDto> phongResponseDtos = new ArrayList<>();
					if (!dsPhong.isEmpty()) {
						for (Phong phong : dsPhong) {
							phongResponseDtos.add(convertPhongToPhongDto(phong));
						}
					}
					hoaDonDto.setDsPhong(phongResponseDtos);
					dsHoaDonDto.add(hoaDonDto);
				}
			}
		} catch (Exception e) {
			System.out.println("Error at layPhieuDatPhong: " + e);
		}
		return dsHoaDonDto;
	}
	@Override
	public List<HoaDonDto> timHoaDonTheoMa(long maHoaDon) {
		List<HoaDonDto> dsHoaDonDto = new ArrayList<>();
		try {
			HoaDon hoaDonResult = hoaDonRepo.findById(maHoaDon).get();
			List<HoaDon> dsHoaDon = new ArrayList<>();
			if (hoaDonResult != null) {
				dsHoaDon.add(hoaDonResult);
			}
			for (HoaDon hoaDon : dsHoaDon) {
				KhachHang khachHang = khachHangRepo.findById(hoaDon.getKhachHang().getMaKhachHang()).get();
//				PhieuDatPhong p = hoaDon.getPhieuDatPhong();
//				PhieuDatPhongDto phieuDatPhongDto = PhieuDatPhongDto.builder()
//					.maPhieuDatPhong(p.getMaPhieuDatPhong())
//					.ngayDatPhong(p.getNgayDatPhong())
//					.ngayTraPhong(p.getNgayTraPhong())
//					.ngayNhanPhong(p.getNgayNhanPhong())
//					.trangThaiDatPhong(p.getTrangThaiDatPhong())
//					.khachHang(khachHang)
//					.build();
						
				HoaDonDto hoaDonDto = HoaDonDto.builder()
						.maHoaDon(hoaDon.getMaHoaDon())
						.ngayLap(hoaDon.getNgayLap())
						.ngayNhanPhong(hoaDon.getNgayNhanPhong())
						.ngayTraPhong(hoaDon.getNgayTraPhong())
						.tienNhan(hoaDon.getTienNhan())
						.phieuDatPhong(hoaDon.getPhieuDatPhong())
						.nhanVien(hoaDon.getNhanVien())
						.build();
				List<Phong> dsPhong = new ArrayList<>();
				List<String> dsMaPhong = hoaDonRepo.layMaPhongTuMaHoaDon(hoaDon.getMaHoaDon());
				if (!dsMaPhong.isEmpty()) {
					for (String maPhong : dsMaPhong) {
						Phong phong = phongRepo.findById(maPhong).get();
						dsPhong.add(phong);
					}
				}
				List<PhongResponseDto> phongResponseDtos = new ArrayList<>();
				if (!dsPhong.isEmpty()) {
					for (Phong phong : dsPhong) {
						phongResponseDtos.add(convertPhongToPhongDto(phong));
					}
				}
				List<Map<String, Object>> listObject = hoaDonRepo.layChiTietDichVuTuMaHoaDon(hoaDon.getMaHoaDon());
				List<ChiTietDichVuDto> dsChiTietDichVuDto = new ArrayList<>();
				if (!listObject.isEmpty()) {
					for (Map<String, Object> obj : listObject) {
						ChiTietDichVuDto chiTietDichVuDto = new ChiTietDichVuDto(Long.parseLong(obj.get("maDichVu").toString())
								, obj.get("tenDichVu").toString(), Double.parseDouble(obj.get("giaDichVu").toString())
								, Integer.parseInt(obj.get("soLuong").toString()),  obj.get("tenLoaiDichVu").toString());
						dsChiTietDichVuDto.add(chiTietDichVuDto);
					}
				}
				hoaDonDto.setDsPhong(phongResponseDtos);
				hoaDonDto.setDsChiTietDichVuDto(dsChiTietDichVuDto);
				hoaDonDto.setKhachHang(khachHang);
				dsHoaDonDto.add(hoaDonDto);
			}
		} catch (Exception e) {
			System.out.println("Error at layPhieuDatPhong: " + e);
		}
		return dsHoaDonDto;
	}
}

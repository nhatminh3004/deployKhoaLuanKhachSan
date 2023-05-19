package com.example.hotelserver.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotelserver.dto.PhongResponseDto;
import com.example.hotelserver.entity.Phong;
import com.example.hotelserver.repository.PhieuDatPhongRepo;
import com.example.hotelserver.repository.PhongRepo;

@Service
public class PhongServiceImpl implements PhongService{
	@Autowired
	private PhongRepo phongRepo;
	
	@Autowired
	private PhieuDatPhongRepo phieuDatPhongRepo;
	
	@Override
	public List<PhongResponseDto> layTatCaPhongSapXepTheoTrangThai(Date ngayNhanPhong, Date ngayTraPhong) {
		List<Phong> rooms = phongRepo.getRoomsOrderByState();
		List<PhongResponseDto> phongDtos = new ArrayList<>();
		for (Phong room : rooms) {
			PhongResponseDto phongResponseDto = new PhongResponseDto(room.getMaPhong()
					, room.getTenPhong(), room.isTrangThaiPhong(), room.getHinhAnhPhong()
					, room.getMoTaPhong()
					, room.getTang().getMaTang(), room.getTang().getTenTang()
					, room.getLoaiPhong().getMaLoaiPhong(), room.getLoaiPhong().getTenLoaiPhong()
					, room.getGiaPhong(), room.getSucChua()
					, room.isDuocHutThuoc(), room.isMangThuCung()
					, room.getSoGiuong());
			phongDtos.add(phongResponseDto);
		}
		if (phongDtos != null && !phongDtos.isEmpty()) {
			List<Long> maPhieuDatPhongs = phieuDatPhongRepo.layMaPhieuTheoNgayNhanNgayTra(ngayNhanPhong, ngayTraPhong);
			if (maPhieuDatPhongs != null && !maPhieuDatPhongs.isEmpty()) {
				for (Long maPhieuDatPhong : maPhieuDatPhongs) {
					List<String> exMaPhong = phieuDatPhongRepo.layMaPhongTuMaPhieu(maPhieuDatPhong);
					if (!exMaPhong.isEmpty()) {
						for (String maPhong : exMaPhong) {
							for (int i = 0; i < phongDtos.size(); i++) {
								if (phongDtos.get(i).getMaPhong().equals(maPhong)) {
									phongDtos.remove(i);
									break;
								}
							}
						}
					}
					
				}
				
			}
		}
		return phongDtos;
	}

	@Override
	public List<PhongResponseDto> layTatCaPhong() {
		List<Phong> rooms = phongRepo.findAll();
		List<PhongResponseDto> result = new ArrayList<>();
		for (Phong room : rooms) {
			PhongResponseDto phongResponseDto = new PhongResponseDto(room.getMaPhong()
					, room.getTenPhong(), room.isTrangThaiPhong(), room.getHinhAnhPhong()
					, room.getMoTaPhong()
					, room.getTang().getMaTang(), room.getTang().getTenTang()
					, room.getLoaiPhong().getMaLoaiPhong(), room.getLoaiPhong().getTenLoaiPhong()
					, room.getGiaPhong(), room.getSucChua()
					, room.isDuocHutThuoc(), room.isMangThuCung()
					, room.getSoGiuong());
			result.add(phongResponseDto);
		}
		return result;
	}

	@Override
	public boolean themPhong(Phong phong) {
		try {
			phongRepo.save(phong);
		} catch (Exception e) {
			System.out.println("Error at PhongServiceImpl" + e);
			return false;
		}
		
		return true;
	}

	@Override
	public boolean kiemTraPhongTonTaiTheoTen(String tenPhong) {
		if (phongRepo.findByTenPhongLike(tenPhong) != null && !phongRepo.findByTenPhongLike(tenPhong).isEmpty()) {
			return true;
		}
		return false;
	}

	@Override
	public List<PhongResponseDto> timPhongTheoMaTang(int maTang) {
		List<Phong> rooms = phongRepo.findByMaTang(maTang);
		List<PhongResponseDto> result = new ArrayList<>();
		for (Phong room : rooms) {
			PhongResponseDto phongResponseDto = new PhongResponseDto(room.getMaPhong()
					, room.getTenPhong(), room.isTrangThaiPhong(), room.getHinhAnhPhong()
					, room.getMoTaPhong()
					, room.getTang().getMaTang(), room.getTang().getTenTang()
					, room.getLoaiPhong().getMaLoaiPhong(), room.getLoaiPhong().getTenLoaiPhong()
					, room.getGiaPhong(), room.getSucChua()
					, room.isDuocHutThuoc(), room.isMangThuCung()
					, room.getSoGiuong());
			result.add(phongResponseDto);
		}
		return result;
	}

	@Override
	public List<PhongResponseDto> timPhongTheoMaLoaiPhong(long maLoaiPhong) {
		List<Phong> rooms = phongRepo.findByMaLoaiPhong(maLoaiPhong);
		List<PhongResponseDto> result = new ArrayList<>();
		for (Phong room : rooms) {
			PhongResponseDto phongResponseDto = new PhongResponseDto(room.getMaPhong()
					, room.getTenPhong(), room.isTrangThaiPhong(), room.getHinhAnhPhong()
					, room.getMoTaPhong()
					, room.getTang().getMaTang(), room.getTang().getTenTang()
					, room.getLoaiPhong().getMaLoaiPhong(), room.getLoaiPhong().getTenLoaiPhong()
					, room.getGiaPhong(), room.getSucChua()
					, room.isDuocHutThuoc(), room.isMangThuCung()
					, room.getSoGiuong());
			result.add(phongResponseDto);
		}
		return result;
	}

	@Override
	public List<PhongResponseDto> timPhongTheoTenLike(String tenPhong) {
		List<Phong> rooms = phongRepo.findByTenPhongLike(tenPhong);
		List<PhongResponseDto> result = new ArrayList<>();
		for (Phong room : rooms) {
			PhongResponseDto phongResponseDto = new PhongResponseDto(room.getMaPhong()
					, room.getTenPhong(), room.isTrangThaiPhong(), room.getHinhAnhPhong()
					, room.getMoTaPhong()
					, room.getTang().getMaTang(), room.getTang().getTenTang()
					, room.getLoaiPhong().getMaLoaiPhong(), room.getLoaiPhong().getTenLoaiPhong()
					, room.getGiaPhong(), room.getSucChua()
					, room.isDuocHutThuoc(), room.isMangThuCung()
					, room.getSoGiuong());
			result.add(phongResponseDto);
		}
		return result;
	}

	@Override
	public List<PhongResponseDto> timPhongTheoMa(String maPhong) {
		Phong room = phongRepo.findById(maPhong).get();
		List<PhongResponseDto> result = new ArrayList<>();
		if (room != null) {
			PhongResponseDto phongResponseDto = new PhongResponseDto(room.getMaPhong()
					, room.getTenPhong(), room.isTrangThaiPhong(), room.getHinhAnhPhong()
					, room.getMoTaPhong()
					, room.getTang().getMaTang(), room.getTang().getTenTang()
					, room.getLoaiPhong().getMaLoaiPhong(), room.getLoaiPhong().getTenLoaiPhong()
					, room.getGiaPhong(), room.getSucChua()
					, room.isDuocHutThuoc(), room.isMangThuCung()
					, room.getSoGiuong());
			result.add(phongResponseDto);
		}
		return result;
	}

	@Override
	public boolean xoaPhong(String maPhong) {
		try {
			phongRepo.deleteById(maPhong);
			return true;
		} catch (Exception e) {
			System.out.println("Error at xoaPhong: " + e);
		}
		return false;
	}

	@Override
	public List<PhongResponseDto> timPhongCustomQuery(String query) {
		List<PhongResponseDto> result = new ArrayList<>();
		List<String> maPhongs = phongRepo.findMaPhongByCustomField(query);
		if (!maPhongs.isEmpty()) {
			for (String maPhong : maPhongs) {
				Phong room = phongRepo.findById(maPhong).get();
				if (room != null) {
					PhongResponseDto phongResponseDto = new PhongResponseDto(room.getMaPhong()
							, room.getTenPhong(), room.isTrangThaiPhong(), room.getHinhAnhPhong()
							, room.getMoTaPhong()
							, room.getTang().getMaTang(), room.getTang().getTenTang()
							, room.getLoaiPhong().getMaLoaiPhong(), room.getLoaiPhong().getTenLoaiPhong()
							, room.getGiaPhong(), room.getSucChua()
							, room.isDuocHutThuoc(), room.isMangThuCung()
							, room.getSoGiuong());
					result.add(phongResponseDto);
				}
			}
		}
		return result;
	}
}

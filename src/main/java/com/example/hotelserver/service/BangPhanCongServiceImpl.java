package com.example.hotelserver.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotelserver.dto.BangPhanCongDto;
import com.example.hotelserver.dto.ChiTietPhanCongDto;
import com.example.hotelserver.dto.NhanVienMaChiTietPhanCongDto;
import com.example.hotelserver.entity.BangPhanCong;
import com.example.hotelserver.entity.ChiTietPhanCong;
import com.example.hotelserver.entity.NhanVien;
import com.example.hotelserver.repository.BangPhanCongRepo;
import com.example.hotelserver.repository.ChiTietPhanCongRepo;

@Service
public class BangPhanCongServiceImpl implements BangPhanCongService {
	@Autowired
	private BangPhanCongRepo bangPhanCongRepo;

	@Autowired
	private ChiTietPhanCongRepo chiTietPhanCongRepo;

	@Override
	public List<BangPhanCongDto> layHetBangPhanCong() {
		List<BangPhanCong> dsBangPhanCong = bangPhanCongRepo.findAll();
		List<BangPhanCongDto> dsBangPhanCongDto = new ArrayList<>();
		if (!dsBangPhanCong.isEmpty()) {
			for (BangPhanCong bangPhanCong : dsBangPhanCong) {
				BangPhanCongDto bangPhanCongDto = BangPhanCongDto.builder()
						.maBangPhanCong(bangPhanCong.getMaBangPhanCong())
						.ngayChinhSua(bangPhanCong.getNgayChinhSua())
						.ngayPhanCong(bangPhanCong.getNgayPhanCong())
						.nhanVien(bangPhanCong.getNhanVien())
						.build();
				List<ChiTietPhanCong> dsChiTietPhanCong = chiTietPhanCongRepo.findByMaBangPhanCong(bangPhanCong.getMaBangPhanCong());
				bangPhanCongDto.setDsChiTietPhanCong(dsChiTietPhanCong);

				dsBangPhanCongDto.add(bangPhanCongDto);
			}
		}

		return dsBangPhanCongDto;
	}

	@Override
	public BangPhanCongDto layHetBangPhanCongTheoMaNhanVien(long maNhanVien) {
		BangPhanCong bangPhanCong = bangPhanCongRepo.findBangPhanCongTheoNhanVien(maNhanVien);
		BangPhanCongDto bangPhanCongDtoRes = new BangPhanCongDto(); 
		if (bangPhanCong != null) {
			BangPhanCongDto bangPhanCongDto = BangPhanCongDto.builder()
					.maBangPhanCong(bangPhanCong.getMaBangPhanCong())
					.ngayChinhSua(bangPhanCong.getNgayChinhSua())
					.ngayPhanCong(bangPhanCong.getNgayPhanCong())
					.ngayBatDau(bangPhanCong.getNgayBatDau())
					.nhanVien(bangPhanCong.getNhanVien())
					.build();
			List<ChiTietPhanCong> dsChiTietPhanCong = chiTietPhanCongRepo.findByMaBangPhanCong(bangPhanCong.getMaBangPhanCong());
			//			System.out.println(dsChiTietPhanCong.get(0).getThu());
			//			if (!dsChiTietPhanCong.isEmpty()) {
			//				for (ChiTietPhanCong chiTietPhanCong : dsChiTietPhanCong) {
			//					if (chiTietPhanCong.getThu().isEmpty()) {
			//						int index = dsChiTietPhanCong.indexOf(chiTietPhanCong);
			//						List<Integer> thu = chiTietPhanCongRepo.findThuByMaPhanCong(chiTietPhanCong.getMaChiTietPhanCong());
			//						chiTietPhanCong.setThu(thu);
			//						dsChiTietPhanCong.set(index, chiTietPhanCong);
			//					}
			//				}
			//			}
			bangPhanCongDto.setDsChiTietPhanCong(dsChiTietPhanCong);

			bangPhanCongDtoRes = bangPhanCongDto;
		}
		return bangPhanCongDtoRes;
	}

	@Override
	public BangPhanCongDto themBangPhanCong(BangPhanCongDto bangPhanCongDto) {
		if (bangPhanCongDto != null) {
//			System.out.println(bangPhanCongDto);
			BangPhanCongDto bangPhanCongDtoCu = this.layHetBangPhanCongTheoMaNhanVien(bangPhanCongDto.getNhanVien().getMaNhanVien());
			BangPhanCong bangPhanCong = BangPhanCong.builder()
					.maBangPhanCong(bangPhanCongDto.getMaBangPhanCong())
					.ngayChinhSua(bangPhanCongDto.getNgayChinhSua())
					.ngayPhanCong(bangPhanCongDto.getNgayPhanCong())
					.ngayBatDau(bangPhanCongDto.getNgayBatDau())
					.nhanVien(NhanVien.builder().maNhanVien(bangPhanCongDto.getNhanVien().getMaNhanVien()).build())
					.build();
			BangPhanCong bangPhanCongMoi = bangPhanCongRepo.save(bangPhanCong);
			List<ChiTietPhanCong> dsChiTietPhanCongMoi = new ArrayList<>();
			if (bangPhanCongMoi != null) {
				List<ChiTietPhanCong> dsChiTietPhanCong = bangPhanCongDto.getDsChiTietPhanCong();
//				if (bangPhanCongDtoCu != null && bangPhanCongDtoCu.getDsChiTietPhanCong() != null && !bangPhanCongDtoCu.getDsChiTietPhanCong().isEmpty()) {
//					for (ChiTietPhanCong chiTietPhanCong : bangPhanCongDtoCu.getDsChiTietPhanCong()) {
//						chiTietPhanCongRepo.delete(chiTietPhanCong);
//					}
//				}
				if (dsChiTietPhanCong != null && !dsChiTietPhanCong.isEmpty()) {
					for (ChiTietPhanCong chiTietPhanCong : dsChiTietPhanCong) {
						chiTietPhanCong.setBangPhanCong(bangPhanCongMoi);
						ChiTietPhanCong chiTietPhanCongMoi = chiTietPhanCongRepo.save(chiTietPhanCong);
						if (chiTietPhanCong != null) {
							dsChiTietPhanCongMoi.add(chiTietPhanCongMoi);
						}
					}
				}
				BangPhanCongDto bangPhanCongDtoMoi = BangPhanCongDto.builder()
						.maBangPhanCong(bangPhanCongMoi.getMaBangPhanCong())
						.ngayChinhSua(bangPhanCongMoi.getNgayChinhSua())
						.ngayPhanCong(bangPhanCongMoi.getNgayPhanCong())
						.ngayBatDau(bangPhanCongMoi.getNgayBatDau())
						.dsChiTietPhanCong(dsChiTietPhanCongMoi)
						.build();
				return bangPhanCongDtoMoi;
			}
		}
		return null;
	}

	@Override
	public List<ChiTietPhanCongDto> layBangPhanCongTheoThu(int thu, Date ngayBatDau) {
		List<BangPhanCong> dsBangPhanCong = bangPhanCongRepo.getBangPhanCongTheoNgayBatDau(ngayBatDau);
		List<ChiTietPhanCongDto> dsChiTietPhanCongDto = new ArrayList<>();
		if (dsBangPhanCong != null && !dsBangPhanCong.isEmpty()) {
//			System.out.println(dsBangPhanCong);
			for (BangPhanCong bangPhanCong : dsBangPhanCong) {
				List<ChiTietPhanCong> dsChiTietPhanCong = chiTietPhanCongRepo.findByMaBangPhanCong(bangPhanCong.getMaBangPhanCong());
				if (dsChiTietPhanCong != null && !dsChiTietPhanCong.isEmpty()) {
					int length = dsChiTietPhanCong.size();
					for (int i = 0; i < length; i++) {
//						System.out.println("Trước remove: " + dsChiTietPhanCong.get(i));
						if (!dsChiTietPhanCong.get(i).getThu().contains(thu)) {
							dsChiTietPhanCong.remove(dsChiTietPhanCong.get(i));
							length = dsChiTietPhanCong.size();
							i--;
						}
					}
					if (dsChiTietPhanCong != null && !dsChiTietPhanCong.isEmpty()) {
						for (ChiTietPhanCong chiTietPhanCong : dsChiTietPhanCong) {
//							System.out.println("Sau remove: " + chiTietPhanCong);
							if (!dsChiTietPhanCongDto.isEmpty()) {
								for (int i = 0; i < dsChiTietPhanCongDto.size(); i++) {
									if (dsChiTietPhanCongDto.get(i).getCaLamViec().getMaCa() == chiTietPhanCong.getCaLamViec().getMaCa()) {
//										List<NhanVien> dsNhanVien = dsChiTietPhanCongDto.get(i).getDsNhanVien();
										List<NhanVienMaChiTietPhanCongDto> dsNhanVienMaChiTietPhanCongDto = dsChiTietPhanCongDto.get(i).getDsNhanVienMaChiTietPhanCongDto();
										ChiTietPhanCongDto chiTietPhanCongDto = dsChiTietPhanCongDto.get(i);
										if (dsNhanVienMaChiTietPhanCongDto != null && !dsNhanVienMaChiTietPhanCongDto.isEmpty()) {
											dsNhanVienMaChiTietPhanCongDto.add(NhanVienMaChiTietPhanCongDto.builder()
													.maChiTietPhanCong(chiTietPhanCong.getMaChiTietPhanCong())
													.nhanVien(bangPhanCong.getNhanVien())
													.build());
											chiTietPhanCongDto.setDsNhanVienMaChiTietPhanCongDto(dsNhanVienMaChiTietPhanCongDto);
										} else {
											dsNhanVienMaChiTietPhanCongDto = new ArrayList<>();
											dsNhanVienMaChiTietPhanCongDto.add(NhanVienMaChiTietPhanCongDto.builder()
													.maChiTietPhanCong(chiTietPhanCong.getMaChiTietPhanCong())
													.nhanVien(bangPhanCong.getNhanVien())
													.build());
											chiTietPhanCongDto.setDsNhanVienMaChiTietPhanCongDto(dsNhanVienMaChiTietPhanCongDto);
										}
										dsChiTietPhanCongDto.set(i, chiTietPhanCongDto);
										break;
									} else if (i >= dsChiTietPhanCongDto.size() - 1) {
										ChiTietPhanCongDto chiTietPhanCongDto2 = ChiTietPhanCongDto.builder()
												.caLamViec(chiTietPhanCong.getCaLamViec())
												.thu(thu)
												.build();
										List<NhanVienMaChiTietPhanCongDto> dsNhanVienMaChiTietPhanCongDto = new ArrayList<>();
										dsNhanVienMaChiTietPhanCongDto.add(NhanVienMaChiTietPhanCongDto.builder()
												.maChiTietPhanCong(chiTietPhanCong.getMaChiTietPhanCong())
												.nhanVien(bangPhanCong.getNhanVien())
												.build());
										chiTietPhanCongDto2.setDsNhanVienMaChiTietPhanCongDto(dsNhanVienMaChiTietPhanCongDto);
										dsChiTietPhanCongDto.add(chiTietPhanCongDto2);
										break;
									}

								}
							} else {
								ChiTietPhanCongDto chiTietPhanCongDto2 = ChiTietPhanCongDto.builder()
										.caLamViec(chiTietPhanCong.getCaLamViec())
										.thu(thu)
										.build();
								List<NhanVienMaChiTietPhanCongDto> dsNhanVienMaChiTietPhanCongDto = new ArrayList<>();
								dsNhanVienMaChiTietPhanCongDto.add(NhanVienMaChiTietPhanCongDto.builder()
										.maChiTietPhanCong(chiTietPhanCong.getMaChiTietPhanCong())
										.nhanVien(bangPhanCong.getNhanVien())
										.build());
								chiTietPhanCongDto2.setDsNhanVienMaChiTietPhanCongDto(dsNhanVienMaChiTietPhanCongDto);
								dsChiTietPhanCongDto.add(chiTietPhanCongDto2);
							}
						}
					} 

				}
			}
		}
//		System.out.println(dsChiTietPhanCongDto);
		return dsChiTietPhanCongDto;
	}
}

package com.example.hotelserver.repository;

import java.util.List;

public interface CustomRepo {
	List<String> findMaPhongByCustomField(String query);
}

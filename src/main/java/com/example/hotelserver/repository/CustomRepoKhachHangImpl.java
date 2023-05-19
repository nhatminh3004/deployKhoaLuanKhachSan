package com.example.hotelserver.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.List;

public class CustomRepoKhachHangImpl implements CustomRepoKhachHang{
	@PersistenceContext
    private EntityManager em;
	


	@Override
	public List<String> findMaKhachHangByCustomField(String query) {
		List<String> results = em.createNativeQuery(query, String.class).getResultList();
		return results;
	}
}

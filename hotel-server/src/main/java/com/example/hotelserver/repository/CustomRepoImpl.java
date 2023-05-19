package com.example.hotelserver.repository;

import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class CustomRepoImpl implements CustomRepo{
	@PersistenceContext
    private EntityManager em;
	
	@Override
	public List<String> findMaPhongByCustomField(String query) {
//        List<Tang> list = ;
		List<String> results = em.createNativeQuery(query, String.class).getResultList();
		return results;
	}

}

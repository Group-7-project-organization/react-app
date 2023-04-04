package com.climateapp.backend.repository.database;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import org.springframework.data.jpa.repository.Query;

import com.climateapp.backend.data.database.V5Waste;

public interface V5WasteRepo extends JpaRepository<V5Waste, String>{
    @Query(value= "SELECT * FROM v5_waste", nativeQuery = true)
    List<V5Waste> getAll();
    
}

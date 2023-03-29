package com.climateapp.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.climateapp.backend.repository.*;
import com.climateapp.backend.data.*;

@CrossOrigin
@Service
public class DataService {

    @Autowired
    V1AnnualGlobalRepo V1AnnualGlobalRepo;

    @Autowired
    V1AnnualNorthRepo V1AnnualNorthRepo;

    @Autowired
    V1AnnualSouthRepo V1AnnualSouthRepo;

    @Autowired
    V1MonthlyGlobalRepo V1MonthlyGlobalRepo;

    @Autowired
    V1MonthlyNorthRepo V1MonthlyNorthRepo;

    @Autowired
    V1MonthlySouthRepo V1MonthlySouthRepo;

    @Autowired
    V1ReconstructionRepository V1RecoRepo;

    public List<V1AnnualGlobal> getAnnualGlobal() {
        return V1AnnualGlobalRepo.getAll();
    }

    public List<V1AnnualNorth> getAnnualNorth() {
        return V1AnnualNorthRepo.getAll();
    }

    public List<V1AnnualSouth> getAnnualSouth() {
        return V1AnnualSouthRepo.getAll();
    }

    public List<V1MonthlyGlobal> getMonthlyGlobal() {
        return V1MonthlyGlobalRepo.getAll();
    }

    public List<V1MonthlyNorth> getMonthlyNorth() {
        return V1MonthlyNorthRepo.getAll();
    }

    public List<V1MonthlySouth> getMonthlySouth() {
        return V1MonthlySouthRepo.getAll();
    }

    public List<V1reconstruction> getV1Reconstruction() {
        return V1RecoRepo.getAll();
    }
}
package com.jobportal.job_portal.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.job_portal.entities.Company;
import com.jobportal.job_portal.repositories.CompanyRepository;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "*") // Allows the React frontend to make requests
public class CompanyController {

    @Autowired
    private CompanyRepository companyRepository;

    @GetMapping("/code/{companyCode}")
    public ResponseEntity<?> getCompanyByCode(@PathVariable String companyCode) {
        Optional<Company> company = companyRepository.findByCompanyCode(companyCode);
        if (company.isPresent()) {
            return ResponseEntity.ok(company.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

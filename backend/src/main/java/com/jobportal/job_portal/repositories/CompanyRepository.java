package com.jobportal.job_portal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.job_portal.entities.Company;

public interface CompanyRepository extends JpaRepository<Company,Long> {
    
}

package com.jobportal.job_portal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.job_portal.entities.Recruiters;

public interface RecruiterRepository extends JpaRepository<Recruiters,Long>{
    
}

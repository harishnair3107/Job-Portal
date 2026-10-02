package com.jobportal.job_portal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.job_portal.entities.Admin;

public interface AdminRepository extends JpaRepository<Admin,Long> {

    
} 

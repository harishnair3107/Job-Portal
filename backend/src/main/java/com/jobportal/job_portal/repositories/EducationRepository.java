package com.jobportal.job_portal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.job_portal.entities.Education;

public interface EducationRepository extends JpaRepository<Education,Long> {

    
} 
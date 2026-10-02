package com.jobportal.job_portal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.job_portal.entities.JobSeekers;

public interface JobSeekerRepository extends JpaRepository<JobSeekers,Long> {
    
}

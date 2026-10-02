package com.jobportal.job_portal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.job_portal.entities.Applications;

public interface ApplicationRepository
        extends JpaRepository<Applications, Long> {
}

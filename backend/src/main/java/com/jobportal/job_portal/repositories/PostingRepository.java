package com.jobportal.job_portal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.job_portal.entities.Posting;

public interface PostingRepository
        extends JpaRepository<Posting, Long> {
}


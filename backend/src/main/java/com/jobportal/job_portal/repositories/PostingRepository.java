package com.jobportal.job_portal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.job_portal.entities.Posting;

import java.util.List;
import com.jobportal.job_portal.entities.Company;
import com.jobportal.job_portal.entities.Recruiters;

public interface PostingRepository
        extends JpaRepository<Posting, Long> {
    List<Posting> findByCompany(Company company);
    List<Posting> findByRecruiter(Recruiters recruiter);
}


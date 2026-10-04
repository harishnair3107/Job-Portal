package com.jobportal.job_portal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jobportal.job_portal.entities.Recruiters;
import com.jobportal.job_portal.entities.Accounts;
import java.util.Optional;

import java.util.List;
import com.jobportal.job_portal.entities.Company;

public interface RecruiterRepository extends JpaRepository<Recruiters,Long>{
    Optional<Recruiters> findByAccount(Accounts account);
    List<Recruiters> findByCompany(Company company);
}

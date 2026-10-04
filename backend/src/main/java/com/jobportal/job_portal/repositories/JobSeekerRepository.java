package com.jobportal.job_portal.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.jobportal.job_portal.entities.JobSeekers;
import com.jobportal.job_portal.entities.Accounts;

public interface JobSeekerRepository extends JpaRepository<JobSeekers,Long> {
    Optional<JobSeekers> findByAccount(Accounts account);
}

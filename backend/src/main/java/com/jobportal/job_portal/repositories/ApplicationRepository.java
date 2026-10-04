package com.jobportal.job_portal.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.jobportal.job_portal.entities.Applications;
import com.jobportal.job_portal.entities.JobSeekers;
import com.jobportal.job_portal.entities.Company;

public interface ApplicationRepository extends JpaRepository<Applications, Long> {
    List<Applications> findByJobSeeker(JobSeekers jobSeeker);
    List<Applications> findByPosting_Company(Company company);
}

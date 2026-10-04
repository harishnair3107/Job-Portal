package com.jobportal.job_portal.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jobportal.job_portal.entities.Accounts;

public interface AccountRepository extends JpaRepository<Accounts, Long> {
 public Optional<Accounts> findByEmail(String email);
}

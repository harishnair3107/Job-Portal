package com.jobportal.job_portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jobportal.job_portal.entities.Applications;
import com.jobportal.job_portal.entities.JobSeekers;
import com.jobportal.job_portal.entities.Posting;
import com.jobportal.job_portal.entities.Accounts;
import com.jobportal.job_portal.entities.Recruiters;
import com.jobportal.job_portal.repositories.ApplicationRepository;
import com.jobportal.job_portal.repositories.JobSeekerRepository;
import com.jobportal.job_portal.repositories.PostingRepository;
import com.jobportal.job_portal.repositories.AccountRepository;
import com.jobportal.job_portal.repositories.RecruiterRepository;
import com.jobportal.job_portal.security.JwtUtil;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobSeekerRepository jobSeekerRepository;

    @Autowired
    private PostingRepository postingRepository;

    @Autowired
    private AccountRepository accountRepository;
    
    @Autowired
    private RecruiterRepository recruiterRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private Accounts getAccountFromToken(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                String email = jwtUtil.extractEmail(token);
                if (email != null) {
                    return accountRepository.findByEmail(email).orElse(null);
                }
            } catch (Exception e) {
                return null;
            }
        }
        return null;
    }

    @PostMapping("/apply")
    public ResponseEntity<?> applyForJob(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestBody Map<String, Long> payload) {
        
        Accounts account = getAccountFromToken(authHeader);
        if (account == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<JobSeekers> jsOpt = jobSeekerRepository.findByAccount(account);
        if (!jsOpt.isPresent()) {
            return ResponseEntity.status(400).body("Job seeker profile not found");
        }

        Long postingId = payload.get("postingId");
        if (postingId == null) {
            return ResponseEntity.status(400).body("Posting ID is required");
        }

        Optional<Posting> postingOpt = postingRepository.findById(postingId);
        if (!postingOpt.isPresent()) {
            return ResponseEntity.status(404).body("Job posting not found");
        }

        Applications application = new Applications();
        application.setJobSeeker(jsOpt.get());
        application.setPosting(postingOpt.get());
        application.setApplicationDate(LocalDateTime.now());
        application.setApplicationStatus(com.jobportal.job_portal.entities.ApplicationStatus.APPLIED);

        applicationRepository.save(application);

        return ResponseEntity.ok().body("{\"message\": \"Successfully applied!\"}");
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMyApplications(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        Accounts account = getAccountFromToken(authHeader);
        if (account == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<JobSeekers> jsOpt = jobSeekerRepository.findByAccount(account);
        if (jsOpt.isPresent()) {
            List<Applications> apps = applicationRepository.findByJobSeeker(jsOpt.get());
            return ResponseEntity.ok(apps);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/company")
    public ResponseEntity<?> getCompanyApplications(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        Accounts account = getAccountFromToken(authHeader);
        if (account == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<Recruiters> recOpt = recruiterRepository.findByAccount(account);
        if (recOpt.isPresent()) {
            List<Applications> apps = applicationRepository.findByPosting_Company(recOpt.get().getCompany());
            return ResponseEntity.ok(apps);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateApplicationStatus(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestBody Map<String, String> payload) {
        
        Accounts account = getAccountFromToken(authHeader);
        if (account == null) return ResponseEntity.status(401).body("Unauthorized");
        // Simplified authorization check: assuming any logged in recruiter can update.
        
        Optional<Applications> appOpt = applicationRepository.findById(id);
        if (appOpt.isPresent()) {
            Applications app = appOpt.get();
            String statusStr = payload.get("status");
            if (statusStr != null) {
                try {
                    app.setApplicationStatus(com.jobportal.job_portal.entities.ApplicationStatus.valueOf(statusStr));
                    applicationRepository.save(app);
                    return ResponseEntity.ok(app);
                } catch (IllegalArgumentException e) {
                    return ResponseEntity.badRequest().body("Invalid status");
                }
            }
        }
        return ResponseEntity.notFound().build();
    }
}

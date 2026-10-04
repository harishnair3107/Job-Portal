package com.jobportal.job_portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

import com.jobportal.job_portal.entities.JobSeekers;
import com.jobportal.job_portal.entities.Accounts;
import com.jobportal.job_portal.repositories.JobSeekerRepository;
import com.jobportal.job_portal.repositories.AccountRepository;
import com.jobportal.job_portal.security.JwtUtil;

import java.util.Optional;

@RestController
@RequestMapping("/api/job-seekers")
@CrossOrigin(origins = "*")
public class JobSeekerController {

    @Autowired
    private JobSeekerRepository jobSeekerRepository;

    @Autowired
    private AccountRepository accountRepository;

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

    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        Accounts account = getAccountFromToken(authHeader);
        if (account == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<JobSeekers> jsOpt = jobSeekerRepository.findByAccount(account);
        if (jsOpt.isPresent()) {
            return ResponseEntity.ok(jsOpt.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateProfile(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestBody Map<String, String> payload) {
        
        Accounts account = getAccountFromToken(authHeader);
        if (account == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<JobSeekers> jsOpt = jobSeekerRepository.findByAccount(account);
        if (jsOpt.isPresent()) {
            JobSeekers jobSeeker = jsOpt.get();
            if (payload.containsKey("name")) jobSeeker.setName(payload.get("name"));
            if (payload.containsKey("profileSummary")) jobSeeker.setProfileSummary(payload.get("profileSummary"));
            
            jobSeekerRepository.save(jobSeeker);
            return ResponseEntity.ok(jobSeeker);
        }
        return ResponseEntity.notFound().build();
    }
}

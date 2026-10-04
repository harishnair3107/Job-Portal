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
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import com.jobportal.job_portal.entities.Education;
import java.util.List;
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

    @PutMapping(value = "/me", consumes = {"multipart/form-data", "application/json"})
    public ResponseEntity<?> updateProfile(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestParam(value = "profileSummary", required = false) String profileSummary,
            @RequestParam(value = "educationList", required = false) String educationListJson,
            @RequestParam(value = "resume", required = false) MultipartFile resume,
            @RequestParam(value = "profilePic", required = false) MultipartFile profilePic) {
        
        Accounts account = getAccountFromToken(authHeader);
        if (account == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<JobSeekers> jsOpt = jobSeekerRepository.findByAccount(account);
        if (jsOpt.isPresent()) {
            JobSeekers jobSeeker = jsOpt.get();
            
            if (profileSummary != null) {
                jobSeeker.setProfileSummary(profileSummary);
            }
            
            if (educationListJson != null && !educationListJson.isEmpty()) {
                try {
                    ObjectMapper mapper = new ObjectMapper();
                    mapper.registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());
                    List<Education> eduList = mapper.readValue(educationListJson, new TypeReference<List<Education>>(){});
                    // clear and add to maintain persistence linkage
                    jobSeeker.getEducationList().clear();
                    for(Education edu : eduList) {
                        edu.setJobseeker(jobSeeker);
                        jobSeeker.getEducationList().add(edu);
                    }
                } catch(Exception e) {
                    e.printStackTrace();
                }
            }
            
            try {
                if (resume != null && !resume.isEmpty()) {
                    jobSeeker.setResume(resume.getBytes());
                }
                if (profilePic != null && !profilePic.isEmpty()) {
                    jobSeeker.setProfilePic(profilePic.getBytes());
                }
            } catch(Exception e) {
                return ResponseEntity.status(500).body("Error processing files");
            }
            
            jobSeekerRepository.save(jobSeeker);
            return ResponseEntity.ok(jobSeeker);
        }
        return ResponseEntity.notFound().build();
    }
}

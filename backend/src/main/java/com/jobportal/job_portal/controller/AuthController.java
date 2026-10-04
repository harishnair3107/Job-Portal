package com.jobportal.job_portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.job_portal.dto.JobSeekerRegisterRequest;
import com.jobportal.job_portal.dto.RecruiterRegisterRequest;
import com.jobportal.job_portal.service.AuthService;

import jakarta.validation.Valid;
import java.util.Map;
import java.util.HashMap;

@RestController 
@RequestMapping("/api/auth/register")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;
    
    @PostMapping("/job-seeker")
    public ResponseEntity<Map<String, String>> registerRequestJobSeeker(@RequestBody @Valid JobSeekerRegisterRequest request) {
        authService.registerJobSeeker(request);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Job Seeker registered successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/recruiter")
    public ResponseEntity<Map<String, String>> registerRequestRecruiter(@RequestBody @Valid RecruiterRegisterRequest request) {
        authService.registerRecruiter(request);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Recruiter registered successfully");
        return ResponseEntity.ok(response);
    }
}

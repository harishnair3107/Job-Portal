package com.jobportal.job_portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.jobportal.job_portal.entities.Recruiters;
import com.jobportal.job_portal.entities.Accounts;
import com.jobportal.job_portal.entities.Company;
import com.jobportal.job_portal.repositories.RecruiterRepository;
import com.jobportal.job_portal.repositories.AccountRepository;
import com.jobportal.job_portal.repositories.CompanyRepository;
import com.jobportal.job_portal.security.JwtUtil;

import java.util.Optional;

@RestController
@RequestMapping("/api/recruiters")
@CrossOrigin(origins = "*")
public class RecruiterController {

    @Autowired
    private RecruiterRepository recruiterRepository;

    @Autowired
    private AccountRepository accountRepository;
    
    @Autowired
    private CompanyRepository companyRepository;

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
        
        Optional<Recruiters> recOpt = recruiterRepository.findByAccount(account);
        if (recOpt.isPresent()) {
            return ResponseEntity.ok(recOpt.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping(value = "/me/company/logo", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadCompanyLogo(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestParam("logo") MultipartFile logo) {
        Accounts account = getAccountFromToken(authHeader);
        if (account == null) return ResponseEntity.status(401).body("Unauthorized");
        
        Optional<Recruiters> recOpt = recruiterRepository.findByAccount(account);
        if (recOpt.isPresent()) {
            Recruiters recruiter = recOpt.get();
            Company company = recruiter.getCompany();
            if (company != null) {
                try {
                    if (logo != null && !logo.isEmpty()) {
                        company.setLogo(logo.getBytes());
                        companyRepository.save(company);
                        return ResponseEntity.ok(company);
                    }
                } catch(Exception e) {
                    return ResponseEntity.status(500).body("Error processing logo");
                }
            }
            return ResponseEntity.badRequest().body("Company not found for recruiter");
        }
        return ResponseEntity.notFound().build();
    }
}

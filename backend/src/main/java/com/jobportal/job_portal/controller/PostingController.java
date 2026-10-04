package com.jobportal.job_portal.controller;

import com.jobportal.job_portal.entities.Posting;
import com.jobportal.job_portal.repositories.PostingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;
import java.util.Optional;

import com.jobportal.job_portal.entities.Accounts;
import com.jobportal.job_portal.entities.Recruiters;
import com.jobportal.job_portal.entities.Company;
import com.jobportal.job_portal.repositories.AccountRepository;
import com.jobportal.job_portal.repositories.RecruiterRepository;
import com.jobportal.job_portal.security.JwtUtil;

@RestController
@RequestMapping("/api/postings")
@CrossOrigin(origins = "*")
public class PostingController {

    @Autowired
    private PostingRepository postingRepository;
    
    @Autowired
    private AccountRepository accountRepository;
    
    @Autowired
    private RecruiterRepository recruiterRepository;
    
    @Autowired
    private JwtUtil jwtUtil;

    private Recruiters getRecruiterFromToken(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                String email = jwtUtil.extractEmail(token);
                if (email != null) {
                    Accounts account = accountRepository.findByEmail(email).orElse(null);
                    if (account != null) {
                        return recruiterRepository.findByAccount(account).orElse(null);
                    }
                }
            } catch (Exception e) {}
        }
        return null;
    }

    @GetMapping
    public ResponseEntity<List<Posting>> getAllPostings() {
        List<Posting> postings = postingRepository.findAll();
        postings.sort((p1, p2) -> p2.getPostingId().compareTo(p1.getPostingId()));
        return ResponseEntity.ok(postings);
    }

    @GetMapping("/company")
    public ResponseEntity<?> getCompanyPostings(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        Recruiters recruiter = getRecruiterFromToken(authHeader);
        if (recruiter == null || recruiter.getCompany() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        List<Posting> postings = postingRepository.findByCompany(recruiter.getCompany());
        postings.sort((p1, p2) -> p2.getPostingId().compareTo(p1.getPostingId()));
        return ResponseEntity.ok(postings);
    }

    @PostMapping
    public ResponseEntity<?> createPosting(@RequestHeader(value = "Authorization", required = false) String authHeader, @RequestBody Posting posting) {
        Recruiters recruiter = getRecruiterFromToken(authHeader);
        if (recruiter == null || recruiter.getCompany() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        posting.setCompany(recruiter.getCompany());
        return ResponseEntity.ok(postingRepository.save(posting));
    }
}

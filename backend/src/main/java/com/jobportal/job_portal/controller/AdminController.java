package com.jobportal.job_portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jobportal.job_portal.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/analytics")
    public ResponseEntity<?> getAnalytics(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (!adminService.isAdmin(authHeader)) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        return ResponseEntity.ok(adminService.getAnalytics());
    }

    @GetMapping("/companies")
    public ResponseEntity<?> getCompanies(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (!adminService.isAdmin(authHeader)) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        return ResponseEntity.ok(adminService.getAllCompanies());
    }

    @PostMapping("/company")
    public ResponseEntity<?> addCompany(@RequestHeader(value = "Authorization", required = false) String authHeader, @RequestBody com.jobportal.job_portal.entities.Company company) {
        if (!adminService.isAdmin(authHeader)) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        return ResponseEntity.ok(adminService.addCompany(company));
    }

    @GetMapping("/recruiters")
    public ResponseEntity<?> getRecruiters(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (!adminService.isAdmin(authHeader)) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        return ResponseEntity.ok(adminService.getAllRecruiters());
    }

    @GetMapping("/job-seekers")
    public ResponseEntity<?> getJobSeekers(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (!adminService.isAdmin(authHeader)) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        return ResponseEntity.ok(adminService.getAllJobSeekers());
    }

    @GetMapping("/postings")
    public ResponseEntity<?> getPostings(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (!adminService.isAdmin(authHeader)) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        return ResponseEntity.ok(adminService.getAllPostings());
    }
}

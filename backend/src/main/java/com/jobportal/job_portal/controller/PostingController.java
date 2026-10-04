package com.jobportal.job_portal.controller;

import com.jobportal.job_portal.entities.Posting;
import com.jobportal.job_portal.repositories.PostingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/postings")
@CrossOrigin(origins = "*")
public class PostingController {

    @Autowired
    private PostingRepository postingRepository;

    @GetMapping
    public ResponseEntity<List<Posting>> getAllPostings() {
        return ResponseEntity.ok(postingRepository.findAll());
    }
}

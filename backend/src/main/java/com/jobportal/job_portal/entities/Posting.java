package com.jobportal.job_portal.entities;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity 
public class Posting {
    @Id 
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long postingId;
    private String Role;
    private String jobRequirement;
    private String jobDescription;
    @ManyToOne 
    @JoinColumn(name="company_id")
    private Company company;
    @OneToMany(
        mappedBy = "posting",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    @JsonIgnore
    private List<Applications> postingApplications= new ArrayList<>();

    public List<Applications> getPostingApplications() {
        return postingApplications;
    }

    public void setPostingApplications(List<Applications> postingApplications) {
        this.postingApplications = postingApplications;
    }
    
    public Long getPostingId() {
        return postingId;
    }

    public void setPostingId(Long postingId) {
        this.postingId = postingId;
    }

    public String getRole() {
        return Role;
    }

    public void setRole(String role) {
        this.Role = role;
    }

    public String getJobRequirement() {
        return jobRequirement;
    }

    public void setJobRequirement(String jobRequirement) {
        this.jobRequirement = jobRequirement;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
}

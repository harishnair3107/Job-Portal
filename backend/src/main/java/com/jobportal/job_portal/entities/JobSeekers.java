package com.jobportal.job_portal.entities;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity 
public class JobSeekers {
    @Id 
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long JobSeekerId;
    private String name;
    @Lob 
    @Column(name="Resume")
    private byte[] resume;
    @Lob 
    @Column(name="Profile_pic")
    private byte[] profilePic;
    private String profileSummary;
    @OneToMany(
    mappedBy = "jobseeker",
    cascade = CascadeType.ALL,
    orphanRemoval = true
    )
    private List<Education> educationList = new ArrayList<>();
    @OneToMany(
        mappedBy = "jobSeeker",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    @JsonIgnore
    private List<Applications> appliedPosting = new ArrayList<>();
    
    @OneToOne
    @JoinColumn(name = "account_id", unique = true, nullable = false)
    @JsonIgnore
    private Accounts account;
    

    public List<Applications> getAppliedPosting() {
        return appliedPosting;
    }

    public void setAppliedPosting(List<Applications> appliedPosting) {
        this.appliedPosting = appliedPosting;
    }
    public Long getJobSeekerId() {
        return JobSeekerId;
    }

    public void setJobSeekerId(Long jobSeekerId) {
        this.JobSeekerId = jobSeekerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getResume() {
        return resume;
    }

    public void setResume(byte[] resume) {
        this.resume = resume;
    }

    public byte[] getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(byte[] profilePic) {
        this.profilePic = profilePic;
    }

    public String getProfileSummary() {
        return profileSummary;
    }

    public void setProfileSummary(String profileSummary) {
        this.profileSummary = profileSummary;
    }

    public List<Education> getEducationList() {
        return educationList;
    }

    public void setEducationList(List<Education> educationList) {
        this.educationList = educationList;
    }
    public void setAccount(Accounts account){
        this.account=account;
    }
}

package com.jobportal.job_portal.entities;

import java.time.LocalDate;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


public class Education {
    @Id 
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long educationId;
    private String educationType;
    private String instituteName;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double percentage;
    @ManyToOne 
    @JoinColumn(name="job_seeker_id")
    private JobSeekers jobseeker;

    public Long getEducationId() {
        return educationId;
    }

    public void setEducationId(Long educationId) {
        this.educationId = educationId;
    }

    public String getEducationType() {
        return educationType;
    }

    public void setEducationType(String educationType) {
        this.educationType = educationType;
    }

    public String getInstituteName() {
        return instituteName;
    }

    public void setInstituteName(String instituteName) {
        this.instituteName = instituteName;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Double getPercentage() {
        return percentage;
    }

    public void setPercentage(Double percentage) {
        this.percentage = percentage;
    }

    public JobSeekers getJobseeker() {
        return jobseeker;
    }

    public void setJobseeker(JobSeekers jobseeker) {
        this.jobseeker = jobseeker;
    }
}

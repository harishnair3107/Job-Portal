package com.jobportal.job_portal.entities;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;


public class Recruiters {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long RecruiterId;
    private String companyName;
    private String companyemail;
    private String password;
    @Column(unique=true,nullable=false)
    private String companyId;
    @Lob
    @Column(name= "Company_Logo") 
    private byte[] company_logo;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    public Recruiters(){
        this.createdAt=LocalDateTime.now();
        this.updatedAt=LocalDateTime.now();
    }
    public Long getRecruiterId(){
        return RecruiterId;
    }
    



}

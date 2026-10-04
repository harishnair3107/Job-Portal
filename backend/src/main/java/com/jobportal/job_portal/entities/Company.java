package com.jobportal.job_portal.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
@Entity
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long companyId;
    
    private String companyName;
    
    @Lob
    @Column(name= "logo")
    private byte[] logo;
    @Column(unique = true,nullable=false)
    private String companyCode;
    private String description;
    private String website;
    private String[] location;

    @OneToMany(
        mappedBy = "company",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<Recruiters> recruiters = new ArrayList<>();

    @OneToMany(
        mappedBy = "company",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<Posting> postings = new ArrayList<>();

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public byte[] getLogo() {
        return logo;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String[] getLocation() {
        return location;
    }

    public void setLocation(String[] location) {
        this.location = location;
    }

    public List<Recruiters> getRecruiters() {
        return recruiters;
    }

    public void setRecruiters(List<Recruiters> recruiters) {
        this.recruiters = recruiters;
    }

    public List<Posting> getPostings() {
        return postings;
    }

    public void setPostings(List<Posting> postings) {
        this.postings = postings;
    }
    public void setCompanyCode(String companyCode){
        this.companyCode=companyCode;
    }
    public String getCompanyCode(){
        return companyCode;
    }
}

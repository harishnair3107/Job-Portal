package com.jobportal.job_portal.dto;

public class RecruiterAdminDTO {
    private Long recruiterId;
    private String name;
    private String email;
    private String companyName;
    private long postingsCount;

    public RecruiterAdminDTO(Long recruiterId, String name, String email, String companyName, long postingsCount) {
        this.recruiterId = recruiterId;
        this.name = name;
        this.email = email;
        this.companyName = companyName;
        this.postingsCount = postingsCount;
    }

    public Long getRecruiterId() { return recruiterId; }
    public void setRecruiterId(Long recruiterId) { this.recruiterId = recruiterId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public long getPostingsCount() { return postingsCount; }
    public void setPostingsCount(long postingsCount) { this.postingsCount = postingsCount; }
}

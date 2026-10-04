package com.jobportal.job_portal.dto;

public class PostingAdminDTO {
    private Long postingId;
    private String role;
    private String companyName;
    private Double salary;
    private int applicantCount;

    public PostingAdminDTO(Long postingId, String role, String companyName, Double salary, int applicantCount) {
        this.postingId = postingId;
        this.role = role;
        this.companyName = companyName;
        this.salary = salary;
        this.applicantCount = applicantCount;
    }

    public Long getPostingId() { return postingId; }
    public void setPostingId(Long postingId) { this.postingId = postingId; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public Double getSalary() { return salary; }
    public void setSalary(Double salary) { this.salary = salary; }

    public int getApplicantCount() { return applicantCount; }
    public void setApplicantCount(int applicantCount) { this.applicantCount = applicantCount; }
}

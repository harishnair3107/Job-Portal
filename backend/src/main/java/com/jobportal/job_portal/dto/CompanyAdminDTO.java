package com.jobportal.job_portal.dto;

public class CompanyAdminDTO {
    private Long companyId;
    private String companyCode;
    private String companyName;
    private String website;
    private int recruitersCount;

    public CompanyAdminDTO(Long companyId, String companyCode, String companyName, String website, int recruitersCount) {
        this.companyId = companyId;
        this.companyCode = companyCode;
        this.companyName = companyName;
        this.website = website;
        this.recruitersCount = recruitersCount;
    }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }
    public String getCompanyCode() { return companyCode; }
    public void setCompanyCode(String companyCode) { this.companyCode = companyCode; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }
    public int getRecruitersCount() { return recruitersCount; }
    public void setRecruitersCount(int recruitersCount) { this.recruitersCount = recruitersCount; }
}

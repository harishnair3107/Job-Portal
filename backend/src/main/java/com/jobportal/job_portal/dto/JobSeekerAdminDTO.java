package com.jobportal.job_portal.dto;

public class JobSeekerAdminDTO {
    private Long id;
    private String name;
    private String email;
    private int applicationsCount;

    public JobSeekerAdminDTO(Long id, String name, String email, int applicationsCount) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.applicationsCount = applicationsCount;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public int getApplicationsCount() { return applicationsCount; }
    public void setApplicationsCount(int applicationsCount) { this.applicationsCount = applicationsCount; }
}

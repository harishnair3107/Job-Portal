package com.jobportal.job_portal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.job_portal.repositories.CompanyRepository;
import com.jobportal.job_portal.repositories.PostingRepository;
import com.jobportal.job_portal.repositories.JobSeekerRepository;
import com.jobportal.job_portal.repositories.RecruiterRepository;
import com.jobportal.job_portal.repositories.AccountRepository;
import com.jobportal.job_portal.repositories.ApplicationRepository;
import com.jobportal.job_portal.entities.Accounts;
import com.jobportal.job_portal.entities.AccountType;
import com.jobportal.job_portal.entities.Company;
import com.jobportal.job_portal.entities.Recruiters;
import com.jobportal.job_portal.entities.JobSeekers;
import com.jobportal.job_portal.entities.Posting;
import com.jobportal.job_portal.dto.RecruiterAdminDTO;
import com.jobportal.job_portal.dto.CompanyAdminDTO;
import com.jobportal.job_portal.dto.JobSeekerAdminDTO;
import com.jobportal.job_portal.dto.PostingAdminDTO;
import com.jobportal.job_portal.security.JwtUtil;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

@Service
public class AdminService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private PostingRepository postingRepository;

    @Autowired
    private JobSeekerRepository jobSeekerRepository;

    @Autowired
    private RecruiterRepository recruiterRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public boolean isAdmin(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                String email = jwtUtil.extractEmail(token);
                if (email != null) {
                    Accounts acc = accountRepository.findByEmail(email).orElse(null);
                    return acc != null && acc.getAccountType() == AccountType.ADMIN;
                }
            } catch (Exception e) {
                return false;
            }
        }
        return false;
    }

    public Map<String, Object> getAnalytics() {
        long totalCompanies = companyRepository.count();
        long totalPostings = postingRepository.count();
        long totalJobSeekers = jobSeekerRepository.count();
        long totalRecruiters = recruiterRepository.count();
        long totalApplications = applicationRepository.count();
        long totalUsers = totalJobSeekers + totalRecruiters;

        Map<String, Object> response = new HashMap<>();
        response.put("totalCompanies", totalCompanies);
        response.put("totalPostings", totalPostings);
        response.put("totalUsers", totalUsers);
        response.put("totalJobSeekers", totalJobSeekers);
        response.put("totalRecruiters", totalRecruiters);
        response.put("totalApplications", totalApplications);

        return response;
    }

    public List<CompanyAdminDTO> getAllCompanies() {
        List<Company> companies = companyRepository.findAll();
        List<CompanyAdminDTO> dtos = new ArrayList<>();
        for(Company c : companies) {
            int recruiterCount = recruiterRepository.findByCompany(c).size();
            dtos.add(new CompanyAdminDTO(c.getCompanyId(), c.getCompanyCode(), c.getCompanyName(), c.getWebsite(), recruiterCount));
        }
        return dtos;
    }

    public Company addCompany(Company company) {
        return companyRepository.save(company);
    }

    public List<RecruiterAdminDTO> getAllRecruiters() {
        List<Recruiters> recruiters = recruiterRepository.findAll();
        List<RecruiterAdminDTO> dtoList = new ArrayList<>();
        
        for (Recruiters r : recruiters) {
            String email = r.getAccount() != null ? r.getAccount().getEmail() : "N/A";
            String companyName = r.getCompany() != null ? r.getCompany().getCompanyName() : "No Company";
            
            long postingsCount = postingRepository.findByRecruiter(r).size();
            
            dtoList.add(new RecruiterAdminDTO(r.getRecruiterId(), r.getName(), email, companyName, postingsCount));
        }
        
        return dtoList;
    }

    public List<JobSeekerAdminDTO> getAllJobSeekers() {
        List<JobSeekers> seekers = jobSeekerRepository.findAll();
        List<JobSeekerAdminDTO> dtoList = new ArrayList<>();
        
        for (JobSeekers js : seekers) {
            String email = js.getAccount() != null ? js.getAccount().getEmail() : "N/A";
            int applicationsCount = js.getAppliedPosting() != null ? js.getAppliedPosting().size() : 0;
            dtoList.add(new JobSeekerAdminDTO(js.getJobSeekerId(), js.getName(), email, applicationsCount));
        }
        
        return dtoList;
    }

    public List<PostingAdminDTO> getAllPostings() {
        List<Posting> postings = postingRepository.findAll();
        List<PostingAdminDTO> dtoList = new ArrayList<>();
        
        for (Posting p : postings) {
            String companyName = p.getCompany() != null ? p.getCompany().getCompanyName() : "No Company";
            int applicantCount = p.getPostingApplications() != null ? p.getPostingApplications().size() : 0;
            dtoList.add(new PostingAdminDTO(p.getPostingId(), p.getRole(), companyName, p.getSalary(), applicantCount));
        }
        
        return dtoList;
    }
}

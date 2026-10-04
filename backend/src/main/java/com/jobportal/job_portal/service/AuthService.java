package com.jobportal.job_portal.service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobportal.job_portal.entities.JobSeekers;
import com.jobportal.job_portal.entities.Recruiters;
import com.jobportal.job_portal.dto.JobSeekerRegisterRequest;
import com.jobportal.job_portal.dto.RecruiterRegisterRequest;
import com.jobportal.job_portal.entities.AccountType;
import com.jobportal.job_portal.entities.Accounts;
import com.jobportal.job_portal.entities.Company;
import com.jobportal.job_portal.entities.Status;
import com.jobportal.job_portal.repositories.AccountRepository;
import com.jobportal.job_portal.repositories.CompanyRepository;
import com.jobportal.job_portal.repositories.JobSeekerRepository;
import com.jobportal.job_portal.repositories.RecruiterRepository;
import com.jobportal.job_portal.security.JwtUtil;
@Service 
public class AuthService {
    private final AccountRepository accountRepository;
    private final JobSeekerRepository jobSeekerRepository;
    private final RecruiterRepository recruiterRepository;
    private final PasswordEncoder passwordEncoder;
    private final CompanyRepository companyRepository;
    private final JwtUtil jwtUtil;

    public AuthService(AccountRepository accountRepository,JobSeekerRepository jobSeekerRepository,RecruiterRepository recruiterRepository , PasswordEncoder passwordEncoder,CompanyRepository companyRepository, JwtUtil jwtUtil){
        this.accountRepository=accountRepository;
        this.jobSeekerRepository=jobSeekerRepository;
        this.recruiterRepository=recruiterRepository;
        this.passwordEncoder=passwordEncoder;
        this.companyRepository=companyRepository;
        this.jwtUtil=jwtUtil;
    }
    @Transactional 
    public void registerJobSeeker(JobSeekerRegisterRequest jobSeekerRegisterRequest){
        Accounts account= new Accounts();
        
        account.setEmail(jobSeekerRegisterRequest.getEmail());
        account.setPassword(passwordEncoder.encode(jobSeekerRegisterRequest.getPassword()));
        account.setStatus(Status.ACTIVE);
        account.setAccountType(AccountType.JOB_SEEKERS);
        accountRepository.save(account);
        JobSeekers jobSeeker = new JobSeekers();

        jobSeeker.setName(jobSeekerRegisterRequest.getName());
        jobSeeker.setAccount(account);

        jobSeekerRepository.save(jobSeeker);

    }
    @Transactional 
    public void registerRecruiter(RecruiterRegisterRequest recruiterRegisterRequest){
        Accounts account =new Accounts();
        accountRepository.findByEmail(recruiterRegisterRequest.getEmail()).orElseThrow();
        account.setEmail(recruiterRegisterRequest.getEmail());
        account.setPassword(passwordEncoder.encode(recruiterRegisterRequest.getPassword()));
        account.setAccountType(AccountType.RECRUITERS);
        account.setStatus(Status.ACTIVE);
        accountRepository.save(account);
        Recruiters recruiter=new Recruiters();
        recruiter.setName(recruiterRegisterRequest.getName());
        recruiter.setAccount(account);
       
        Company company=companyRepository.findByCompanyCode(recruiterRegisterRequest.getCompanyCode()).orElseThrow();
        recruiter.setCompany(company);
        recruiterRepository.save(recruiter);
    }
    
    public String login(String email, String password) {
        Accounts account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
                
        if (!passwordEncoder.matches(password, account.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        return jwtUtil.generateToken(account.getEmail(), account.getAccountType().name());
    }
}

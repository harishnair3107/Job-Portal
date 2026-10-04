package com.jobportal.job_portal.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.jobportal.job_portal.entities.Company;
import com.jobportal.job_portal.repositories.CompanyRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private CompanyRepository companyRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (companyRepository.count() == 0) {
            for (int i = 1; i <= 50; i++) {
                Company company = new Company();
                company.setCompanyName("Company " + i + " Inc.");
                company.setCompanyCode("COMP" + String.format("%03d", i));
                company.setDescription("Description for Company " + i);
                company.setWebsite("https://company" + i + ".com");
                
                companyRepository.save(company);
            }
            System.out.println("Seeded 50 companies into the database.");
        }
    }
}

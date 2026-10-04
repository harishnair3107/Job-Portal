package com.jobportal.job_portal.config;

import com.jobportal.job_portal.entities.Company;
import com.jobportal.job_portal.entities.Posting;
import com.jobportal.job_portal.repositories.CompanyRepository;
import com.jobportal.job_portal.repositories.PostingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private PostingRepository postingRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (companyRepository.count() < 40) {
            System.out.println("Clearing old data to insert 40+ companies and 150+ jobs...");
            try {
                postingRepository.deleteAll();
                companyRepository.deleteAll();
            } catch (Exception e) {
                System.out.println("Could not delete existing data, appending instead.");
            }

            String[] companyNames = {
                "Google", "Microsoft", "Stripe", "Netflix", "Amazon", "Apple", "Meta", "Tesla", 
                "Airbnb", "Uber", "Lyft", "Spotify", "Slack", "Zoom", "Salesforce", "Oracle", 
                "IBM", "Intel", "AMD", "Nvidia", "Adobe", "Atlassian", "Twilio", "Snowflake", 
                "Datadog", "Palantir", "Square", "Coinbase", "Robinhood", "Plaid", "Brex", 
                "Rippling", "Deel", "Gusto", "Notion", "Figma", "Canva", "Discord", "Reddit", 
                "Pinterest", "Snap", "TikTok", "ByteDance", "Tencent", "Alibaba", "OpenAI", 
                "Anthropic", "Scale AI", "Databricks", "Cloudflare"
            };

            List<Company> savedCompanies = new ArrayList<>();
            for (int i = 0; i < companyNames.length; i++) {
                Company company = new Company();
                company.setCompanyName(companyNames[i]);
                company.setCompanyCode("CMP" + String.format("%03d", i + 1));
                company.setDescription("Leading technology company focused on innovation and scaling global infrastructure.");
                company.setWebsite("https://" + companyNames[i].toLowerCase().replace(" ", "") + ".com");
                savedCompanies.add(companyRepository.save(company));
            }

            String[] roles = {
                "Software Engineer", "Senior Software Engineer", "Staff Software Engineer", "Principal Engineer", 
                "Data Scientist", "Senior Data Scientist", "Machine Learning Engineer", "Product Manager", 
                "Senior Product Manager", "Group Product Manager", "Frontend Engineer", "Backend Engineer", 
                "Full Stack Engineer", "DevOps Engineer", "Site Reliability Engineer", "Cloud Architect", 
                "Data Engineer", "Quantitative Researcher", "Security Engineer", "Engineering Manager"
            };

            String[] requirementsList = {
                "Java, Spring Boot, Microservices, SQL, AWS, Kafka",
                "Python, Django, PostgreSQL, Redis, Docker, Kubernetes",
                "React, TypeScript, Node.js, GraphQL, MongoDB, Next.js",
                "Go, Kubernetes, gRPC, Terraform, CI/CD, Prometheus",
                "C++, Linux, Low Latency, Distributed Systems, Multi-threading",
                "Python, PyTorch, TensorFlow, Pandas, SQL, ML Ops",
                "Product Strategy, A/B Testing, User Research, Agile, Jira",
                "AWS, Terraform, Ansible, Jenkins, Linux Administration",
                "Spark, Hadoop, Snowflake, dbt, SQL, Airflow",
                "Cybersecurity, Penetration Testing, IAM, Network Security"
            };

            String[] descriptions = {
                "We are looking for an experienced professional to join our core team. You will be responsible for architecting scalable systems, driving product vision, and pushing the boundaries of what is possible.",
                "Join our fast-growing startup to build the next generation of enterprise software. You will work closely with cross-functional teams to deliver high-impact features to millions of daily active users.",
                "As a key member of our engineering organization, you will tackle complex technical challenges, optimize performance, and mentor junior engineers while owning massive infrastructure.",
                "We need a passionate leader who can navigate ambiguity and deliver results. You will own a critical part of our ecosystem, scaling it to handle billions of requests per day with zero downtime.",
                "Come build the future with us. We offer highly competitive compensation, unmatched benefits, and the opportunity to work on industry-defining technology alongside world-class talent."
            };

            Random random = new Random();
            List<Posting> postings = new ArrayList<>();

            for (int i = 0; i < 150; i++) {
                Company randomCompany = savedCompanies.get(random.nextInt(savedCompanies.size()));
                String randomRole = roles[random.nextInt(roles.length)];
                String randomReqs = requirementsList[random.nextInt(requirementsList.length)];
                String randomDesc = descriptions[random.nextInt(descriptions.length)];

                Posting posting = new Posting();
                posting.setRole(randomRole);
                posting.setJobRequirement(randomReqs);
                posting.setJobDescription(randomDesc);
                posting.setCompany(randomCompany);
                postings.add(posting);
            }

            postingRepository.saveAll(postings);
            System.out.println("Successfully seeded " + savedCompanies.size() + " companies and " + postings.size() + " job postings.");
        }
    }
}

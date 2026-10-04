package com.jobportal.job_portal.config;

import com.jobportal.job_portal.entities.Company;
import com.jobportal.job_portal.entities.Posting;
import com.jobportal.job_portal.repositories.CompanyRepository;
import com.jobportal.job_portal.repositories.PostingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.jobportal.job_portal.entities.Accounts;
import com.jobportal.job_portal.entities.AccountType;
import com.jobportal.job_portal.entities.Recruiters;
import com.jobportal.job_portal.entities.Status;
import com.jobportal.job_portal.repositories.AccountRepository;
import com.jobportal.job_portal.repositories.AdminRepository;
import com.jobportal.job_portal.repositories.RecruiterRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.time.LocalDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private PostingRepository postingRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private RecruiterRepository recruiterRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private com.jobportal.job_portal.repositories.JobSeekerRepository jobSeekerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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

            String[] firstNames = {"James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas", "Christopher", "Daniel", "Paul", "Mark", "Donald", "George", "Kenneth", "Steven", "Edward", "Brian", "Ronald", "Anthony", "Kevin", "Jason", "Matthew", "Gary", "Timothy", "Jose", "Larry", "Jeffrey", "Frank", "Scott", "Eric", "Stephen", "Andrew", "Raymond", "Gregory", "Joshua", "Jerry", "Dennis", "Walter", "Patrick", "Peter", "Harold", "Douglas", "Henry", "Carl", "Arthur", "Ryan", "Roger", "Sarah", "Jessica", "Emily", "Ashley", "Samantha", "Amanda", "Brittany", "Elizabeth", "Taylor", "Megan", "Hannah", "Kayla", "Lauren", "Stephanie", "Rachel", "Jennifer", "Nicole", "Amber", "Courtney", "Heather", "Melissa", "Danielle", "Haley", "Kelsey", "Victoria", "Morgan", "Chelsea", "Shelby", "Alyssa"};
            String[] lastNames = {"Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"};

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
            
            System.out.println("Seeding recruiters...");
            List<Recruiters> allRecruiters = new ArrayList<>();
            for (int i = 0; i < 40; i++) {
                String fName = firstNames[random.nextInt(firstNames.length)];
                String lName = lastNames[random.nextInt(lastNames.length)];
                
                Accounts account = new Accounts();
                account.setEmail(fName.toLowerCase() + "." + lName.toLowerCase() + i + "@company.com");
                account.setPassword(passwordEncoder.encode("password123"));
                account.setAccountType(AccountType.RECRUITERS);
                account.setStatus(Status.ACTIVE);
                account = accountRepository.save(account);

                Recruiters recruiter = new Recruiters();
                recruiter.setName(fName + " " + lName);
                recruiter.setCompany(savedCompanies.get(i % savedCompanies.size()));
                recruiter.setAccount(account);
                allRecruiters.add(recruiterRepository.save(recruiter));
            }

            List<Posting> postings = new ArrayList<>();

            for (int i = 0; i < 150; i++) {
                Recruiters randomRecruiter = allRecruiters.get(random.nextInt(allRecruiters.size()));
                Company randomCompany = randomRecruiter.getCompany();
                
                String randomRole = roles[random.nextInt(roles.length)];
                String randomReqs = requirementsList[random.nextInt(requirementsList.length)];
                String randomDesc = descriptions[random.nextInt(descriptions.length)];

                Posting posting = new Posting();
                posting.setRole(randomRole);
                posting.setJobRequirement(randomReqs);
                posting.setJobDescription(randomDesc);
                posting.setSalary(100000.0 + random.nextInt(150000));
                posting.setCompany(randomCompany);
                posting.setRecruiter(randomRecruiter);
                postings.add(posting);
            }

            postingRepository.saveAll(postings);
            System.out.println("Successfully seeded " + savedCompanies.size() + " companies, " + allRecruiters.size() + " recruiters, and " + postings.size() + " job postings.");
        }


        if (accountRepository.findByEmail("recruiter@test.com").isEmpty()) {
            // Re-seed the specific recruiter test email just in case
            Accounts testAcc = new Accounts();
            testAcc.setEmail("recruiter@test.com");
            testAcc.setPassword(passwordEncoder.encode("password123"));
            testAcc.setAccountType(AccountType.RECRUITERS);
            testAcc.setStatus(Status.ACTIVE);
            testAcc = accountRepository.save(testAcc);

            Recruiters testRec = new Recruiters();
            testRec.setName("Test Recruiter");
            List<Company> allCompanies = companyRepository.findAll();
            if (!allCompanies.isEmpty()) {
                testRec.setCompany(allCompanies.get(0));
            }
            testRec.setAccount(testAcc);
            recruiterRepository.save(testRec);
        }

        if (accountRepository.findByEmail("admin@gmail.com").isEmpty()) {
            Accounts account = new Accounts();
            account.setEmail("admin@gmail.com");
            account.setPassword(passwordEncoder.encode("admin123"));
            account.setAccountType(AccountType.ADMIN);
            account.setStatus(Status.ACTIVE);
            account = accountRepository.save(account);

            com.jobportal.job_portal.entities.Admin admin = new com.jobportal.job_portal.entities.Admin();
            admin.setName("Super Admin");
            admin.setAccount(account);
            adminRepository.save(admin);
            System.out.println("Seeded admin: admin@gmail.com / admin123");
        }

        // Add missing Job Seeker seeds if empty
        if (jobSeekerRepository.count() == 0) {
            Random jsRandom = new Random();
            System.out.println("Seeding job seekers...");
            
            String[] firstNames = {"James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas", "Christopher", "Daniel", "Paul", "Mark", "Donald", "George", "Kenneth", "Steven", "Edward", "Brian", "Sarah", "Jessica", "Emily", "Ashley", "Samantha", "Amanda", "Brittany", "Elizabeth", "Taylor", "Megan"};
            String[] lastNames = {"Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"};

            for (int i = 0; i < 30; i++) {
                String fName = firstNames[jsRandom.nextInt(firstNames.length)];
                String lName = lastNames[jsRandom.nextInt(lastNames.length)];

                Accounts jsAcc = new Accounts();
                jsAcc.setEmail(fName.toLowerCase() + "." + lName.toLowerCase() + i + "@talent.com");
                jsAcc.setPassword(passwordEncoder.encode("password123"));
                jsAcc.setAccountType(AccountType.JOB_SEEKERS);
                jsAcc.setStatus(Status.ACTIVE);
                jsAcc = accountRepository.save(jsAcc);

                com.jobportal.job_portal.entities.JobSeekers js = new com.jobportal.job_portal.entities.JobSeekers();
                js.setName(fName + " " + lName);
                js.setAccount(jsAcc);
                jobSeekerRepository.save(js);
            }
        }
    }
}

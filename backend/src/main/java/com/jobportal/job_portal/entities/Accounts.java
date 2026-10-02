package com.jobportal.job_portal.entities;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity 
public class Accounts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;
    private String name;
    @Column(unique=true,nullable=false)
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private AccountType accountType;
    @Enumerated(EnumType.STRING)
    private Status status;
    private LocalDateTime created_At;
    private LocalDateTime updated_At;
   public Accounts() {
    this.created_At = LocalDateTime.now();
    this.updated_At = LocalDateTime.now();
    this.status = Status.ACTIVE;
    }
    public Long getAccountId(){
        return accountId;
    }
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name=name;
    }
     public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email=email;
    }
    public Status getStatus(){
        return status;
    }
    public void setStatus(Status status){
        this.status=status;
    }
    public String getPassword(){
        return password;
    }
    public void setPassword(String password){
        this.password=password;
    }
    public LocalDateTime getCreatedAt(){
        return created_At;
    }
    public LocalDateTime getUpdatedAt(){
        return updated_At;
    }


}

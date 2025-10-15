package com.bsf.gub.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CommitteeMemberRequest {
    
    @NotBlank(message = "Full name is required")
    private String fullName;
    
    @NotBlank(message = "Position is required")
    private String position;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    
    private String phone;
    
    private String studentId;
    
    private String department;
    
    private String imageUrl;
    
    private String linkedinUrl;
    
    private String facebookUrl;
    
    private String bio;
    
    @NotBlank(message = "Year is required")
    private String year;
    
    private Integer displayOrder = 0;
    
    private Boolean active = true;
}

package com.bsf.gub.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "committee_members")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommitteeMember {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String fullName;
    
    @Column(nullable = false)
    private String position; // President, Vice President, General Secretary, etc.
    
    @Column(nullable = false)
    private String email;
    
    private String phone;
    
    private String studentId;
    
    private String department;
    
    private String imageUrl; // Profile photo URL
    
    private String linkedinUrl;
    
    private String facebookUrl;
    
    @Column(columnDefinition = "TEXT")
    private String bio;
    
    @Column(nullable = false)
    private String year; // 2024, 2025, etc. - for yearly tracking
    
    @Column(nullable = false)
    private Integer displayOrder = 0; // For custom ordering
    
    @Column(nullable = false)
    private Boolean active = true;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}

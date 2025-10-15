package com.bsf.gub.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NoticeRequest {
    
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    
    @NotBlank(message = "Category is required")
    private String category;
    
    private String fileUrl;
    
    private LocalDateTime publishDate;
    
    private LocalDateTime expiryDate;
    
    private Integer priority = 0;
    
    private Boolean active = true;
}

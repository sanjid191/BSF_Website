package com.bsf.gub.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiResponse {
    private Boolean success;
    private String message;
    private Object data;
    
    public ApiResponse(boolean success, String message, LoginResponse response) {
        this.success = success;
        this.message = message;
    }
}

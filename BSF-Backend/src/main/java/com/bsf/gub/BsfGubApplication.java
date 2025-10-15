package com.bsf.gub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BsfGubApplication {
    public static void main(String[] args) {
        SpringApplication.run(BsfGubApplication.class, args);
        System.out.println("🚀 BSF-GUB Backend is running on http://localhost:8080");
    }
}

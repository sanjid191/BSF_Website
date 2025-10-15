package com.bsf.gub.config;

import com.bsf.gub.model.User;
import com.bsf.gub.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private AuthService authService;
    
    @Override
    public void run(String... args) throws Exception {
        System.out.println("🔧 Initializing default data...");
        
        User admin = authService.createDefaultAdmin();
        if (admin != null) {
            System.out.println("✅ Default admin created:");
            System.out.println("   Email: admin@bsf.gub.edu.bd");
            System.out.println("   Password: admin123");
        } else {
            System.out.println("ℹ️  Default admin already exists");
        }
        
        System.out.println("✅ Data initialization completed!");
    }
}

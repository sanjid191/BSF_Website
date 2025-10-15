package com.bsf.gub.service;

import com.bsf.gub.dto.LoginRequest;
import com.bsf.gub.dto.LoginResponse;
import com.bsf.gub.model.User;
import com.bsf.gub.repository.UserRepository;
import com.bsf.gub.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtil.generateToken(authentication);
        
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return new LoginResponse(jwt, user.getEmail(), user.getFullName(), user.getRole().name());
    }
    
    public User createDefaultAdmin() {
        if (!userRepository.existsByEmail("admin@bsf.gub.edu.bd")) {
            User admin = new User();
            admin.setEmail("admin@bsf.gub.edu.bd");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFullName("BSF Admin");
            admin.setRole(User.Role.ADMIN);
            admin.setActive(true);
            return userRepository.save(admin);
        }
        return null;
    }
}

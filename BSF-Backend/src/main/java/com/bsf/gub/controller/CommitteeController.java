package com.bsf.gub.controller;

import com.bsf.gub.dto.ApiResponse;
import com.bsf.gub.dto.CommitteeMemberRequest;
import com.bsf.gub.model.CommitteeMember;
import com.bsf.gub.service.CommitteeMemberService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/committee")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CommitteeController {
    
    @Autowired
    private CommitteeMemberService committeeMemberService;
    
    // Public endpoint - no authentication required
    @GetMapping("/public")
    public ResponseEntity<?> getPublicCommitteeMembers(@RequestParam(required = false) String year) {
        List<CommitteeMember> members;
        if (year != null && !year.isEmpty()) {
            members = committeeMemberService.getMembersByYear(year);
        } else {
            members = committeeMemberService.getActiveMembers();
        }
        return ResponseEntity.ok(new ApiResponse(true, "Committee members fetched successfully", members));
    }
    
    @GetMapping("/public/{id}")
    public ResponseEntity<?> getPublicMemberById(@PathVariable Long id) {
        try {
            CommitteeMember member = committeeMemberService.getMemberById(id);
            return ResponseEntity.ok(new ApiResponse(true, "Committee member fetched successfully", member));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage(), response));
        }
    }
    
    // Admin endpoints - authentication required
    @GetMapping
    public ResponseEntity<?> getAllMembers() {
        List<CommitteeMember> members = committeeMemberService.getAllMembers();
        return ResponseEntity.ok(new ApiResponse(true, "All committee members fetched successfully", members));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getMemberById(@PathVariable Long id) {
        try {
            CommitteeMember member = committeeMemberService.getMemberById(id);
            return ResponseEntity.ok(new ApiResponse(true, "Committee member fetched successfully", member));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage(), response));
        }
    }
    
    @PostMapping
    public ResponseEntity<?> createMember(@Valid @RequestBody CommitteeMemberRequest request) {
        try {
            CommitteeMember member = committeeMemberService.createMember(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Committee member created successfully", member));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Failed to create committee member: " + e.getMessage(), response));
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMember(@PathVariable Long id, @Valid @RequestBody CommitteeMemberRequest request) {
        try {
            CommitteeMember member = committeeMemberService.updateMember(id, request);
            return ResponseEntity.ok(new ApiResponse(true, "Committee member updated successfully", member));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Failed to update committee member: " + e.getMessage(), response));
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMember(@PathVariable Long id) {
        try {
            committeeMemberService.deleteMember(id);
            return ResponseEntity.ok(new ApiResponse(true, "Committee member deleted successfully", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Failed to delete committee member: " + e.getMessage(), response));
        }
    }
    
    @PatchMapping("/{id}/toggle-status")
    public ResponseEntity<?> toggleMemberStatus(@PathVariable Long id) {
        try {
            CommitteeMember member = committeeMemberService.toggleMemberStatus(id);
            return ResponseEntity.ok(new ApiResponse(true, "Committee member status updated successfully", member));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Failed to update committee member status: " + e.getMessage(), response));
        }
    }
}

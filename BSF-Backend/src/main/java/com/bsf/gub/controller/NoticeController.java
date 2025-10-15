package com.bsf.gub.controller;

import com.bsf.gub.dto.ApiResponse;
import com.bsf.gub.dto.NoticeRequest;
import com.bsf.gub.model.Notice;
import com.bsf.gub.service.NoticeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
@CrossOrigin(origins = "*", maxAge = 3600)
public class NoticeController {
    
    @Autowired
    private NoticeService noticeService;
    
    // Public endpoint - no authentication required
    @GetMapping("/public")
    public ResponseEntity<?> getPublicNotices() {
        List<Notice> notices = noticeService.getActiveNotices();
        return ResponseEntity.ok(new ApiResponse(true, "Active notices fetched successfully", notices));
    }
    
    @GetMapping("/public/{id}")
    public ResponseEntity<?> getPublicNoticeById(@PathVariable Long id) {
        try {
            Notice notice = noticeService.getNoticeById(id);
            return ResponseEntity.ok(new ApiResponse(true, "Notice fetched successfully", notice));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage(), response));
        }
    }
    
    // Admin endpoints - authentication required
    @GetMapping
    public ResponseEntity<?> getAllNotices() {
        List<Notice> notices = noticeService.getAllNotices();
        return ResponseEntity.ok(new ApiResponse(true, "All notices fetched successfully", notices));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getNoticeById(@PathVariable Long id) {
        try {
            Notice notice = noticeService.getNoticeById(id);
            return ResponseEntity.ok(new ApiResponse(true, "Notice fetched successfully", notice));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage(), response));
        }
    }
    
    @PostMapping
    public ResponseEntity<?> createNotice(@Valid @RequestBody NoticeRequest request) {
        try {
            Notice notice = noticeService.createNotice(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Notice created successfully", notice));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Failed to create notice: " + e.getMessage(), response));
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateNotice(@PathVariable Long id, @Valid @RequestBody NoticeRequest request) {
        try {
            Notice notice = noticeService.updateNotice(id, request);
            return ResponseEntity.ok(new ApiResponse(true, "Notice updated successfully", notice));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Failed to update notice: " + e.getMessage(), response));
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable Long id) {
        try {
            noticeService.deleteNotice(id);
            return ResponseEntity.ok(new ApiResponse(true, "Notice deleted successfully", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Failed to delete notice: " + e.getMessage(), response));
        }
    }
    
    @PatchMapping("/{id}/toggle-status")
    public ResponseEntity<?> toggleNoticeStatus(@PathVariable Long id) {
        try {
            Notice notice = noticeService.toggleNoticeStatus(id);
            return ResponseEntity.ok(new ApiResponse(true, "Notice status updated successfully", notice));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Failed to update notice status: " + e.getMessage(), response));
        }
    }
}

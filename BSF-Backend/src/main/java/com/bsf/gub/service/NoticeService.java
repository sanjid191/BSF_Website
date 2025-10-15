package com.bsf.gub.service;

import com.bsf.gub.dto.NoticeRequest;
import com.bsf.gub.model.Notice;
import com.bsf.gub.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NoticeService {
    
    @Autowired
    private NoticeRepository noticeRepository;
    
    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }
    
    public List<Notice> getActiveNotices() {
        return noticeRepository.findByActiveTrueOrderByPriorityDescCreatedAtDesc();
    }
    
    public List<Notice> getNoticesByCategory(String category) {
        return noticeRepository.findByCategory(category);
    }
    
    public Notice getNoticeById(Long id) {
        return noticeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notice not found with id: " + id));
    }
    
    public Notice createNotice(NoticeRequest request) {
        Notice notice = new Notice();
        notice.setTitle(request.getTitle());
        notice.setDescription(request.getDescription());
        notice.setCategory(request.getCategory());
        notice.setFileUrl(request.getFileUrl());
        notice.setPublishDate(request.getPublishDate() != null ? request.getPublishDate() : LocalDateTime.now());
        notice.setExpiryDate(request.getExpiryDate());
        notice.setPriority(request.getPriority());
        notice.setActive(request.getActive());
        
        return noticeRepository.save(notice);
    }
    
    public Notice updateNotice(Long id, NoticeRequest request) {
        Notice notice = getNoticeById(id);
        notice.setTitle(request.getTitle());
        notice.setDescription(request.getDescription());
        notice.setCategory(request.getCategory());
        notice.setFileUrl(request.getFileUrl());
        notice.setPublishDate(request.getPublishDate());
        notice.setExpiryDate(request.getExpiryDate());
        notice.setPriority(request.getPriority());
        notice.setActive(request.getActive());
        
        return noticeRepository.save(notice);
    }
    
    public void deleteNotice(Long id) {
        Notice notice = getNoticeById(id);
        noticeRepository.delete(notice);
    }
    
    public Notice toggleNoticeStatus(Long id) {
        Notice notice = getNoticeById(id);
        notice.setActive(!notice.getActive());
        return noticeRepository.save(notice);
    }
}

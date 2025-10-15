package com.bsf.gub.repository;

import com.bsf.gub.model.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    List<Notice> findByActiveTrue();
    List<Notice> findByActiveTrueOrderByPriorityDescCreatedAtDesc();
    List<Notice> findByCategory(String category);
    List<Notice> findByActiveTrueAndExpiryDateAfter(LocalDateTime date);
}

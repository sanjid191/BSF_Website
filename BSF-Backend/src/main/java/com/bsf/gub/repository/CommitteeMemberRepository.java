package com.bsf.gub.repository;

import com.bsf.gub.model.CommitteeMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommitteeMemberRepository extends JpaRepository<CommitteeMember, Long> {
    List<CommitteeMember> findByActiveTrueOrderByDisplayOrderAsc();
    List<CommitteeMember> findByYear(String year);
    List<CommitteeMember> findByYearAndActiveTrueOrderByDisplayOrderAsc(String year);
}

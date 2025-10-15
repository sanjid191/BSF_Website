package com.bsf.gub.service;

import com.bsf.gub.dto.CommitteeMemberRequest;
import com.bsf.gub.model.CommitteeMember;
import com.bsf.gub.repository.CommitteeMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommitteeMemberService {
    
    @Autowired
    private CommitteeMemberRepository committeeMemberRepository;
    
    public List<CommitteeMember> getAllMembers() {
        return committeeMemberRepository.findAll();
    }
    
    public List<CommitteeMember> getActiveMembers() {
        return committeeMemberRepository.findByActiveTrueOrderByDisplayOrderAsc();
    }
    
    public List<CommitteeMember> getMembersByYear(String year) {
        return committeeMemberRepository.findByYearAndActiveTrueOrderByDisplayOrderAsc(year);
    }
    
    public CommitteeMember getMemberById(Long id) {
        return committeeMemberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Committee member not found with id: " + id));
    }
    
    public CommitteeMember createMember(CommitteeMemberRequest request) {
        CommitteeMember member = new CommitteeMember();
        member.setFullName(request.getFullName());
        member.setPosition(request.getPosition());
        member.setEmail(request.getEmail());
        member.setPhone(request.getPhone());
        member.setStudentId(request.getStudentId());
        member.setDepartment(request.getDepartment());
        member.setImageUrl(request.getImageUrl());
        member.setLinkedinUrl(request.getLinkedinUrl());
        member.setFacebookUrl(request.getFacebookUrl());
        member.setBio(request.getBio());
        member.setYear(request.getYear());
        member.setDisplayOrder(request.getDisplayOrder());
        member.setActive(request.getActive());
        
        return committeeMemberRepository.save(member);
    }
    
    public CommitteeMember updateMember(Long id, CommitteeMemberRequest request) {
        CommitteeMember member = getMemberById(id);
        member.setFullName(request.getFullName());
        member.setPosition(request.getPosition());
        member.setEmail(request.getEmail());
        member.setPhone(request.getPhone());
        member.setStudentId(request.getStudentId());
        member.setDepartment(request.getDepartment());
        member.setImageUrl(request.getImageUrl());
        member.setLinkedinUrl(request.getLinkedinUrl());
        member.setFacebookUrl(request.getFacebookUrl());
        member.setBio(request.getBio());
        member.setYear(request.getYear());
        member.setDisplayOrder(request.getDisplayOrder());
        member.setActive(request.getActive());
        
        return committeeMemberRepository.save(member);
    }
    
    public void deleteMember(Long id) {
        CommitteeMember member = getMemberById(id);
        committeeMemberRepository.delete(member);
    }
    
    public CommitteeMember toggleMemberStatus(Long id) {
        CommitteeMember member = getMemberById(id);
        member.setActive(!member.getActive());
        return committeeMemberRepository.save(member);
    }
}

package com.grouptwo.zalada.member.controller;

import com.grouptwo.zalada.member.domain.User;
import com.grouptwo.zalada.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "*")
public class MemberController {

    @Autowired
    private MemberRepository memberRepository;

    public MemberController(MemberRepository memberRepository){
        this.memberRepository = memberRepository;
    }

    public MemberController(){}

    @RequestMapping(value = "/member", method = RequestMethod.GET)
    public ArrayList findMemberByPage(){
        return null;
    }

    @RequestMapping(value = "/member/{id}", method = RequestMethod.GET)
    public User findMember(){
        return null;
    }

    @RequestMapping(value = "/member/forgotpassword", method = RequestMethod.POST)
    public ResponseEntity<String> forgotPassword(){
        return null;
    }

    @RequestMapping(value = "/member/signup", method = RequestMethod.POST)
    public String memberSignup(){
        return null;
    }

    @RequestMapping(value = "/member/signin", method = RequestMethod.GET)
    public String memberSignin(){
        return null;
    }

    @RequestMapping(value = "/member/profile", method = RequestMethod.GET)
    public User findProfile(){
        return null;
    }

    @RequestMapping(value = "/member/profile", method = RequestMethod.PUT)
    public void updateProfile(){
    }

    @RequestMapping(value = "/member/logout", method = RequestMethod.POST)
    public void memberLogout(){
    }


}

package com.grouptwo.zalada.member.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.grouptwo.zalada.member.domain.Authenticated;
import com.grouptwo.zalada.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class MemberController {

    @Autowired
    private MemberRepository memberRepository;

    public MemberController(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public MemberController() {
    }

    @RequestMapping(value = "/member/forgotpassword", method = RequestMethod.POST)
    public ResponseEntity<String> forgotPassword() {
        return null;
    }

    @RequestMapping(value = "/member/signup", method = RequestMethod.POST)
    public String memberSignup() {
        return null;
    }

    @RequestMapping(value = "/member/signin", method = RequestMethod.POST)
    public String memberSignin(@RequestAttribute("accessToken") String accessToken) throws JsonProcessingException {
        return accessToken;
    }

    @RequestMapping(value = "/member/profile", method = RequestMethod.GET)
    public String findProfile() {
        Authenticated auth = (Authenticated) SecurityContextHolder.getContext().getAuthentication();

        String username = auth.getName();
        return "OK " + username;
    }

    @RequestMapping(value = "/member/profile", method = RequestMethod.PUT)
    public void updateProfile() {

    }

    @RequestMapping(value = "/member/logout", method = RequestMethod.POST)
    public void memberLogout() {

    }
}

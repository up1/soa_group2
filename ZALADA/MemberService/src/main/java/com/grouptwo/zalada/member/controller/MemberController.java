package com.grouptwo.zalada.member.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.grouptwo.zalada.member.domain.Authenticated;
import com.grouptwo.zalada.member.domain.Member;
import com.grouptwo.zalada.member.domain.SignUp;
import com.grouptwo.zalada.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

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
    public ResponseEntity<String> memberSignup(@RequestBody SignUp signUp){
        return memberRepository.memberSignup(signUp);
    }

    @RequestMapping(value = "/member/signin", method = RequestMethod.POST)
    public String memberSignin(@RequestAttribute("access_token") String accessToken,
                               @RequestAttribute("username") String username) throws JsonProcessingException {
        Member member = memberRepository.findByUsername(username);
        HashMap<String, Object> map = new HashMap<>();
        map.put("cartid", member.getCartId());
        map.put("access_token", accessToken);
        ObjectMapper objectMapper =new ObjectMapper();
        return objectMapper.writeValueAsString(map);
    }

    @RequestMapping(value = "/member/profile", method = RequestMethod.GET)
    public Member findProfile() {
        Authenticated auth = (Authenticated) SecurityContextHolder.getContext().getAuthentication();
        return memberRepository.findByUsername(auth.getName());
    }

    @RequestMapping(value = "/member/profile", method = RequestMethod.PUT)
    public void updateProfile() {

    }

    @RequestMapping(value = "/member/logout", method = RequestMethod.POST)
    public void memberLogout() {

    }
}

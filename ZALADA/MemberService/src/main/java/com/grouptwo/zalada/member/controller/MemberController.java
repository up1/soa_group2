package com.grouptwo.zalada.member.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.grouptwo.zalada.member.domain.Authenticated;
import com.grouptwo.zalada.member.domain.Member;
import com.grouptwo.zalada.member.domain.SignUp;
import com.grouptwo.zalada.member.exception.DuplicateUserException;
import com.grouptwo.zalada.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @RequestMapping(value = "/member/signup", method = RequestMethod.POST)
    public ResponseEntity<String> memberSignup(@RequestBody SignUp signUp){
        try{
            return new ResponseEntity<>(memberRepository.memberSignup(signUp), HttpStatus.CREATED);
        }catch (DuplicateUserException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/member/signin", method = RequestMethod.POST)
    public String memberSignin(@RequestAttribute("access_token") String accessToken,
                               @RequestAttribute("username") String username) throws JsonProcessingException {
        Member member = memberRepository.findByUsername(username);
        HashMap<String, Object> map = new HashMap<>();
        map.put("cartId", member.getCartId());
        map.put("access_token", accessToken);
        ObjectMapper objectMapper =new ObjectMapper();
        return objectMapper.writeValueAsString(map);
    }

    @RequestMapping(value = "/member/profile", method = RequestMethod.GET)
    public ResponseEntity<String> findProfile() {
        Authenticated auth = (Authenticated) SecurityContextHolder.getContext().getAuthentication();
        Member member = memberRepository.findByUsername(auth.getName());
        if(member == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(member.toString(), HttpStatus.OK);
    }

    @RequestMapping(value = "/member/profile", method = RequestMethod.PUT)
    public void updateProfile() {

    }
}

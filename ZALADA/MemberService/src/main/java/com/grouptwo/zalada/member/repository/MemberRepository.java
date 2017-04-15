package com.grouptwo.zalada.member.repository;

import com.grouptwo.zalada.member.domain.Member;
import com.grouptwo.zalada.member.domain.SignIn;
import com.grouptwo.zalada.member.domain.SignUp;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Repository
public class MemberRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public Member findByUsername(String username){
        return mongoTemplate.findById(username, Member.class);
    }

    public SignIn getAuth(String username) {
        Query query = new Query(where("username").is(username));
        return mongoTemplate.findOne(query, SignIn.class);
    }

    public ResponseEntity<String> memberSignup(SignUp signUp){

        String hashPassword = DigestUtils.sha256Hex(signUp.getSignIn().getPassword());
        signUp.getSignIn().setPassword(hashPassword);

        if(signUp.getMember().getUsername() == null){
            signUp.getMember().setUsername(signUp.getSignIn().getUsername());
        }

        if(signUp.getSignIn().getRole() == null){
            ArrayList<String> mockRole = new ArrayList<>();
            mockRole.add("user");
            signUp.getSignIn().setRole(mockRole);
        }

        mongoTemplate.insert(signUp.getSignIn());
        mongoTemplate.insert(signUp.getMember());
        return new ResponseEntity<>(signUp.getMember().getUsername(), HttpStatus.CREATED);
    }

}

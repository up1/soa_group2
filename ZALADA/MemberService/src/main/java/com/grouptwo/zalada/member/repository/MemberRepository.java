package com.grouptwo.zalada.member.repository;

import com.grouptwo.zalada.member.domain.Login;
import com.grouptwo.zalada.member.domain.Signup;
import com.grouptwo.zalada.member.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Repository
public class MemberRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public ResponseEntity<String> memberSignup(Signup signup){
        if(signup.getUsername() != null && signup.getPassword() != null){
            Login loginUser = new Login(signup.getUsername(), signup.getPassword());
            User signupUser = new User(signup);
            mongoTemplate.insert(loginUser);
            mongoTemplate.insert(signupUser);
            return new ResponseEntity<>(signupUser.getUsername(), HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<String> memberSignin(String username, String password){
        if(mongoTemplate.findOne(queryByLogin(username, password), Login.class) != null){
            return new ResponseEntity<>(username, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    private Query queryByLogin(String username, String password){
        return new Query(where("username").is(username)).addCriteria(where("password").is(password));
    }
}

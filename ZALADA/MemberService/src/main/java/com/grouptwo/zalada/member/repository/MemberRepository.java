package com.grouptwo.zalada.member.repository;

import com.grouptwo.zalada.member.domain.Login;
import com.grouptwo.zalada.member.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Repository
public class MemberRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public ResponseEntity<String> memberSignup(Login login){
        if(login.getUsername() != null && login.getPassword() != null){
            User signupUser = new User(login.getUsername());
            mongoTemplate.insert(login);
            mongoTemplate.insert(signupUser);
            return new ResponseEntity<>(signupUser.getUsername(), HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    public String memberSignin(String username, String password){
        if(mongoTemplate.findOne(queryByLogin(username, password), Login.class) != null){
            return username;
        }
        return null;
    }

    private Query queryByLogin(String username, String password){
        return new Query(where("username").is(username)).addCriteria(where("password").is(password));
    }
}

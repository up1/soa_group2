package com.grouptwo.zalada.member.repository;

import com.grouptwo.zalada.member.domain.Member;

import com.grouptwo.zalada.member.domain.SignIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

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
}

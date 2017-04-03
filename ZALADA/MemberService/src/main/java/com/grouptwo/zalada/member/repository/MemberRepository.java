package com.grouptwo.zalada.member.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class MemberRepository {

    @Autowired
    private MongoTemplate mongoTemplate;
}

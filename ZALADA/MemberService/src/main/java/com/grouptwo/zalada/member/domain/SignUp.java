package com.grouptwo.zalada.member.domain;

public class SignUp {

    private Member member;
    private SignIn signIn;

    public SignUp(Member member, SignIn signIn) {
        this.member = member;
        this.signIn = signIn;
    }

    public SignUp(){
        //Constructor for Spring
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public SignIn getSignIn() {
        return signIn;
    }

    public void setSignIn(SignIn signIn) {
        this.signIn = signIn;
    }
}

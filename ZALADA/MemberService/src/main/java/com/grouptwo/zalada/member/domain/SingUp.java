package com.grouptwo.zalada.member.domain;

public class SingUp {

    private Member member;
    private SignIn signIn;

    public SingUp(Member member, SignIn signIn) {
        this.member = member;
        this.signIn = signIn;
    }

    public SingUp(){}

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

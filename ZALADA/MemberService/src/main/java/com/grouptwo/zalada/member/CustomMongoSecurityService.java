package com.grouptwo.zalada.member;

import com.grouptwo.zalada.member.domain.SignIn;
import com.grouptwo.zalada.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class CustomMongoSecurityService implements UserDetailsService {

    @Autowired
    private
    MemberRepository memberRepository;
    private SignIn signIn;

    @Override
    public UserDetails loadUserByUsername(String username) {
        signIn = memberRepository.getAuth(username);
        if (signIn == null) {
            throw new UsernameNotFoundException("User not found : " + username);
        }

        boolean enabled = true;
        boolean accountNonExpired = true;
        boolean credentialsNonExpired = true;
        boolean accountNonLocked = true;

        return new User
                (
                        signIn.getUsername(),
                        signIn.getPassword(),
                        enabled,
                        accountNonExpired,
                        credentialsNonExpired,
                        accountNonLocked,
                        getGrantedAuthorities()
                );
    }

    private Collection<SimpleGrantedAuthority> getGrantedAuthorities() {

        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        for (String role : signIn.getRole()) {
            authorities.add(new SimpleGrantedAuthority(role.trim()));
        }

        return authorities;
    }
}

package com.grouptwo.zalada.billing.utils;

import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

/**
 * Created by supphawit on 13/3/2560.
 */
@Component
public class EmailValidator {

    private Pattern pattern;

    private static final String EMAIL_PATTERN =
            "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
                    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

    public EmailValidator() {
        pattern = Pattern.compile(EMAIL_PATTERN);
    }

    public boolean validate(String email) {
        return pattern.matcher(email).matches();

    }

}

package unittest;

import com.grouptwo.zalada.billing.utils.EmailValidator;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;
/**
 * Created by supphawit on 13/3/2560.
 */
public class TestValidateEmail {

    EmailValidator emailValidator;


    String[] validEmails = {"email@domain.com",
            "firstname.lastname@domain.com",
            "email@subdomain.domain.com",
            "firstname+lastname@domain.com",
            "1234567890@domain.com",
            "email@domain-one.com",
            "_______@domain.com",
            "email@domain.name",
            "email@domain.co.jp",
            "firstname-lastname@domain.com"};


        @Before
        public void setup() {
            emailValidator = new EmailValidator();
        }

        @Test
        public void isValidEmail(){
            for(String email:validEmails){
                System.out.println(email);
                assertTrue(emailValidator.validate(email));
            }
        }

        @Test
        public void isInvalidEmail(){
            String[] inValid  = {"plainaddress",
                    "#@%^%#$@#$@#.com",
                    "@domain.com",
                    "Joe Smith <email@domain.com>",
                    "email.domain.com",
                    "email@domain@domain.com",
                    ".email@domain.com",
                    "email.@domain.com",
                    "email..email@domain.com",
                    "?????@domain.com",
                    "email@domain.com (Joe Smith)",
                    "email@domain",
                    "email@domain..com"};


            for(String s: inValid){
                assertFalse(emailValidator.validate(s));
            }

        }

}

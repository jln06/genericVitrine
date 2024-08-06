//package com.nourry.generic.vitrine.security;
//
//import org.springframework.security.config.annotation.web.builders.WebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.web.firewall.StrictHttpFirewall;
//import org.springframework.stereotype.Component;
//
//@Component
//public class firewallConfig extends WebSecurityConfigurerAdapter {
//
//    @Override
//    public void configure(WebSecurity web) throws Exception {
//        StrictHttpFirewall firewall = new StrictHttpFirewall();
//        //configure the firewall instance....
//        firewall.setAllowBackSlash(true);
//        web.httpFirewall(firewall);
//    }
//
//}

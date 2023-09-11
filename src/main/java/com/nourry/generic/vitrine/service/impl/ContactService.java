package com.nourry.generic.vitrine.service.impl;

import com.nourry.generic.vitrine.service.IContactService;
import com.nourry.generic.vitrine.service.IMailService;
import com.nourry.generic.vitrine.service.dto.ContactDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ContactService implements IContactService {

    @Autowired
    private IMailService mailService;

    @Override
    public void contacter(ContactDto contactDto) {
        mailService.sendContactMail(contactDto);
        //        String nomPrenomTelephone = contactDto.getNom() + " " + contactDto.getPrenom() + " - " + contactDto.getTelephone();
        //        mailService.sendEmail(mailUsername, nomPrenomTelephone, contactDto.getMessage(), false, false);

    }
}

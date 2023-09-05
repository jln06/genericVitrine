package com.nourry.generic.vitrine.service.impl;

import com.nourry.generic.vitrine.service.IContactService;
import com.nourry.generic.vitrine.service.IMailService;
import com.nourry.generic.vitrine.service.dto.ContactDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ContactService implements IContactService {

    @Autowired
    private IMailService mailService;

    @Override
    public void contacter(ContactDto contactDto) {
        String nomPrenomTelephone = contactDto.getNom() + " " + contactDto.getPrenom() + " - " + contactDto.getNumeroTelephone();
        mailService.sendEmail(contactDto.getEmail(), nomPrenomTelephone, contactDto.getMessage(), false, false);

        log.info("Je te contacte");
    }
}

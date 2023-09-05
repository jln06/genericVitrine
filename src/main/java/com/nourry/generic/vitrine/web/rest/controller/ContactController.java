package com.nourry.generic.vitrine.web.rest.controller;

import com.nourry.generic.vitrine.service.IContactService;
import com.nourry.generic.vitrine.service.dto.ContactDto;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public")
public class ContactController {

    private final Logger logger = LoggerFactory.getLogger(ContactController.class);

    @Autowired
    private IContactService contactService;

    @PostMapping("/contact")
    @ResponseStatus(HttpStatus.OK)
    public void contact(@Valid @RequestBody ContactDto contactDto) {
        this.contactService.contacter(contactDto);
    }
}

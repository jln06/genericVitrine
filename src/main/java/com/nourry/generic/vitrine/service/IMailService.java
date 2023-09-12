package com.nourry.generic.vitrine.service;

import com.nourry.generic.vitrine.domain.User;
import com.nourry.generic.vitrine.service.dto.ContactDto;
import java.util.Optional;
import org.springframework.scheduling.annotation.Async;

public interface IMailService {
    @Async
    void sendEmail(String to, Optional<String> replyTo, String subject, String content, boolean isMultipart, boolean isHtml);

    @Async
    void sendEmailFromTemplate(User user, String templateName, String titleKey);

    @Async
    void sendContactEmail(ContactDto contactDto, String templateName, String titleKey);

    @Async
    void sendContactMail(ContactDto contactDto);

    @Async
    void sendActivationEmail(User user);

    @Async
    void sendCreationEmail(User user);

    @Async
    void sendPasswordResetMail(User user);
}

package com.nourry.generic.vitrine.service.impl;

import com.nourry.generic.vitrine.domain.User;
import com.nourry.generic.vitrine.service.IMailService;
import com.nourry.generic.vitrine.service.dto.ContactDto;
import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.Optional;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;
import tech.jhipster.config.JHipsterProperties;

/**
 * Service for sending emails.
 * <p>
 * We use the {@link Async} annotation to send emails asynchronously.
 */
@Service
public class MailService implements IMailService {

    private final Logger log = LoggerFactory.getLogger(MailService.class);

    private static final String USER = "user";
    private static final String NOM = "nom";
    private static final String PRENOM = "prenom";
    private static final String TELEPHONE = "telephone";
    private static final String MESSAGE = "message";
    private static final String EMAIL = "email";

    private static final String BASE_URL = "baseUrl";

    @Value("${spring.mail.username}")
    private String mailUsername;

    private final JHipsterProperties jHipsterProperties;

    private final JavaMailSender javaMailSender;

    private final MessageSource messageSource;

    private final SpringTemplateEngine templateEngine;

    public MailService(
        JHipsterProperties jHipsterProperties,
        JavaMailSender javaMailSender,
        MessageSource messageSource,
        SpringTemplateEngine templateEngine
    ) {
        this.jHipsterProperties = jHipsterProperties;
        this.javaMailSender = javaMailSender;
        this.messageSource = messageSource;
        this.templateEngine = templateEngine;
    }

    @Async
    @Override
    public void sendEmail(String to, Optional<String> replyTo, String subject, String content, boolean isMultipart, boolean isHtml) {
        log.debug(
            "Send email[multipart '{}' and html '{}'] to '{}' with subject '{}' and content={}",
            isMultipart,
            isHtml,
            to,
            subject,
            content
        );

        // Prepare message using a Spring helper
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, isMultipart, StandardCharsets.UTF_8.name());
            message.setTo(to);
            message.setFrom(jHipsterProperties.getMail().getFrom());
            message.setSubject(subject);
            message.setReplyTo(replyTo.orElse(to));
            message.setText(content, isHtml);
            javaMailSender.send(mimeMessage);
            log.debug("Sent email to User '{}'", to);
        } catch (MailException | MessagingException e) {
            log.warn("Email could not be sent to user '{}'", to, e);
        }
    }

    @Override
    @Async
    public void sendEmailFromTemplate(User user, String templateName, String titleKey) {
        if (user.getEmail() == null) {
            log.debug("Email doesn't exist for user '{}'", user.getLogin());
            return;
        }
        Context context = initContextUser(user);
        String content = templateEngine.process(templateName, context);
        String subject = messageSource.getMessage(titleKey, null, context.getLocale());
        sendEmail(user.getEmail(), Optional.empty(), subject, content, false, true);
    }

    @Override
    @Async
    public void sendContactEmail(ContactDto contactDto, String templateName, String titleKey) {
        if (contactDto.getEmail() == null) {
            log.debug("Impossible d'envoyer l'email car non renseigné");
            return;
        }
        Context context = initContextForContact(contactDto);
        String content = templateEngine.process(templateName, context);
        String subject = messageSource.getMessage(titleKey, null, context.getLocale());
        sendEmail(this.mailUsername, Optional.of(contactDto.getEmail()), subject, content, false, true);
    }

    private Context initContextForContact(ContactDto contactDto) {
        Context context = new Context(Locale.FRANCE);
        context.setVariable(NOM, contactDto.getNom());
        context.setVariable(PRENOM, contactDto.getPrenom());
        context.setVariable(TELEPHONE, contactDto.getTelephone());
        context.setVariable(EMAIL, contactDto.getEmail());
        context.setVariable(MESSAGE, contactDto.getMessage());
        return context;
    }

    private Context initContextUser(User user) {
        Locale locale = Locale.forLanguageTag(user.getLangKey());
        Context context = new Context(locale);
        context.setVariable(USER, user);
        context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl());
        return context;
    }

    @Override
    @Async
    public void sendContactMail(ContactDto contactDto) {
        log.debug("Sending activation email to '{}'", contactDto.getEmail());
        sendContactEmail(contactDto, "mail/contactEmail", "contact.title");
    }

    @Override
    @Async
    public void sendActivationEmail(User user) {
        log.debug("Sending activation email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/activationEmail", "email.activation.title");
    }

    @Override
    @Async
    public void sendCreationEmail(User user) {
        log.debug("Sending creation email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/creationEmail", "email.activation.title");
    }

    @Override
    @Async
    public void sendPasswordResetMail(User user) {
        log.debug("Sending password reset email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/passwordResetEmail", "email.reset.title");
    }
}

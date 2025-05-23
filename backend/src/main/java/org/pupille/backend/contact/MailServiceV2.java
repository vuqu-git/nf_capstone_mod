package org.pupille.backend.contact;

import jakarta.mail.MessagingException;
import org.pupille.backend.contact.exceptions.EmailSendingFailedException;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailParseException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;


// This service is now solely responsible for email sending.
@Service
public class MailServiceV2 {

    private final JavaMailSender javaMailSender;

    private final String senderEmail = "no-reply@pupille.org";
    private final String recipientEmail = "quy8vuong@gmail.com";
    private final String bccRecipientEmail = "vuqu@gmx.de";


    public MailServiceV2(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    /**
     * Sends an email with the given subject and HTML body.
     * Includes robust error handling for mail sending failures.
     *
     * @param subject The subject of the email.
     * @param htmlBody The HTML content of the email.
     * @throws EmailSendingFailedException if the email could not be sent.
     */
    public void sendEmail(String subject, StringBuilder htmlBody) {
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            try {
                MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
                messageHelper.setFrom(senderEmail);
                messageHelper.setTo(recipientEmail);
                messageHelper.setBcc(bccRecipientEmail); // Always BCC, never CC the sender's email from the form
                messageHelper.setSubject(subject);
                messageHelper.setText(htmlBody.toString(), true);
            } catch (MessagingException e) {
                // This catches issues during MimeMessageHelper setup (e.g., invalid addresses in 'from', 'to', 'bcc')
                throw new EmailSendingFailedException("Failed to prepare email message. Please try again later.", e);
            }
        };

        try {
            javaMailSender.send(messagePreparator);
        } catch (MailAuthenticationException e) {
            throw new EmailSendingFailedException("Failed to send message due to authentication issues. Please contact support.", e);
        } catch (MailParseException e) {
            throw new EmailSendingFailedException("Failed to send message due to malformed email content. Please contact support.", e);
        } catch (MailSendException e) {
            // This covers network issues, SMTP server rejections, etc.
            throw new EmailSendingFailedException("Failed to send message. There might be a temporary issue with the mail server. Please try again later.", e);
        } catch (MailException e) {
            // Catch any other Spring Mail related exceptions
            throw new EmailSendingFailedException("An unexpected error occurred while sending the email. Please try again later.", e);
        } catch (Exception e) {
            // Catch any other unexpected exceptions that are not MailException subclasses
            throw new EmailSendingFailedException("An unexpected error occurred. Please try again later.", e);
        }
    }
}
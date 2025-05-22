package org.pupille.backend.contact;

import org.pupille.backend.contact.exceptions.EmailSendingFailedException;
import org.pupille.backend.contact.exceptions.InvalidContactDataException;
import org.pupille.backend.contact.exceptions.InvalidDateTimeFormatException;
import org.pupille.backend.contact.exceptions.InvalidEngagementHoursFormatException;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailParseException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.MailException; // This is the base class for all Spring Mail exceptions

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Map;

@Service
public class ContactService {

    private final JavaMailSender mailSender;
    private final String senderEmail = "no-reply@pupille.org";
    private final String recipientEmail = "quy8vuong@gmail.com";
    private final String bccRecipientEmail = "vuqu@gmx.de";

    private static final String CELL_STYLE = "padding:4px;border:1px solid #ddd;text-align:left;";
    private static final String NO_REPLY_TEXT = "<p style=\"font-size: 0.85em; color: #b00; background-color: #f5f5f5; padding: 8px; border-radius: 4px; margin-top: 10px;\">Diese Nachricht wurde automatisch erzeugt. Antworten an no-reply@pupille.org werden nicht bearbeitet.</p>" ;
    private static final String INTRO_TEXT = "<p>Nachfolgend sind die vom Kontaktformular übermittelten Daten:</p>" ;

    @Autowired
    public ContactService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void handleContact(String issue, Map<String, Object> payload) {
        switch (issue.toLowerCase()) {
            case "aob":
                handleAOBInquiry(payload);
                break;
            case "kinomitarbeit":
                handleKinomitarbeit(payload);
                break;
            case "kooperation":
                handleKooperation(payload);
                break;
            case "eigenstaendig":
                handleEigenstaendig(payload);
                break;
            case "mitkinotechnik":
                handleMitKinotechnik(payload);
                break;
            default:
                throw new IllegalArgumentException("Invalid issue type: " + issue);
        }
    }

            // utils functions
            // ~~~~~~~~~~~~~~~
            private String escapeHtml(String input) {
                if (input == null) return "";
                return input.replace("&", "&amp;")
                        .replace("<", "&lt;")
                        .replace(">", "&gt;")
                        .replace("\"", "&quot;")
                        .replace("'", "&#39;");
            }

            private String formatDateTime(String dateTimeStr) {
                if (dateTimeStr == null || dateTimeStr.isEmpty()) {
                    return null;
                }
                try {
                    LocalDateTime ldt = LocalDateTime.parse(dateTimeStr, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
                    return ldt.format(DateTimeFormatter.ofPattern("dd.MM.yyyy, HH:mm 'Uhr'"));
                } catch (DateTimeParseException e) {
                    System.err.println("Error parsing date/time string: " + dateTimeStr + "  Error: " + e.getMessage());
                    throw new InvalidDateTimeFormatException("Invalid date/time format. Please use ISO 8601 format.");
                }
            }
            // ~~~~~~~~~~~~~~~

    public void handleAOBInquiry(Map<String, Object> payload) {
        final String betreff = escapeHtml((String) payload.get("betreff"));
        final String email = escapeHtml((String) payload.get("email"));
        final String nachricht = escapeHtml((String) payload.get("nachricht"));

        if (email == null || nachricht == null || email.isEmpty() || nachricht.isEmpty()) {
            throw new InvalidContactDataException("Please fill in all fields for general inquiry.");
        }

        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            messageHelper.setFrom(senderEmail);
            messageHelper.setTo(recipientEmail);
//            messageHelper.setCc(email);
            messageHelper.setBcc(bccRecipientEmail);

            messageHelper.setSubject("[Sonstige Anfrage] " + (betreff != null ? betreff : (email != null ? email : "")));

            StringBuilder htmlBody = new StringBuilder();
            htmlBody.append(NO_REPLY_TEXT);
            htmlBody.append(INTRO_TEXT);
            htmlBody.append("<table style=\"border-collapse:collapse;width:100%;\">");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Betreff</th><td style=\"").append(CELL_STYLE).append("\">").append(betreff).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Email</th><td style=\"").append(CELL_STYLE).append("\">").append(email).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Nachricht</th><td style=\"").append(CELL_STYLE).append("\">").append(nachricht).append("</td></tr>");
            htmlBody.append("</table>");

            messageHelper.setText(htmlBody.toString(), true);
        };

//        try {
//            mailSender.send(messagePreparator);
//        } catch (Exception e) {
//            System.err.println("Error sending email: " + e.getMessage());
//            throw new EmailSendingFailedException("Failed to send message. Please try again later.", e);
//        }

        // more robust error handling:
        try {
            mailSender.send(messagePreparator);
        } catch (MailAuthenticationException e) {
            throw new EmailSendingFailedException("Failed to send message due to authentication issues.", e);
        } catch (MailParseException e) {
            throw new EmailSendingFailedException("Failed to send message due to malformed email content.", e);
        } catch (MailSendException e) {
            // This exception typically wraps lower-level JavaMail exceptions (e.g., SMTP errors)
            // You can inspect e.getFailedMessages() if you sent multiple messages
            throw new EmailSendingFailedException("Failed to send message. There might be a temporary issue with the mail server. Please try again later.", e);
        } catch (MailException e) {
            // Catch any other Spring Mail related exceptions
            throw new EmailSendingFailedException("An unexpected error occurred while sending the email. Please try again later.", e);
        } catch (Exception e) {
            // Catch any other unexpected exceptions
            throw new EmailSendingFailedException("An unexpected error occurred. Please try again later.", e);
        }

    }

    public void handleKinomitarbeit(Map<String, Object> payload) {
        final String name = escapeHtml((String) payload.get("name"));
        final String email = escapeHtml((String) payload.get("email"));
        final String nachricht = escapeHtml((String) payload.get("nachricht"));
        final String stundenEngagementStr = escapeHtml((String) payload.get("stundenEngagement"));
        double stundenEngagement = 0.0;

        if (stundenEngagementStr != null && !stundenEngagementStr.isEmpty()) {
            try {
                stundenEngagement = Double.parseDouble(stundenEngagementStr);
            } catch (NumberFormatException e) {
                System.err.println("Error parsing stundenEngagement: " + stundenEngagementStr);
                throw new InvalidEngagementHoursFormatException("Invalid value for stundenEngagement. Please enter a valid number.");
            }
        }

        final double finalStundenEngagement = stundenEngagement; // Make it effectively final

        if (name == null || email == null || nachricht == null || name.isEmpty() || email.isEmpty() || nachricht.isEmpty()) {
            throw new InvalidContactDataException("Please fill in all required fields for Kinomitarbeit.");
        }

        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            messageHelper.setFrom(senderEmail);
            messageHelper.setTo(recipientEmail);
//            messageHelper.setCc(email);
            messageHelper.setBcc(bccRecipientEmail);
            
            messageHelper.setSubject("[Kinomitarbeit: Anfrage] " + name);

            StringBuilder htmlBody = new StringBuilder();
            htmlBody.append(NO_REPLY_TEXT);
            htmlBody.append(INTRO_TEXT);
            htmlBody.append("<table style=\"border-collapse:collapse;width:100%;\">")
                    .append("<tr><th style=\"").append(CELL_STYLE).append("\">Name</th><td style=\"").append(CELL_STYLE).append("\">").append(name).append("</td></tr>")
                    .append("<tr><th style=\"").append(CELL_STYLE).append("\">Email</th><td style=\"").append(CELL_STYLE).append("\">").append(email).append("</td></tr>")
                    .append("<tr><th style=\"").append(CELL_STYLE).append("\">Nachricht</th><td style=\"").append(CELL_STYLE).append("\">").append(nachricht).append("</td></tr>")
                    .append("<tr><th style=\"").append(CELL_STYLE).append("\">Geschätztes Engagement (Std./Monat)</th><td style=\"").append(CELL_STYLE).append("\">").append(String.format("%.1f", finalStundenEngagement)).append("</td></tr>")
                    .append("</table>");
            messageHelper.setText(htmlBody.toString(), true);
        };

        try {
            mailSender.send(messagePreparator);
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
            throw new EmailSendingFailedException("Error sending email.", e);
        }
    }

    public void handleEigenstaendig(Map<String, Object> payload) {
        final String betreff = escapeHtml((String) payload.get("betreff"));
        final String ansprechperson = escapeHtml((String) payload.get("ansprechperson"));
        final String email = escapeHtml((String) payload.get("email"));
        final String veranstaltungsbeginnStr = escapeHtml((String) payload.get("veranstaltungsbeginn"));
        final String veranstaltungsendeStr = escapeHtml((String) payload.get("veranstaltungsende"));

        if (betreff == null || ansprechperson == null || email == null || veranstaltungsbeginnStr == null || veranstaltungsendeStr == null ||
                betreff.isEmpty() || ansprechperson.isEmpty() || email.isEmpty() || veranstaltungsbeginnStr.isEmpty() || veranstaltungsendeStr.isEmpty()) {
            throw new InvalidContactDataException("Please fill in all required fields for Eigenständig.");
        }

        final String formattedVeranstaltungsbeginn = formatDateTime(veranstaltungsbeginnStr);
        final String formattedVeranstaltungsende = formatDateTime(veranstaltungsendeStr);


        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            messageHelper.setFrom(senderEmail);
            messageHelper.setTo(recipientEmail);
//            messageHelper.setCc(email);
            messageHelper.setBcc(bccRecipientEmail);

            messageHelper.setSubject("[Eigenständige Nutzung Festsaal/Leinwand] " + betreff);

            StringBuilder htmlBody = new StringBuilder();
            htmlBody.append(NO_REPLY_TEXT);
            htmlBody.append(INTRO_TEXT);
            htmlBody.append("<table style=\"border-collapse:collapse;width:100%;\">");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Betreff</th><td style=\"").append(CELL_STYLE).append("\">").append(betreff).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Ansprechperson</th><td style=\"").append(CELL_STYLE).append("\">").append(ansprechperson).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Email</th><td style=\"").append(CELL_STYLE).append("\">").append(email).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Veranstaltungsbeginn</th><td style=\"").append(CELL_STYLE).append("\">").append(formattedVeranstaltungsbeginn).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Veranstaltungsende</th><td style=\"").append(CELL_STYLE).append("\">").append(formattedVeranstaltungsende).append("</td></tr>");
            htmlBody.append("</table>");

            messageHelper.setText(htmlBody.toString(), true);
        };

        try {
            mailSender.send(messagePreparator);
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
            throw new EmailSendingFailedException("Failed to send message. Please try again later.", e);
        }
    }

    public void handleMitKinotechnik(Map<String, Object> payload) {
        final String betreff = escapeHtml((String) payload.get("betreff"));
        final String ansprechperson = escapeHtml((String) payload.get("ansprechperson"));
        final String email = escapeHtml((String) payload.get("email"));
        final String telefon = escapeHtml((String) payload.get("telefon"));
        final String nachricht = escapeHtml((String) payload.get("nachricht"));
        final String projektionsinhalt = escapeHtml((String) payload.get("projektionsinhalt"));
        final String verleih = escapeHtml((String) payload.get("verleih"));
        final String format = escapeHtml((String) payload.get("format"));

        final int anzMikrofone;
        Object anzMikrofoneObj = payload.get("anzMikrofone");

        if (anzMikrofoneObj instanceof Number) {
            anzMikrofone = ((Number) anzMikrofoneObj).intValue();
        } else if (anzMikrofoneObj instanceof String) {
            try {
                anzMikrofone = Integer.parseInt((String) anzMikrofoneObj);
            } catch (NumberFormatException e) {
                throw new InvalidContactDataException("Invalid value for 'anzMikrofone'.");
            }
        } else {
            anzMikrofone = 0;
        }
        final int finalAnzMikrofone = anzMikrofone;


        final String veranstaltungsbeginnStr = escapeHtml((String) payload.get("veranstaltungsbeginn"));
        final String veranstaltungsendeStr = escapeHtml((String) payload.get("veranstaltungsende"));
        final Boolean istGemietetBeiAstaObj = (Boolean) payload.get("istGemietetBeiAsta");
        final boolean istGemietetBeiAsta = istGemietetBeiAstaObj != null ? istGemietetBeiAstaObj : false;
        final Boolean wurdeGelesenHinweisEventlocationObj = (Boolean) payload.get("wurdeGelesenHinweisEventlocation");
        final boolean wurdeGelesenHinweisEventlocation = wurdeGelesenHinweisEventlocationObj != null ? wurdeGelesenHinweisEventlocationObj : false;


        if (betreff == null || ansprechperson == null || email == null || nachricht == null || projektionsinhalt == null || format == null || veranstaltungsbeginnStr == null || veranstaltungsendeStr == null ||
                betreff.isEmpty() || ansprechperson.isEmpty() || email.isEmpty() || nachricht.isEmpty() || projektionsinhalt.isEmpty() || format.isEmpty() || veranstaltungsbeginnStr.isEmpty() || veranstaltungsendeStr.isEmpty()) {
            throw new InvalidContactDataException("Please fill in all required fields.");
        }

        final String formattedVeranstaltungsbeginn = formatDateTime(veranstaltungsbeginnStr);
        final String formattedVeranstaltungsende = formatDateTime(veranstaltungsendeStr);

        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            messageHelper.setFrom(senderEmail);
            messageHelper.setTo(recipientEmail);
//            messageHelper.setCc(email);
            messageHelper.setBcc(bccRecipientEmail);

            messageHelper.setSubject("[Kinotechnik: Anfrage] " + betreff);

            StringBuilder htmlBody = new StringBuilder();
            htmlBody.append(NO_REPLY_TEXT);
            htmlBody.append(INTRO_TEXT);
            htmlBody.append("<table style=\"border-collapse:collapse;width:100%;\">");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Betreff</th><td style=\"").append(CELL_STYLE).append("\">").append(betreff).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Ansprechperson</th><td style=\"").append(CELL_STYLE).append("\">").append(ansprechperson).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Email</th><td style=\"").append(CELL_STYLE).append("\">").append(email).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Telefon</th><td style=\"").append(CELL_STYLE).append("\">").append(telefon).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Nachricht</th><td style=\"").append(CELL_STYLE).append("\">").append(nachricht).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Projektionsinhalt</th><td style=\"").append(CELL_STYLE).append("\">").append(projektionsinhalt).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Verleiher/Rechteinhaber</th><td style=\"").append(CELL_STYLE).append("\">").append(verleih).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Abspielformat</th><td style=\"").append(CELL_STYLE).append("\">").append(format).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Anzahl benötigter Mikrofone</th><td style=\"").append(CELL_STYLE).append("\">").append(finalAnzMikrofone).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Veranstaltungsbeginn</th><td style=\"").append(CELL_STYLE).append("\">").append(formattedVeranstaltungsbeginn).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Veranstaltungsende</th><td style=\"").append(CELL_STYLE).append("\">").append(formattedVeranstaltungsende).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Festsaal bereits beim AStA gemietet</th><td style=\"").append(CELL_STYLE).append("\">").append(istGemietetBeiAsta ? "Ja" : "Nein").append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Hinweis zum Veranstaltungsort bei Werbung gelesen</th><td style=\"").append(CELL_STYLE).append("\">").append(wurdeGelesenHinweisEventlocation ? "Ja" : "Nein").append("</td></tr>");
            htmlBody.append("</table>");

            messageHelper.setText(htmlBody.toString(), true);
        };

        try {
            mailSender.send(messagePreparator);
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
            throw new EmailSendingFailedException("Failed to send message. Please try again later.", e);
        }
    }

    public void handleKooperation(Map<String, Object> payload) {
        final String betreff = escapeHtml((String) payload.get("betreff"));
        final String ansprechperson = escapeHtml((String) payload.get("ansprechperson"));
        final String email = escapeHtml((String) payload.get("email"));
        final String telefon = escapeHtml((String) payload.get("telefon"));
        final String filmtitel = escapeHtml((String) payload.get("filmtitel"));
        final String verleih = escapeHtml((String) payload.get("verleih"));
        final String format = escapeHtml((String) payload.get("format"));
        final String terminpraeferenz = escapeHtml((String) payload.get("terminpraeferenz"));
        final String nachricht = escapeHtml((String) payload.get("nachricht"));
        final String zusammenarbeit = escapeHtml((String) payload.get("zusammenarbeit"));

        if (betreff == null || ansprechperson == null || email == null || filmtitel == null || verleih == null || format == null || terminpraeferenz == null || nachricht == null || zusammenarbeit == null ||
                betreff.isEmpty() || ansprechperson.isEmpty() || email.isEmpty() || filmtitel.isEmpty() || verleih.isEmpty() || format.isEmpty() || terminpraeferenz.isEmpty() || nachricht.isEmpty() || zusammenarbeit.isEmpty()) {
            throw new InvalidContactDataException("Please fill in all required fields for Kooperation.");
        }

        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            messageHelper.setFrom(senderEmail);
            messageHelper.setTo(recipientEmail);
//            messageHelper.setCc(email);
            messageHelper.setBcc(bccRecipientEmail);

            messageHelper.setSubject("[Kooperationsanfrage] " + betreff);

            StringBuilder htmlBody = new StringBuilder();
            htmlBody.append(NO_REPLY_TEXT);
            htmlBody.append(INTRO_TEXT);
            htmlBody.append("<table style=\"border-collapse:collapse;width:100%;\">");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Betreff</th><td style=\"").append(CELL_STYLE).append("\">").append(betreff).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Ansprechperson</th><td style=\"").append(CELL_STYLE).append("\">").append(ansprechperson).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Email</th><td style=\"").append(CELL_STYLE).append("\">").append(email).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Telefon</th><td style=\"").append(CELL_STYLE).append("\">").append(telefon).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Filmtitel</th><td style=\"").append(CELL_STYLE).append("\">").append(filmtitel).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Verleih/Rechteinhaber</th><td style=\"").append(CELL_STYLE).append("\">").append(verleih).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Abspielformat</th><td style=\"").append(CELL_STYLE).append("\">").append(format).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Terminpräferenzen</th><td style=\"").append(CELL_STYLE).append("\">").append(terminpraeferenz).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Nachricht</th><td style=\"").append(CELL_STYLE).append("\">").append(nachricht).append("</td></tr>");
            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Vorstellungen zur Zusammenarbeit</th><td style=\"").append(CELL_STYLE).append("\">").append(zusammenarbeit).append("</td></tr>");
            htmlBody.append("</table>");

            messageHelper.setText(htmlBody.toString(), true);
        };

        try {
            mailSender.send(messagePreparator);
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
            throw new EmailSendingFailedException("Failed to send message. Please try again later.", e);
        }
    }
}

//Vorbereitung von XXX in Pupille
//
//Hallo,
//
//in der Pupille läuft in 10 Tagen die Vorstellung XXX um XX Uhr für die du die Patenschaft inne hast :)
//
//Dies ist ein automatischer Reminder für folgende vorbereitenden Aufgaben:
//
//Liegt eine Terminbestätigung vor?
//        Achte darauf, dass der Kopienversand. bzw. Download rechtzeitig initiiert wird!
//Sind genügend Personen im Dienstplan eingetragen?
//
//
//
//
//Nachbereitung von XXX in Pupille
//
//Hallo,
//
//es sind nun 5 Tage seit der Pupille-Vorstellung von XX.
//
//Hier ist ein automatischer Reminder für folgende Erledigungen im Nachgang:
//
//Spielfilmabrechnung
//Rückversand der Kopie (wenn ein physischer Datenträger vorliegt)
//Einzahlung der Einnahmen
//Löschung der Filmdateien auf PC und Server


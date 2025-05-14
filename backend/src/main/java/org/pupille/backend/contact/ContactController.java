//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessagePreparator;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;
//import java.time.format.DateTimeParseException;
//import java.util.Map;
//
//
//import org.springframework.mail.javamail.MimeMessageHelper;
//
//
//@RestController
//public class ContactController {
//
//    @Autowired
//    private JavaMailSender mailSender;
//
//    private final String recipientEmail = "quy8vuong@gmail.com"; // Default recipient
//
//    @PostMapping("/api/contact/{issue}")
//    public ResponseEntity<?> handleContactForm(
//            @PathVariable String issue,
//            @RequestBody Map<String, Object> payload) {
//
//        switch (issue.toLowerCase()) {
//            case "aob":
//                return handleAOBInquiry(payload);
//            case "kinomitarbeit":
//                return handleKinomitarbeit(payload);
//            case "kooperation":
//                return handleKooperation(payload);
//            case "eigenstaendig":
//                return handleEigenstaendig(payload);
//            case "mitkinotechnik":
//                return handleMitKinotechnik(payload);
//            default:
//                return new ResponseEntity<>("{\"message\": \"Invalid issue type.\"}", HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    // Utility to escape HTML special characters
//    private String escapeHtml(String input) {
//        if (input == null) return "";
//        return input.replace("&", "&amp;")
//                .replace("<", "&lt;")
//                .replace(">", "&gt;")
//                .replace("\"", "&quot;")
//                .replace("'", "&#39;");
//    }
//
//    // Utility to format DateTime string
//    private String formatDateTime(String dateTimeStr) {
//        if (dateTimeStr == null || dateTimeStr.isEmpty()) {
//            return null;
//        }
//        try {
//            LocalDateTime ldt = LocalDateTime.parse(dateTimeStr, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
//            return ldt.format(DateTimeFormatter.ofPattern("dd.MM.yyyy, HH:mm 'Uhr'"));
//        } catch (DateTimeParseException e) {
//            System.err.println("Error parsing date/time string: " + dateTimeStr + "  Error: " + e.getMessage());
//            return null;
//        }
//    }
//
//    // csll style formatting
//    private static final String CELL_STYLE = "padding:4px;border:1px solid #ddd;text-align:left;";
//
//    //    ######################################   ######################################
//
//    private ResponseEntity<?> handleAOBInquiry(Map<String, Object> payload) {
//        String betreff = escapeHtml((String) payload.get("betreff"));
//        String email = escapeHtml((String) payload.get("email"));
//        String nachricht = escapeHtml((String) payload.get("nachricht"));
//
//        if (email == null || nachricht == null || email.isEmpty() || nachricht.isEmpty()) {
//            return new ResponseEntity<>("{\"message\": \"Please fill in all fields for general inquiry.\"}", HttpStatus.BAD_REQUEST);
//        }
//
//        MimeMessagePreparator messagePreparator = mimeMessage -> {
//            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
//            messageHelper.setTo(recipientEmail);
//            messageHelper.setSubject("[Sonstige Anfrage] " + (betreff != null ? betreff : (email != null ? email : "") ));
//
//            StringBuilder htmlBody = new StringBuilder();
//            htmlBody.append("<table style=\"border-collapse:collapse;width:100%;\">");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Betreff</th><td style=\"").append(CELL_STYLE).append("\">").append(betreff).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Email</th><td style=\"").append(CELL_STYLE).append("\">").append(email).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Nachricht</th><td style=\"").append(CELL_STYLE).append("\">").append(nachricht).append("</td></tr>");
//            htmlBody.append("</table>");
//
//            messageHelper.setText(htmlBody.toString(), true);
//        };
//
//        try {
//            mailSender.send(messagePreparator);
//            return new ResponseEntity<>("{\"message\": \"Message sent successfully!\"}", HttpStatus.OK);
//        } catch (Exception e) {
//            System.err.println("Error sending email: " + e.getMessage());
//            return new ResponseEntity<>("{\"message\": \"Failed to send message. Please try again later.\"}", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    public ResponseEntity<?> handleKinomitarbeit(Map<String, Object> payload) {
//        String name = escapeHtml( (String) payload.get("name") );
//        String email = escapeHtml( (String) payload.get("email") );
//        String nachricht = escapeHtml( (String) payload.get("nachricht") );
//        String stundenEngagementStr = escapeHtml( (String) payload.get("stundenEngagement") );
//        final double stundenEngagement; // Declare as final, required for usage later variable used in lambda expression should be final or effectively final
//
//        if (stundenEngagementStr != null && !stundenEngagementStr.isEmpty()) {
//            try {
//                stundenEngagement = Double.parseDouble(stundenEngagementStr);
//            } catch (NumberFormatException e) {
//                System.err.println("Error parsing stundenEngagement: " + stundenEngagementStr);
//                return new ResponseEntity<>("{\"message\": \"Invalid value for stundenEngagement. Please enter a valid number.\"}", HttpStatus.BAD_REQUEST);
//            }
//        } else {
//            stundenEngagement = 0.0; // Default value
//        }
//
//        if (name == null || email == null || nachricht == null || name.isEmpty() || email.isEmpty() || nachricht.isEmpty()) {
//            return new ResponseEntity<>("{\"message\": \"Please fill in all required fields for Kinomitarbeit.\"}", HttpStatus.BAD_REQUEST);
//        }
//
//        MimeMessagePreparator messagePreparator = mimeMessage -> {
//            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
//            messageHelper.setTo(recipientEmail);
//            messageHelper.setSubject("[Kinomitarbeit: Anfrage] " + name);
//
//            StringBuilder htmlContent = new StringBuilder();
//            htmlContent.append("<table style=\"border-collapse:collapse;width:100%;\">")
//                    .append("<tr><th style=\"").append(CELL_STYLE).append("\">Name</th><td style=\"").append(CELL_STYLE).append("\">").append(name).append("</td></tr>")
//                    .append("<tr><th style=\"").append(CELL_STYLE).append("\">Email</th><td style=\"").append(CELL_STYLE).append("\">").append(email).append("</td></tr>")
//                    .append("<tr><th style=\"").append(CELL_STYLE).append("\">Nachricht</th><td style=\"").append(CELL_STYLE).append("\">").append(nachricht).append("</td></tr>")
//                    .append("<tr><th style=\"").append(CELL_STYLE).append("\">Geschätztes Engagement (Std./Monat)</th><td style=\"").append(CELL_STYLE).append("\">").append(String.format("%.1f", stundenEngagement)).append("</td></tr>")
//                    .append("</table>");
//
//            messageHelper.setText(htmlContent.toString(), true); // Set the second argument to true for HTML
//        };
//
//        try {
//            mailSender.send(messagePreparator);
//            return new ResponseEntity<>(HttpStatus.OK);
//        } catch (Exception e) {
//            System.err.println("Error sending email: " + e.getMessage());
//            return new ResponseEntity<>("{\"message\": \"Error sending email.\"}", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    private ResponseEntity<?> handleEigenstaendig(Map<String, Object> payload) {
//        String betreff = escapeHtml((String) payload.get("betreff"));
//        String ansprechperson = escapeHtml((String) payload.get("ansprechperson"));
//        String email = escapeHtml((String) payload.get("email"));
//        String veranstaltungsbeginnStr = escapeHtml((String) payload.get("veranstaltungsbeginn"));
//        String veranstaltungsendeStr = escapeHtml((String) payload.get("veranstaltungsende"));
//
//        if (betreff == null || ansprechperson == null || email == null || veranstaltungsbeginnStr == null || veranstaltungsendeStr == null ||
//                betreff.isEmpty() || ansprechperson.isEmpty() || email.isEmpty() || veranstaltungsbeginnStr.isEmpty() || veranstaltungsendeStr.isEmpty()) {
//            return new ResponseEntity<>("{\"message\": \"Please fill in all required fields for Eigenständig.\"}", HttpStatus.BAD_REQUEST);
//        }
//
//        String formattedVeranstaltungsbeginn = formatDateTime(veranstaltungsbeginnStr);
//        String formattedVeranstaltungsende = formatDateTime(veranstaltungsendeStr);
//
//        if (formattedVeranstaltungsbeginn == null || formattedVeranstaltungsende == null) {
//            return new ResponseEntity<>("{\"message\": \"Invalid date/time format. Please use ISO 8601 format.\"}", HttpStatus.BAD_REQUEST);
//        }
//
//        MimeMessagePreparator messagePreparator = mimeMessage -> {
//            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
//            messageHelper.setTo(recipientEmail);
//            messageHelper.setSubject("[Eigenständige Nutzung Festsaal/Leinwand] " + betreff);
//
//            StringBuilder htmlBody = new StringBuilder();
//            htmlBody.append("<table style=\"border-collapse:collapse;width:100%;\">");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Betreff</th><td style=\"").append(CELL_STYLE).append("\">").append(betreff).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Ansprechperson</th><td style=\"").append(CELL_STYLE).append("\">").append(ansprechperson).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Email</th><td style=\"").append(CELL_STYLE).append("\">").append(email).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Veranstaltungsbeginn</th><td style=\"").append(CELL_STYLE).append("\">").append(formattedVeranstaltungsbeginn).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Veranstaltungsende</th><td style=\"").append(CELL_STYLE).append("\">").append(formattedVeranstaltungsende).append("</td></tr>");
//            htmlBody.append("</table>");
//
//            messageHelper.setText(htmlBody.toString(), true);
//        };
//
//        try {
//            mailSender.send(messagePreparator);
//            return new ResponseEntity<>("{\"message\": \"Message sent successfully!\"}", HttpStatus.OK);
//        } catch (Exception e) {
//            System.err.println("Error sending email: " + e.getMessage());
//            return new ResponseEntity<>("{\"message\": \"Failed to send message. Please try again later.\"}", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    private ResponseEntity<?> handleMitKinotechnik(Map<String, Object> payload) {
//        String betreff = escapeHtml((String) payload.get("betreff"));
//        String ansprechperson = escapeHtml((String) payload.get("ansprechperson"));
//        String email = escapeHtml((String) payload.get("email"));
//        String telefon = escapeHtml((String) payload.get("telefon"));
//        String nachricht = escapeHtml((String) payload.get("nachricht"));
//        String projektionsinhalt = escapeHtml((String) payload.get("projektionsinhalt"));
//        String verleih = escapeHtml((String) payload.get("verleih"));
//        String format = escapeHtml((String) payload.get("format"));
//
//        final int anzMikrofone; // Declare as final
//        Object anzMikrofoneObj = payload.get("anzMikrofone");
//
//        if (anzMikrofoneObj instanceof Number) {
//            anzMikrofone = ((Number) anzMikrofoneObj).intValue();
//        } else if (anzMikrofoneObj instanceof String) {
//            try {
//                anzMikrofone = Integer.parseInt((String) anzMikrofoneObj);
//            } catch (NumberFormatException e) {
//                return new ResponseEntity<>("{\"message\": \"Invalid value for 'anzMikrofone'.\"}", HttpStatus.BAD_REQUEST);
//            }
//        } else {
//            anzMikrofone = 0; // Default if null/unexpected type
//        }
//
//        String veranstaltungsbeginnStr = escapeHtml((String) payload.get("veranstaltungsbeginn"));
//        String veranstaltungsendeStr = escapeHtml((String) payload.get("veranstaltungsende"));
//        Boolean istGemietetBeiAstaObj = (Boolean) payload.get("istGemietetBeiAsta");
//        boolean istGemietetBeiAsta = istGemietetBeiAstaObj != null ? istGemietetBeiAstaObj : false;
//        Boolean wurdeGelesenHinweisEventlocationObj = (Boolean) payload.get("wurdeGelesenHinweisEventlocation");
//        boolean wurdeGelesenHinweisEventlocation = wurdeGelesenHinweisEventlocationObj != null ? wurdeGelesenHinweisEventlocationObj : false;
//
//        if (betreff == null || ansprechperson == null || email == null || nachricht == null || projektionsinhalt == null || format == null || veranstaltungsbeginnStr == null || veranstaltungsendeStr == null ||
//                betreff.isEmpty() || ansprechperson.isEmpty() || email.isEmpty() || nachricht.isEmpty() || projektionsinhalt.isEmpty() || format.isEmpty() || veranstaltungsbeginnStr.isEmpty() || veranstaltungsendeStr.isEmpty()) {
//            return new ResponseEntity<>("{\"message\": \"Please fill in all required fields.\"}", HttpStatus.BAD_REQUEST);
//        }
//
//        String formattedVeranstaltungsbeginn = formatDateTime(veranstaltungsbeginnStr);
//        String formattedVeranstaltungsende = formatDateTime(veranstaltungsendeStr);
//
//        if (formattedVeranstaltungsbeginn == null || formattedVeranstaltungsende == null) {
//            return new ResponseEntity<>("{\"message\": \"Invalid date/time format. Please use ISO 8601 format.\"}", HttpStatus.BAD_REQUEST);
//        }
//
//        MimeMessagePreparator messagePreparator = mimeMessage -> {
//            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
//            messageHelper.setTo(recipientEmail);
//            messageHelper.setSubject("[Kinotechnik: Anfrage] " + betreff);
//
//            StringBuilder htmlBody = new StringBuilder();
//            htmlBody.append("<table style=\"border-collapse:collapse;width:100%;\">");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Betreff</th><td style=\"").append(CELL_STYLE).append("\">").append(betreff).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Ansprechperson</th><td style=\"").append(CELL_STYLE).append("\">").append(ansprechperson).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Email</th><td style=\"").append(CELL_STYLE).append("\">").append(email).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Telefon</th><td style=\"").append(CELL_STYLE).append("\">").append(telefon).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Nachricht</th><td style=\"").append(CELL_STYLE).append("\">").append(nachricht).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Projektionsinhalt</th><td style=\"").append(CELL_STYLE).append("\">").append(projektionsinhalt).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Verleiher/Rechteinhaber</th><td style=\"").append(CELL_STYLE).append("\">").append(verleih).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Abspielformat</th><td style=\"").append(CELL_STYLE).append("\">").append(format).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Anzahl benötigter Mikrofone</th><td style=\"").append(CELL_STYLE).append("\">").append(anzMikrofone).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Veranstaltungsbeginn</th><td style=\"").append(CELL_STYLE).append("\">").append(formattedVeranstaltungsbeginn).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Veranstaltungsende</th><td style=\"").append(CELL_STYLE).append("\">").append(formattedVeranstaltungsende).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Festsaal bereits beim AStA gemietet</th><td style=\"").append(CELL_STYLE).append("\">").append(istGemietetBeiAsta ? "Ja" : "Nein").append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Hinweis zum Veranstaltungsort bei Werbung gelesen</th><td style=\"").append(CELL_STYLE).append("\">").append(wurdeGelesenHinweisEventlocation ? "Ja" : "Nein").append("</td></tr>");
//            htmlBody.append("</table>");
//
//            messageHelper.setText(htmlBody.toString(), true);
//        };
//
//        try {
//            mailSender.send(messagePreparator);
//            return new ResponseEntity<>("{\"message\": \"Message sent successfully!\"}", HttpStatus.OK);
//        } catch (Exception e) {
//            System.err.println("Error sending email: " + e.getMessage());
//            return new ResponseEntity<>("{\"message\": \"Failed to send message. Please try again later.\"}", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    private ResponseEntity<?> handleKooperation(Map<String, Object> payload) {
//        String betreff = escapeHtml((String) payload.get("betreff"));
//        String ansprechperson = escapeHtml((String) payload.get("ansprechperson"));
//        String email = escapeHtml((String) payload.get("email"));
//        String telefon = escapeHtml((String) payload.get("telefon"));
//        String filmtitel = escapeHtml((String) payload.get("filmtitel"));
//        String verleih = escapeHtml((String) payload.get("verleih"));
//        String format = escapeHtml((String) payload.get("format"));
//        String terminpraeferenz = escapeHtml((String) payload.get("terminpraeferenz"));
//        String nachricht = escapeHtml((String) payload.get("nachricht"));
//        String zusammenarbeit = escapeHtml((String) payload.get("zusammenarbeit"));
//
//        if (betreff == null || ansprechperson == null || email == null || filmtitel == null || verleih == null || format == null || terminpraeferenz == null || nachricht == null || zusammenarbeit == null ||
//                betreff.isEmpty() || ansprechperson.isEmpty() || email.isEmpty() || filmtitel.isEmpty() || verleih.isEmpty() || format.isEmpty() || terminpraeferenz.isEmpty() || nachricht.isEmpty() || zusammenarbeit.isEmpty()) {
//            return new ResponseEntity<>("{\"message\": \"Please fill in all required fields for Kooperation.\"}", HttpStatus.BAD_REQUEST);
//        }
//
//        MimeMessagePreparator messagePreparator = mimeMessage -> {
//            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
//            messageHelper.setTo(recipientEmail);
//            messageHelper.setSubject("[Kooperationsanfrage] " + betreff);
//
//            StringBuilder htmlBody = new StringBuilder();
//            htmlBody.append("<table style=\"border-collapse:collapse;width:100%;\">");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Betreff</th><td style=\"").append(CELL_STYLE).append("\">").append(betreff).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Ansprechperson</th><td style=\"").append(CELL_STYLE).append("\">").append(ansprechperson).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Email</th><td style=\"").append(CELL_STYLE).append("\">").append(email).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Telefon</th><td style=\"").append(CELL_STYLE).append("\">").append(telefon).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Filmtitel</th><td style=\"").append(CELL_STYLE).append("\">").append(filmtitel).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Verleih/Rechteinhaber</th><td style=\"").append(CELL_STYLE).append("\">").append(verleih).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Abspielformat</th><td style=\"").append(CELL_STYLE).append("\">").append(format).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Terminpräferenzen</th><td style=\"").append(CELL_STYLE).append("\">").append(terminpraeferenz).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Nachricht</th><td style=\"").append(CELL_STYLE).append("\">").append(nachricht).append("</td></tr>");
//            htmlBody.append("<tr><th style=\"").append(CELL_STYLE).append("\">Vorstellungen zur Zusammenarbeit</th><td style=\"").append(CELL_STYLE).append("\">").append(zusammenarbeit).append("</td></tr>");
//            htmlBody.append("</table>");
//
//            messageHelper.setText(htmlBody.toString(), true);
//        };
//
//        try {
//            mailSender.send(messagePreparator);
//            return new ResponseEntity<>("{\"message\": \"Message sent successfully!\"}", HttpStatus.OK);
//        } catch (Exception e) {
//            System.err.println("Error sending email: " + e.getMessage());
//            return new ResponseEntity<>("{\"message\": \"Failed to send message. Please try again later.\"}", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//}


//package org.pupille.backend.contact;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.Map;
//
//@RestController
//public class ContactController {
//
//    private final ContactService contactService;
//
//    @Autowired
//    public ContactController(ContactService contactService) {
//        this.contactService = contactService;
//    }
//
//    @PostMapping("/api/contact/{issue}")
//    public ResponseEntity<?> handleContactForm(
//            @PathVariable String issue,
//            @RequestBody Map<String, Object> payload) {
//        return contactService.handleContact(issue, payload);
//    }
//}

package org.pupille.backend.contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class ContactController {

    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/api/contact/{issue}")
    public ResponseEntity<?> handleContactForm(
            @PathVariable String issue,
            @RequestBody Map<String, Object> payload) {
        contactService.handleContact(issue, payload);
        return new ResponseEntity<>("{\"message\": \"Message sent successfully!\"}", HttpStatus.OK);
    }
}


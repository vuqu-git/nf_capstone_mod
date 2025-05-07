package org.pupille.backend.contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Map;

@RestController
public class ContactController {

    @Autowired
    private JavaMailSender mailSender;

    private final String recipientEmail = "quy8vuong@gmail.com"; // Default recipient

    @PostMapping("/api/contact/{issue}")
    public ResponseEntity<?> handleContactForm(
            @PathVariable String issue,
            @RequestBody Map<String, Object> payload) {

        switch (issue.toLowerCase()) {
            case "aob":
                return handleAOBInquiry(payload);
//            case "support":
//                return handleSupportRequest(payload);
//            case "sales":
//                return handleSalesInquiry(payload);
            case "kinomitarbeit":
                return handleKinomitarbeit(payload);
            case "kooperation":
                return handleKooperation(payload);
            case "eigenstaendig":
                return handleEigenstaendig(payload);
            case "mitkinotechnik":
                return handleMitKinotechnik(payload);
            default:
                return new ResponseEntity<>("{\"message\": \"Invalid issue type.\"}", HttpStatus.BAD_REQUEST);
        }
    }

    private ResponseEntity<?> handleAOBInquiry(Map<String, Object> payload) {
        String subject = (String) payload.get("subject");
        String name = (String) payload.get("name");
        String email = (String) payload.get("email");
        String message = (String) payload.get("message");

        if (email == null || message == null || email.isEmpty() || message.isEmpty()) {
            return new ResponseEntity<>("{\"message\": \"Please fill in all fields for general inquiry.\"}", HttpStatus.BAD_REQUEST);
        }

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(recipientEmail); // Can have specific recipient for general inquiries
        mailMessage.setSubject("[Sonstige Anfrage] " + (subject != null ? subject : ""));
        mailMessage.setText(String.format("**Name**: %s\n**Email**: %s\n\n**Nachricht**:\n%s", name, email, message));

        return sendEmail(mailMessage);
    }

//    private ResponseEntity<?> handleSupportRequest(Map<String, Object> payload) {
//        String ticketId = (String) payload.get("ticketId");
//        String name = (String) payload.get("name");
//        String email = (String) payload.get("email");
//        String issueDetails = (String) payload.get("issueDetails");
//
//        if (ticketId == null || name == null || email == null || issueDetails == null || ticketId.isEmpty() || name.isEmpty() || email.isEmpty() || issueDetails.isEmpty()) {
//            return new ResponseEntity<>("{\"message\": \"Please fill in all fields for support request.\"}", HttpStatus.BAD_REQUEST);
//        }
//
//        SimpleMailMessage mailMessage = new SimpleMailMessage();
//        mailMessage.setTo("support@" + extractDomain(recipientEmail)); // Specific support email
//        mailMessage.setSubject("[Support Request] Ticket ID: " + ticketId);
//        mailMessage.setText(String.format("Name: %s\nEmail: %s\nTicket ID: %s\n\nIssue Details:\n%s", name, email, ticketId, issueDetails));
//
//        return sendEmail(mailMessage);
//    }
//
//    private ResponseEntity<?> handleSalesInquiry(Map<String, Object> payload) {
//        String company = (String) payload.get("company");
//        String name = (String) payload.get("name");
//        String email = (String) payload.get("email");
//        String interest = (String) payload.get("interest");
//
//        if (company == null || name == null || email == null || interest == null || company.isEmpty() || name.isEmpty() || email.isEmpty() || interest.isEmpty()) {
//            return new ResponseEntity<>("{\"message\": \"Please fill in all fields for sales inquiry.\"}", HttpStatus.BAD_REQUEST);
//        }
//
//        SimpleMailMessage mailMessage = new SimpleMailMessage();
//        mailMessage.setTo("sales@" + extractDomain(recipientEmail)); // Specific sales email
//        mailMessage.setSubject("[Sales Inquiry] From: " + company);
//        mailMessage.setText(String.format("Company: %s\nName: %s\nEmail: %s\n\nInterest:\n%s", company, name, email, interest));
//
//        return sendEmail(mailMessage);
//    }

    private ResponseEntity<?> handleKinomitarbeit(Map<String, Object> payload) {
        String name = (String) payload.get("name");
        String email = (String) payload.get("email");
        String message = (String) payload.get("message");
        String stundenEngagementStr = (String) payload.get("stundenEngagement");
        double stundenEngagement = 0.0; // Default value

        if (stundenEngagementStr != null && !stundenEngagementStr.isEmpty()) {
            try {
                stundenEngagement = Double.parseDouble(stundenEngagementStr);
            } catch (NumberFormatException e) {
                System.err.println("Error parsing stundenEngagement: " + stundenEngagementStr);
                return new ResponseEntity<>("{\"message\": \"Invalid value for stundenEngagement. Please enter a valid number.\"}", HttpStatus.BAD_REQUEST);
            }
        }

        if (name == null || email == null || message == null || name.isEmpty() || email.isEmpty() || message.isEmpty()) {
            return new ResponseEntity<>("{\"message\": \"Please fill in all required fields for Kinomitarbeit.\"}", HttpStatus.BAD_REQUEST);
        }

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(recipientEmail);
        mailMessage.setSubject("[Kinomitarbeit: Anfrage] " + name);
        mailMessage.setText(String.format("**Name**: %s\n**Email**: %s\n\n**Nachricht**:\n%s\n\n**Engagement (Std./Monat)**: %.1f", name, email, message, stundenEngagement));

        return sendEmail(mailMessage);
    }

    private ResponseEntity<?> handleKooperation(Map<String, Object> payload) {
        String betreff = (String) payload.get("betreff");
        String ansprechperson = (String) payload.get("ansprechperson");
        String email = (String) payload.get("email");
        String telefon = (String) payload.get("telefon");
        String filmtitel = (String) payload.get("filmtitel");
        String verleih = (String) payload.get("verleih");
        String format = (String) payload.get("format");
        String terminpraeferenz = (String) payload.get("terminpraeferenz");
        String nachricht = (String) payload.get("nachricht");
        String zusammenarbeit = (String) payload.get("zusammenarbeit");

        if (betreff == null || ansprechperson == null || email == null || filmtitel == null || verleih == null || format == null || terminpraeferenz == null || nachricht == null || zusammenarbeit == null ||
                betreff.isEmpty() || ansprechperson.isEmpty() || email.isEmpty() || filmtitel.isEmpty() || verleih.isEmpty() || format.isEmpty() || terminpraeferenz.isEmpty() || nachricht.isEmpty() || zusammenarbeit.isEmpty()) {
            return new ResponseEntity<>("{\"message\": \"Please fill in all required fields for Kooperation.\"}", HttpStatus.BAD_REQUEST);
        }

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(recipientEmail);
        mailMessage.setSubject("[Kooperationsanfrage] " + betreff);

        StringBuilder sb = new StringBuilder();
        sb.append(String.format("**Betreff**: %s\n\n", betreff));
        sb.append(String.format("**Ansprechperson**: %s\n\n", ansprechperson));
        sb.append(String.format("**Email**: %s\n\n", email));
        if (telefon != null && !telefon.isEmpty()) {
            sb.append(String.format("**Telefon**: %s\n\n", telefon));
        }
        sb.append(String.format("**Filmtitel**: %s\n\n", filmtitel));
        sb.append(String.format("**Verleih/Rechteinhaber**: %s\n\n", verleih));
        sb.append(String.format("**Abspielformat**: %s\n\n", format));
        sb.append(String.format("**Terminpräferenz**:\n%s\n\n", terminpraeferenz));
        sb.append(String.format("**Nachricht**:\n%s\n\n", nachricht));
        sb.append(String.format("**Vorstellungen zur Zusammenarbeit**:\n%s\n\n", zusammenarbeit));

        mailMessage.setText(sb.toString());

        return sendEmail(mailMessage);
    }

    private ResponseEntity<?> handleEigenstaendig(Map<String, Object> payload) {
        String betreff = (String) payload.get("betreff");
        String ansprechperson = (String) payload.get("ansprechperson");
        String email = (String) payload.get("email");
        String veranstaltungsbeginnStr = (String) payload.get("veranstaltungsbeginn");
        String veranstaltungsendeStr = (String) payload.get("veranstaltungsende");

        if (betreff == null || ansprechperson == null || email == null || veranstaltungsbeginnStr == null || veranstaltungsendeStr == null ||
                betreff.isEmpty() || ansprechperson.isEmpty() || email.isEmpty() || veranstaltungsbeginnStr.isEmpty() || veranstaltungsendeStr.isEmpty()) {
            return new ResponseEntity<>("{\"message\": \"Please fill in all required fields for Eigenständig.\"}", HttpStatus.BAD_REQUEST);
        }

        // Format the dates
        String formattedVeranstaltungsbeginn = formatDateTime(veranstaltungsbeginnStr);
        String formattedVeranstaltungsende = formatDateTime(veranstaltungsendeStr);

        if (formattedVeranstaltungsbeginn == null || formattedVeranstaltungsende == null) {
            return new ResponseEntity<>("{\"message\": \"Invalid date/time format. Please use ISO 8601 format.\"}", HttpStatus.BAD_REQUEST);
        }

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(recipientEmail);
        mailMessage.setSubject("[Eigenständige Nutzung Festsaal, Leinwand] " + betreff);
        mailMessage.setText(String.format("**Betreff**: %s\n**Ansprechperson**: %s\n**Email**: %s\n**Veranstaltungsbeginn**: %s\n**Veranstaltungsende**: %s",
                betreff, ansprechperson, email, formattedVeranstaltungsbeginn, formattedVeranstaltungsende));
        return sendEmail(mailMessage);
    }

    private ResponseEntity<?> handleMitKinotechnik(Map<String, Object> payload) {
        String betreff = (String) payload.get("betreff");
        String ansprechperson = (String) payload.get("ansprechperson");
        String email = (String) payload.get("email");
        String telefon = (String) payload.get("telefon");
        String nachricht = (String) payload.get("nachricht");
        String projektionsinhalt = (String) payload.get("projektionsinhalt");
        String verleih = (String) payload.get("verleih");
        String format = (String) payload.get("format");
        Number anzMikrofoneObj = (Number) payload.get("anzMikrofone");
        int anzMikrofone = anzMikrofoneObj != null ? anzMikrofoneObj.intValue() : 0;
        String veranstaltungsbeginnStr = (String) payload.get("veranstaltungsbeginn");
        String veranstaltungsendeStr = (String) payload.get("veranstaltungsende");
        Boolean istGemietetBeiAstaObj = (Boolean) payload.get("istGemietetBeiAsta");
        boolean istGemietetBeiAsta = istGemietetBeiAstaObj != null ? istGemietetBeiAstaObj : false;
        Boolean wurdeGelesenHinweisEventlocationObj = (Boolean) payload.get("wurdeGelesenHinweisEventlocation");
        boolean wurdeGelesenHinweisEventlocation = wurdeGelesenHinweisEventlocationObj != null ? wurdeGelesenHinweisEventlocationObj : false;

        if (betreff == null || ansprechperson == null || email == null || nachricht == null || projektionsinhalt == null || format == null || veranstaltungsbeginnStr == null || veranstaltungsendeStr == null ||
                betreff.isEmpty() || ansprechperson.isEmpty() || email.isEmpty() || nachricht.isEmpty() || projektionsinhalt.isEmpty() || format.isEmpty() || veranstaltungsbeginnStr.isEmpty() || veranstaltungsendeStr.isEmpty()) {
            return new ResponseEntity<>("{\"message\": \"Please fill in all required fields.\"}", HttpStatus.BAD_REQUEST);
        }

        // Format the dates
        String formattedVeranstaltungsbeginn = formatDateTime(veranstaltungsbeginnStr);
        String formattedVeranstaltungsende = formatDateTime(veranstaltungsendeStr);

        if (formattedVeranstaltungsbeginn == null || formattedVeranstaltungsende == null) {
            return new ResponseEntity<>("{\"message\": \"Invalid date/time format. Please use ISO 8601 format.\"}", HttpStatus.BAD_REQUEST);
        }

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(recipientEmail);
        mailMessage.setSubject("[Kinotechnik: Anfrage] " + betreff);

        StringBuilder sb = new StringBuilder();
        sb.append(String.format("**Betreff**: %s\n\n", betreff));
        sb.append(String.format("**Ansprechperson**: %s\n\n", ansprechperson));
        sb.append(String.format("**Email**: %s\n\n", email));
        if (telefon != null && !telefon.isEmpty()) {
            sb.append(String.format("**Telefon**: %s\n\n", telefon));
        }
        sb.append(String.format("**Nachricht**:\n%s\n\n", nachricht));
        sb.append(String.format("**Projektionsinhalt**: %s\n\n", projektionsinhalt));
        if (verleih != null && !verleih.isEmpty()) {
            sb.append(String.format("**Verleiher/Rechteinhaber**: %s\n\n", verleih));
        }
        sb.append(String.format("**Abspielformat**: %s\n\n", format));
        sb.append(String.format("**Anzahl benötigter Mikrofone**: %d\n\n", anzMikrofone));
        sb.append(String.format("**Veranstaltungsbeginn**: %s\n\n", formattedVeranstaltungsbeginn));
        sb.append(String.format("**Veranstaltungsende**: %s\n\n", formattedVeranstaltungsende));
        sb.append(String.format("**Festsaal beim AStA gemietet**: %s\n\n", istGemietetBeiAsta ? "Ja" : "Nein"));
        sb.append(String.format("**Hinweis Eventlocation gelesen**: %s\n\n", wurdeGelesenHinweisEventlocation ? "Ja" : "Nein"));

        mailMessage.setText(sb.toString());

        return sendEmail(mailMessage);
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
            return null;
        }
    }

    private ResponseEntity<?> sendEmail(SimpleMailMessage mailMessage) {
        try {
            mailSender.send(mailMessage);
            return new ResponseEntity<>("{\"message\": \"Message sent successfully!\"}", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("{\"message\": \"Failed to send message. Please try again later.\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private String extractDomain(String email) {
        int atIndex = email.indexOf('@');
        if (atIndex > 0 && atIndex < email.length() - 1) {
            return email.substring(atIndex + 1);
        }
        return "";
    }
}
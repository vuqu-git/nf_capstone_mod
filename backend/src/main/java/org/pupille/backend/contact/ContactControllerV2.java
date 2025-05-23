package org.pupille.backend.contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class ContactControllerV2 {

    private final ContactServiceV2 contactServiceV2;

    @Autowired
    public ContactControllerV2(ContactServiceV2 contactServiceV2) {
        this.contactServiceV2 = contactServiceV2;
    }

    @PostMapping("/api/v2/contact/{issue}")
    public ResponseEntity<?> handleContactForm(
            @PathVariable String issue,
            @RequestBody Map<String, Object> payload) {
        contactServiceV2.handleContact(issue, payload);
        return new ResponseEntity<>("{\"message\": \"Message sent successfully!\"}", HttpStatus.OK);
    }
}


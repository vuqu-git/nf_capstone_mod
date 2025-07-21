package org.pupille.backend.contact;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class ContactController {

    private final ContactService contactService;

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

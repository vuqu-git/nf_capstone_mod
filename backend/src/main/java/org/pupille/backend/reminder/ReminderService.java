package org.pupille.backend.reminder;

import org.pupille.backend.contact.ContactService;
import org.pupille.backend.mysql.screening.FilmDTOGallery;
import org.pupille.backend.mysql.screening.TerminDTOWithFilmDTOGallery;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class ReminderService {

    private final RestClient restClient;
    private final ContactService contactService;

    public ReminderService(RestClient.Builder restClient, ContactService contactService) {
        this.restClient = restClient
                .baseUrl("http://localhost:8080") // <--- Add your API's base URL here
                .build();
        this.contactService = contactService;
    }

    @Scheduled(cron = "45 23 1 * * *", zone = "Europe/Berlin")
    public void scheduledReminder() {

        final int FUTURE_DAYS = 10;
        List<TerminDTOWithFilmDTOGallery> futureScreenings = restClient.get()
                .uri("/api/screenings/future/{days}", FUTURE_DAYS)
                .retrieve()
                .body(new ParameterizedTypeReference<>() {});

        if (futureScreenings != null && !futureScreenings.isEmpty()) {
            for (TerminDTOWithFilmDTOGallery screening : futureScreenings) {
                String titel = screening.titel();
                if (titel == null || titel.trim().isEmpty()) {
                    List<FilmDTOGallery> mainfilms = screening.mainfilms();
                    if (mainfilms != null && !mainfilms.isEmpty()) {
                        titel = mainfilms.get(0).titel();
                    }
                }

                contactService.sendReminder(
                        FUTURE_DAYS,
                        screening.vorstellungsbeginn().toString(),
                        titel,
                        "quy8vuong@gmail.com",
                        true
                );
            }
        }

        // ######################################################

        final int PAST_DAYS = 7;
        List<TerminDTOWithFilmDTOGallery> pastScreenings = restClient.get()
                .uri("/api/screenings/past/{days}", PAST_DAYS)
                .retrieve()
                .body(new ParameterizedTypeReference<>() {});

        if (pastScreenings != null && !pastScreenings.isEmpty()) {
            for (TerminDTOWithFilmDTOGallery screening : pastScreenings) {
                String titel = screening.titel();
                if (titel == null || titel.trim().isEmpty()) {
                    List<FilmDTOGallery> mainfilms = screening.mainfilms();
                    if (mainfilms != null && !mainfilms.isEmpty()) {
                        titel = mainfilms.get(0).titel();
                    }
                }

                contactService.sendReminder(
                        PAST_DAYS,
                        screening.vorstellungsbeginn().toString(),
                        titel,
                        "quy8vuong@gmail.com",
                        false
                );
            }
        }
    }

}

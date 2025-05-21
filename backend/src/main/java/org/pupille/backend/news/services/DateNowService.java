package org.pupille.backend.news.services;

import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service
public class DateNowService {
    public LocalDate localDateNow() {
        return LocalDate.now();
    }

}

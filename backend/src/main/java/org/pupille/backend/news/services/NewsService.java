package org.pupille.backend.news.services;

import lombok.RequiredArgsConstructor;
import org.pupille.backend.news.exceptions.NewsNotFoundException;
import org.pupille.backend.news.models.News;
import org.pupille.backend.news.repositories.NewsRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsService {
    private final NewsRepo newsRepo;

    private final IdService idService;
    private final DateNowService dateNowService;

    private final String errorMessage = "No news found with the id %s";

    public List<News> getAllNews() {
        return newsRepo.findAll();
    }

    public News getNewsById(String id) {
        return newsRepo.findById(id)
                       .orElseThrow(
                            () -> new NewsNotFoundException(String.format(errorMessage, id))
                        );
    }

    public News saveNews(News newNews){
        String id = idService.randomId();
        News movieToSave = newNews.withId(id);
        return newsRepo.save(movieToSave);
    }

    public void deleteNews(String id) {
        if (newsRepo.existsById(id)) {
            newsRepo.deleteById(id);
        } else {
            throw new NewsNotFoundException(String.format(errorMessage, id));
        }
    }

    public News updateNews(String targetId, News updatedMovie) {

        if (!newsRepo.existsById(targetId)) {
            throw new NewsNotFoundException(String.format(errorMessage, targetId));
        }

        // Ensure the id in the updatedNews matches the path variable id.
        if (!targetId.equals(updatedMovie.id())) {
            throw new IllegalArgumentException("ID in path and body do not match");
        }
        return newsRepo.save(updatedMovie);
    }

    // ########################################
    // now non standard service queries/methods

    public List<News> getNewsByDateInRange() {
        LocalDate currentDate = dateNowService.localDateNow();
        return newsRepo.findNewsByDateInRange(currentDate);
    }
}
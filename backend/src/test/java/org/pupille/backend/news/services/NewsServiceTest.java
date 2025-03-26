package org.pupille.backend.news.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.pupille.backend.news.exceptions.NewsNotFoundException;
import org.pupille.backend.news.models.News;
import org.pupille.backend.news.repositories.NewsRepo;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class NewsServiceTest {

    private NewsRepo mockNewsRepo;
    private IdService mockIdService;
    private NewsService newsService;

    private News n1, n2;

    @BeforeEach
    void testSetup() {
        mockNewsRepo = mock(NewsRepo.class);
        mockIdService = mock(IdService.class);
        newsService = new NewsService(mockNewsRepo, mockIdService);
        n1 = new News("1",
                "Vorführung X fällt aus",
                null,
                LocalDate.of(2025, 3, 10),
                LocalDate.of(2025, 3, 28));

        n2 = new News("2",
                "Geburtstagsfilm",
                null,
                LocalDate.of(2025, 2, 20),
                LocalDate.of(2025, 3, 15));
    }


    @Test
    void getAllNews_whenEmpty_returnEmptyList() {
        // GIVEN
        List<News> expected = List.of();
        when(mockNewsRepo.findAll()).thenReturn(expected);
        // WHEN
        List<News> actual = newsService.getAllNews();
        // THEN
        verify(mockNewsRepo).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void getAllNews_whenNotEmpty_returnNewsList() {
        // GIVEN
        List<News> expected = List.of(n1, n2);
        when(mockNewsRepo.findAll()).thenReturn(expected);
        // WHEN
        List<News> actual = newsService.getAllNews();
        // THEN
        verify(mockNewsRepo).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void getNewsById_found() {
        // GIVEN
        News expected = n2;
        String id = "2";
        when(mockNewsRepo.findById(id)).thenReturn(Optional.of(expected));
        // WHEN
        News actual = newsService.getNewsById(id);
        // THEN
        verify(mockNewsRepo).findById(id);
        assertEquals(expected, actual);
    }

    @Test
    void getNewsById_notFound() {
        // GIVEN
        String id = "3";
        when(mockNewsRepo.findById(id)).thenReturn(Optional.empty()); //  mock the behavior to ensure it returns an empty Optional
        // WHEN + THEN
        assertThrows(NewsNotFoundException.class, () -> newsService.getNewsById(id));


        // Order Matters: The order of operations in a test is crucial.
        // You must first execute the code under test and then verify any interactions with mock objects.
        // The verify call should be placed after the method under test is executed.
        verify(mockNewsRepo).findById(id); // Verify the method was called

    }

    @Test
    void saveNews() {
        // GIVEN
        News expected = n2;
        String id = "2";
        when(mockIdService.randomId()).thenReturn(id);

        when(mockNewsRepo.save(n2)).thenReturn(expected);
        // WHEN
        News actual = newsService.saveNews(n2);
        // THEN
        verify(mockIdService).randomId();
        verify(mockNewsRepo).save(n2);
        assertEquals(expected, actual);
    }

    // Test with Null Input
    @Test
    void saveNewsNullInput() {
        assertThrows(NullPointerException.class, () -> newsService.saveNews(null));
    }

    // 2. Test with Empty or Invalid News Object
    @Test
    void saveNewsInvalidNews_A() {
        // Simulate ID generation if necessary
        String id = "2";
        when(mockIdService.randomId()).thenReturn(id);
        // Create an invalid News object with empty fields
        assertThrows(IllegalArgumentException.class, () -> newsService.saveNews(new News(null, null, "", LocalDate.now(), LocalDate.now())));

        // SonarQUbe complains: Refactor the code of the lambda to have only one invocation possibly throwing a runtime exception.
        // When verifying that code raises a runtime exception, a good practice is to avoid having multiple method calls inside the tested code, to be explicit about which method call is expected to raise the exception.
        // It increases the clarity of the test, and avoid incorrect testing when another method is actually raising the exception.
        // Solution: see saveNewsInvalidNews_B
    }
    @Test
    void saveNewsInvalidNews_B() {
        // Simulate ID generation if necessary
        String id = "2";
        when(mockIdService.randomId()).thenReturn(id);

        try {
            newsService.saveNews(new News("", null, "", LocalDate.now(), LocalDate.now()));
            fail("Expected IllegalArgumentException");
        } catch (IllegalArgumentException e) {
            // Expected behavior
        }
    }

    // Test Repository Save Failure
    @Test
    void saveNewsRepositoryFailure() {
        String id = "2";
        when(mockIdService.randomId()).thenReturn(id);
        when(mockNewsRepo.save(n2)).thenThrow(new RuntimeException("Save failed"));

        assertThrows(RuntimeException.class, () -> newsService.saveNews(n2));
    }

    // Test Id Generation Failure
    @Test
    void saveNewsIdGenerationFailure() {
        when(mockIdService.randomId()).thenThrow(new RuntimeException("ID generation failed"));

        assertThrows(RuntimeException.class, () -> newsService.saveNews(n2));
    }

    @Test
    void deleteNews_notFound() {
        // GIVEN
        String id = "2";
        when(mockNewsRepo.existsById(id)).thenReturn(false);

        // WHEN & THEN
        assertThrows(NewsNotFoundException.class, () -> newsService.deleteNews(id));

        verify(mockNewsRepo).existsById(id);
        // opposite i.e. was NOT called
        verify(mockNewsRepo, never()).deleteById(id);
    }

    @Test
    void deleteNews_found() {
        // GIVEN
        String id = "2";
        when(mockNewsRepo.existsById(id)).thenReturn(true);
//        // WHEN
//        newsService.deleteNews(id);

        // WHEN & THEN
        assertDoesNotThrow(() -> newsService.deleteNews(id));

        // THEN
        verify(mockNewsRepo).existsById(id);
        verify(mockNewsRepo).deleteById(id);
    }

    @Test
    void updateNews_succesful() {
        // GIVEN
        String id = "2";
        News newN2 = new News("2",
                "X-Mas-Film",
                null,
                LocalDate.of(2025, 2, 20),
                LocalDate.of(2025, 3, 15)
        );
        News expected = newN2;
        when(mockNewsRepo.existsById(id)).thenReturn(true);
        when(mockNewsRepo.save(newN2)).thenReturn(newN2);

        // WHEN
        News actual = newsService.updateNews(id, newN2);

        // THEN
        verify(mockNewsRepo).existsById(id);
        verify(mockNewsRepo).save(newN2);
        assertEquals(expected, actual);
    }

    @Test
    void updateNews_idMismatch_IllegalArgument() {
        // GIVEN
        String id = "3";
        News newN2 = new News("2",
                "X-Mas-Film",
                null,
                LocalDate.of(2025, 2, 20),
                LocalDate.of(2025, 3, 15)
        );
        when(mockNewsRepo.existsById(id)).thenReturn(true);

        // WHEN & THEN
        assertThrows(IllegalArgumentException.class, () -> newsService.updateNews(id, newN2));
        verify(mockNewsRepo).existsById(id);
        verify(mockNewsRepo, never()).save(any()); // Verify save is not called
    }

    @Test
    void updateNews_notFound_NewsNotFoundException() {
        // GIVEN
        String id = "2";
        News newN2 = new News("2",
                "X-Mas-Film",
                null,
                LocalDate.of(2025, 2, 20),
                LocalDate.of(2025, 3, 15)
        );
        when(mockNewsRepo.existsById(id)).thenReturn(false);

        // WHEN & THEN
        assertThrows(NewsNotFoundException.class, () -> newsService.updateNews(id, newN2));
        verify(mockNewsRepo).existsById(id);
        verify(mockNewsRepo, never()).save(any()); // Verify save is not called
    }

    @Test
    void getNewsByDateInRange_whenEmpty_returnEmptyList() {
        // GIVEN
        List<News> expected = List.of();
        LocalDate date = LocalDate.of(2025, 4, 20);
        when(mockNewsRepo.findByStartDateLessThanEqualAndEndDateGreaterThanEqual(date)).thenReturn(expected);
        // WHEN
        List<News> actual = newsService.getNewsByDateInRange(date);
        // THEN
        verify(mockNewsRepo).findByStartDateLessThanEqualAndEndDateGreaterThanEqual(date);
        assertEquals(expected, actual);
    }

    @Test
    void getNewsByDateInRange_whenNotEmpty_returnNewsList_1() {
        // GIVEN
        List<News> expected = List.of(n1);
        LocalDate date = LocalDate.of(2025, 3, 20);
        when(mockNewsRepo.findByStartDateLessThanEqualAndEndDateGreaterThanEqual(date)).thenReturn(expected);
        // WHEN
        List<News> actual = newsService.getNewsByDateInRange(date);
        // THEN
        verify(mockNewsRepo).findByStartDateLessThanEqualAndEndDateGreaterThanEqual(date);
        assertEquals(expected, actual);
    }

    @Test
    void getNewsByDateInRange_whenNotEmpty_returnNewsList_2() {
        // GIVEN
        List<News> expected = List.of(n1, n2);
        LocalDate date = LocalDate.of(2025, 3, 12);
        when(mockNewsRepo.findByStartDateLessThanEqualAndEndDateGreaterThanEqual(date)).thenReturn(expected);
        // WHEN
        List<News> actual = newsService.getNewsByDateInRange(date);
        // THEN
        verify(mockNewsRepo).findByStartDateLessThanEqualAndEndDateGreaterThanEqual(date);
        assertEquals(expected, actual);
    }
}
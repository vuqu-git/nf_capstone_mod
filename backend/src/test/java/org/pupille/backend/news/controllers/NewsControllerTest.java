package org.pupille.backend.news.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.pupille.backend.news.models.News;
import org.pupille.backend.news.repositories.NewsRepo;
import org.pupille.backend.news.services.DateNowService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class NewsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    NewsRepo newsTestRepo;

    // ######################################
    // the following @MockitoBean annotation:
    //      It tells Spring Boot to create a mock instance of DateNowService.
    //      It replaces the real DateNowService bean in the application context with this mock.
    //      It injects this mock into the NewsService where the DateNowService is autowired.
    @MockitoBean
    private DateNowService mockDateNowService;
    // usage in a test method: when(dateNowService.localDateNow()).thenReturn(LocalDate.of(2025, 5, 28));
    //      → This line sets the behavior of the mock. When NewsService calls dateNowService.localDateNow(), it will now receive LocalDate.of(2025, 5, 28).
    // example: see test method getValidNews_whenFound_returnNews below

    @BeforeEach
    void testSetup() {
//        // not use because in some tests an empty repo is used
//        News news1 = new News("1",
//                "Theatre closed!",
//                "",
//                LocalDate.parse("2025-05-01"),
//                LocalDate.parse("2025-05-10"));
//        News news2 = new News("2",
//                "Action double feature coming soon!",
//                "",
//                LocalDate.of(2025, 4, 20),
//                LocalDate.of(2025, 5, 15));
//
//        newsTestRepo.save(news1);
//        newsTestRepo.save(news2);
    }

    @Test
    void getAllNews_whenEmpty_returnEmptyList() throws Exception {
        // GIVEN
        // i.e. empty newsTestRepo

        // WHEN
        mockMvc.perform(get("/api/news/all")
                        .contentType(MediaType.APPLICATION_JSON))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                  []
                """));
    }

    @Test
    @DirtiesContext
    void getAllNews_whenFound_returnNews() throws Exception {
        // GIVEN
        // same like in testSetup above
        News news1 = new News("1",
                        "Theatre closed!",
                            "",
                                LocalDate.parse("2025-05-01"),
                                LocalDate.parse("2025-05-10"),
                                "light");
        News news2 = new News("2",
                    "Action double feature coming soon!",
                        "",
                            LocalDate.of(2025, 4, 20),
                            LocalDate.of(2025, 5, 15),
                "light");

        newsTestRepo.save(news1);
        newsTestRepo.save(news2);
        // WHEN
        mockMvc.perform(get("/api/news/all")
                        .contentType(MediaType.APPLICATION_JSON))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                [
                    {
                        "id": "1",
                        "text": "Theatre closed!",
                        "image": "",
                        "startDate": "2025-05-01",
                        "endDate": "2025-05-10",
                        "newsVariant": "light"
                    },
                    {
                        "id": "2",
                        "text": "Action double feature coming soon!",
                        "image": "",
                        "startDate": "2025-04-20",
                        "endDate": "2025-05-15",
                        "newsVariant": "light"

                    }
                ]
                """));
    }

    @Test
    @DirtiesContext
    void getValidNews_whenFound_returnNews() throws Exception {
        // GIVEN
        News news1 = new News("1",
                "Theatre closed!",
                "",
                LocalDate.parse("2025-05-01"),
                LocalDate.parse("2025-05-15"),
                "light");
        News news2 = new News("2",
                "Action double feature coming soon!",
                "",
                LocalDate.of(2025, 5, 1),
                LocalDate.of(2025, 5, 31),
                "light");

        newsTestRepo.save(news1);
        newsTestRepo.save(news2);

        // !!!!! these 2 lines doesn't work:
//        when(mock(NewsRepo.class).findNewsByDateInRange( LocalDate.of(2025, 5, 12) )).thenReturn( List.of(news2) );
//        when(mock(DateNowService.class).localDateNow()).thenReturn(LocalDate.of(2025, 5, 28));

        when(mockDateNowService.localDateNow()).thenReturn(LocalDate.of(2025, 5, 28));

        // WHEN
        mockMvc.perform(get("/api/news")
                        .contentType(MediaType.APPLICATION_JSON))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                [
                    {
                        "id": "2",
                        "text": "Action double feature coming soon!",
                        "image": "",
                        "startDate": "2025-05-01",
                        "endDate": "2025-05-31",
                        "newsVariant": "light"

                    }
                ]
                """));
    }

    @Test
    @DirtiesContext
    void getValidNews_whenNotFound_returnEmpty() throws Exception {
        // GIVEN
        News news1 = new News("1",
                "Theatre closed!",
                "",
                LocalDate.parse("2025-05-01"),
                LocalDate.parse("2025-05-15"),
                "light");
        News news2 = new News("2",
                "Action double feature coming soon!",
                "",
                LocalDate.of(2025, 5, 1),
                LocalDate.of(2025, 5, 31),
                "light");

        newsTestRepo.save(news1);
        newsTestRepo.save(news2);

        when(mockDateNowService.localDateNow()).thenReturn(LocalDate.of(2025, 4, 28));

        // WHEN
        mockMvc.perform(get("/api/news")
                        .contentType(MediaType.APPLICATION_JSON))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                [
                ]
                """));
    }

    @Test
    @DirtiesContext
    void getNewsItem_whenFound_returnNews() throws Exception {
        // GIVEN
        News news1 = new News("1",
                "Theatre closed!",
                "",
                LocalDate.parse("2025-05-01"),
                LocalDate.parse("2025-05-10"),
                "light");
        News news2 = new News("2",
                "Action double feature coming soon!",
                "",
                LocalDate.of(2025, 4, 20),
                LocalDate.of(2025, 5, 15),
                "light");

        newsTestRepo.save(news1);
        newsTestRepo.save(news2);
        // WHEN
        mockMvc.perform(get("/api/news/all/1")
                        .contentType(MediaType.APPLICATION_JSON))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                
                    {
                        "id": "1",
                        "text": "Theatre closed!",
                        "image": "",
                        "startDate": "2025-05-01",
                        "endDate": "2025-05-10",
                        "newsVariant": "light"
                    }
                
                """));
    }

    @Test
    void getNewsItem_whenNotFound_throwException() throws Exception {
        // GIVEN
        String targetId = "1a2b3c";
        // i.e. empty newsTestRepo

        // WHEN
        mockMvc.perform(get("/api/news/all/" + targetId)
                        .contentType(MediaType.APPLICATION_JSON))
                // THEN
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("No news found with the id " + targetId));
    }

    @Test
    @DirtiesContext
    void deleteNewsItem_whenFound_removesNews() throws Exception {
        // GIVEN
        News news1 = new News("1",
                "Theatre closed!",
                "",
                LocalDate.parse("2025-05-01"),
                LocalDate.parse("2025-05-10"),
                "light");
        News news2 = new News("2",
                "Action double feature coming soon!",
                "",
                LocalDate.of(2025, 4, 20),
                LocalDate.of(2025, 5, 15),
                "light");

        newsTestRepo.save(news1);
        newsTestRepo.save(news2);
        // WHEN
        mockMvc.perform(delete("/api/news/all/" + news1.id())
                        .contentType(MediaType.APPLICATION_JSON))
                // THEN
                .andExpect(status().isOk());
    }

    @Test
    void deleteNewsItem_whenNotFound_throwException() throws Exception {
        // GIVEN
        String targetId = "1a2b3c";
        // i.e. empty newsTestRepo

        // WHEN
        mockMvc.perform(delete("/api/news/all/" + targetId)
                        .contentType(MediaType.APPLICATION_JSON))
                // THEN
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("No news found with the id " + targetId));
    }

    @Test
    @DirtiesContext
    void addNewsItem() throws Exception {
        // GIVEN
        News news1 = new News("1",
                "Theatre closed!",
                "",
                LocalDate.parse("2025-05-01"),
                LocalDate.parse("2025-05-10"),
                "light");

        newsTestRepo.save(news1);
        // WHEN
        mockMvc.perform(post("/api/news/all")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                {
                                    "id": null,
                                    "text": "Action double feature coming soon!",
                                    "image": "",
                                    "startDate": "2025-04-20",
                                    "endDate": "2025-05-15",
                                    "newsVariant": "light"
                                }
                                """
                        )
                )
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                
                    {
                        "text": "Action double feature coming soon!",
                        "image": "",
                        "startDate": "2025-04-20",
                        "endDate": "2025-05-15",
                        "newsVariant": "light"
                    }
                
                """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    void updateMovie_whenFound_returnMovie() throws Exception {
        // GIVEN
        News news1 = new News("1",
                "Theatre closed!",
                "",
                LocalDate.parse("2025-05-01"),
                LocalDate.parse("2025-05-10"),
                "light");

        newsTestRepo.save(news1);
        // WHEN
        mockMvc.perform(put("/api/news/all/" + news1.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        // the following json needs to have all the fields of a java News object
                        .content(
                                """
                                {
                                    "id": "1",
                                    "text": "Action double feature coming soon!",
                                    "image": "",
                                    "startDate": "2025-04-20",
                                    "endDate": "2025-05-15",
                                    "newsVariant": "light"
                                }
                                """
                        )
                )
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                
                    {
                        "id": "1",
                        "text": "Action double feature coming soon!",
                        "image": "",
                        "startDate": "2025-04-20",
                        "endDate": "2025-05-15",
                        "newsVariant": "light"
                    }
                
                """));
    }

    @Test
    void updateMovie_whenNotFound_throwNewsNotFoundException() throws Exception {
        // GIVEN
        String targetId = "1";
        // newsTestRepo is empty

        // WHEN
        mockMvc.perform(put("/api/news/all/" + targetId)
                        .contentType(MediaType.APPLICATION_JSON)
                        // the following json needs to have all the fields of a java News object
                        .content(
                                """
                                {
                                    "id": "1",
                                    "text": "Action double feature coming soon!",
                                    "image": "",
                                    "startDate": "2025-04-20",
                                    "endDate": "2025-05-15",
                                    "newsVariant": "light"
                                }
                                """
                        )
                )
                // THEN
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("No news found with the id " + targetId));
    }

    @Test
    void updateMovie_whenFound_throwNewsUpdateException() throws Exception {
        // GIVEN
        News news1 = new News("1",
                "Theatre closed!",
                "",
                LocalDate.parse("2025-05-01"),
                LocalDate.parse("2025-05-10"),
                "light");

        newsTestRepo.save(news1);

        // WHEN
        mockMvc.perform(put("/api/news/all/" + news1.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        // the following json needs to have all the fields of a java News object
                        .content(
                                """
                                {
                                    "id": "1111111",
                                    "text": "Action double feature coming soon!",
                                    "image": "",
                                    "startDate": "2025-04-20",
                                    "endDate": "2025-05-15",
                                    "newsVariant": "light"
                                }
                                """
                        )
                )
                // THEN
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("ID in path and body do not match"));
    }
}
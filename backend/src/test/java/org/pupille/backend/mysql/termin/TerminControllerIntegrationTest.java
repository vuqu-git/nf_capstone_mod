package org.pupille.backend.mysql.termin;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.http.MediaType;

import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;

//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@Import(org.pupille.backend.TestMailConfig.class)
@SpringBootTest
@ActiveProfiles("test") // Use "test" profile to load application-test.properties
@AutoConfigureMockMvc
@Transactional // After the test method finishes (whether it passes or fails), Spring's test framework, by default, will rollback the transaction.
               // This means all changes made during that test method are effectively undone. The database returns to the state it was in before the test method started.
               // This is the opposite of how @Transactional typically behaves in a production application, where it would commit the transaction on success. For tests, the default is rollback for isolation.
class TerminControllerIntegrationTest {

//    @MockitoBean
//    private JavaMailSender javaMailSender;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    // those both lines mean: performing CRUD operations on the real TerminRepository
    @Autowired
    private TerminRepository terminRepository;

    // !!!!!!!!!! this one is a unit test !!!!!!!!!!
    @Test
    void unitTestCreateAndRetrieveTermin() {
        // Arrange: Create a new Termin entity
        Termin termin = new Termin();
        termin.setVorstellungsbeginn(LocalDateTime.now());
        termin.setTitel("Test Title");
        termin.setText("Test Text");

        // Act: Save and retrieve it from the repository
        terminRepository.save(termin);
        List<Termin> allTermine = terminRepository.findAll();

        // Assert: Verify the results
        assertThat(allTermine).hasSize(1);
        assertThat(allTermine.get(0).getTitel()).isEqualTo("Test Title");
    }

    // integration test
    @Test
    void testCreateAndGetTermin() throws Exception {
        Termin termin = new Termin();
        termin.setVorstellungsbeginn(LocalDateTime.now());
        termin.setTitel("Test Termin");
        termin.setText("Test Text");
        termin.setKurztext("Short Test Text");
        termin.setBesonderheit("Special Test");
        termin.setStartReservierung(LocalDate.now());
        termin.setLinkReservierung("http://test.com");
        termin.setSonderfarbeTitel(1);
        termin.setSonderfarbe(2);
        termin.setVeroeffentlichen((short) 1);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/termine")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(termin)))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(termin))
                            // ObjectMapper: This is a core class from the Jackson library, which Spring Boot uses by default for JSON serialization and deserialization.
                            // writeValueAsString(Object value): This method takes a Java object (termin in this case) and serializes it into a JSON string.
                        // this line for fetching github username
                        .with(oidcLogin().userInfoToken(token -> token.claim("login", "github-username"))))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.tnr").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.titel").value("Test Termin"))
                .andReturn().getResponse().getContentAsString();

        // Get the id of the created object.
        Termin createdTermin = terminRepository.findAll().get(0);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/termine/" + createdTermin.getTnr()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.titel").value("Test Termin"));
    }


    // Add more tests for updateTermin, deleteTermin, etc.

}


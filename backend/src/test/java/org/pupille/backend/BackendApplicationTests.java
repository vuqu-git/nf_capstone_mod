package org.pupille.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

@Import(org.pupille.backend.TestMailConfig.class)
@SpringBootTest
@ActiveProfiles("test") // If using test-specific properties
class BackendApplicationTests {

	@Test
	void contextLoads() {
	}

}

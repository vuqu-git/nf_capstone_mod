package org.pupille.backend.mysql.programmheft;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProgrammheftRepo extends JpaRepository<Programmheft, Long> {
    List<Programmheft> findAllByOrderByGueltigBisDesc();

    // derived queries () per name convention here not possible: method name alone cannot express "start ≤ param ≤ end"), hence
    @Query("SELECT p FROM Programmheft p WHERE :nowDate BETWEEN p.gueltigVon AND p.gueltigBis ORDER BY p.gueltigBis DESC")
    List<Programmheft> findValidProgrammhefteByDateInRange(@Param("nowDate") LocalDate nowDate);
                            //    What is @Param("nowDate") For?
                            //      Declares a named parameter in your query: :nowDate.
                            //      Binds the method argument (LocalDate nowDate) to the query parameter.
                            //      Ensures type safety: The query engine matches the variable name in the query to the method parameter.
                            //
                            //    Can I Omit @Param?
                            //    Yes, But Only in Spring Boot 2.7+
                            //      Spring Boot 2.7+ supports parameter name resolution without @Param if you compile with -parameters javac flag.
                            //      If you omit @Param, the parameter will be bound by position (not name), which is less readable and can be error-prone if you reorder the method parameters.

}

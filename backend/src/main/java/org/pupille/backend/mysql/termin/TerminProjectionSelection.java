package org.pupille.backend.mysql.termin;

import java.time.LocalDateTime;

public interface TerminProjectionSelection {
    Long getTnr();
    LocalDateTime getVorstellungsbeginn();
    String getTitel();
}

// Where is the reference to the Termin entity?
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//      The entity (Termin) is referenced by the repository interface, not the projection interface.
//      The projection interface is a view (subset) on the Termin entity, recognized by matching getter names to the entity's property names.
//          The method signature List<TerminProjection> findAllByOrderByVorstellungsbeginnDesc() tells Spring Data:
//          Run a query that returns Termin entities,
//          But only fetch/map the fields defined in TerminProjectionSelection.

// In Spring Data JPA interface-based projections, the projection interface itself (here, TerminProjectionSelection) does not explicitly contain a reference to the entity like Termin.
// Instead, the mapping happens automatically in the repository method that returns the projection: see findAllByOrderByVorstellungsbeginnDesc in TerminRepository
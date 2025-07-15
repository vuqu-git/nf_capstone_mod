package org.pupille.backend.mysql.termin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class TerminService {

    private final TerminRepository terminRepository;

    @Autowired
    public TerminService(TerminRepository terminRepository) {
        this.terminRepository = terminRepository;
    }

//    public List<TerminDTOForm> getAllTermine() {
//        List<Termin> termine = terminRepository.findAll();
//        return termine.stream()
//                .map(TerminDTOForm::new)
//                .collect(Collectors.toList());
//    }

    public List<TerminProjectionSelection> getAllTermineByOrderByVorstellungsbeginnDesc() {
        return terminRepository.findAllByOrderByVorstellungsbeginnDesc();
    }

    public List<TerminDTOWithMainFilme> getAllTermineWithMainfilmeByOrderByVorstellungsbeginnDesc() {
        return terminRepository.findWithMainfilmeAllByOrderByVorstellungsbeginnDesc();
    }

    public Optional<TerminDTOForm> getTerminById(Long tnr) {
        return Optional.of( new TerminDTOForm(terminRepository.findById(tnr).get()) );
    }

    public TerminDTOForm createTermin(Termin termin) {
        // Do NOT set termin.setTnr(someValue) because we use auto-increment in the db
        return new TerminDTOForm(terminRepository.save(termin));
    }

    public TerminDTOForm updateTermin(Long tnr, Termin terminDetails) {
        return terminRepository.findById(tnr)
                .map(termin -> {
                    termin.setVorstellungsbeginn(terminDetails.getVorstellungsbeginn());
                    termin.setTitel(terminDetails.getTitel());
                    termin.setText(terminDetails.getText());
                    termin.setKurztext(terminDetails.getKurztext());
                    termin.setBesonderheit(terminDetails.getBesonderheit());
                    termin.setBild(terminDetails.getBild());
                    termin.setStartReservierung(terminDetails.getStartReservierung());
                    termin.setLinkReservierung(terminDetails.getLinkReservierung());
                    termin.setSonderfarbeTitel(terminDetails.getSonderfarbeTitel());
                    termin.setSonderfarbe(terminDetails.getSonderfarbe());
                    termin.setVeroeffentlichen(terminDetails.getVeroeffentlichen());
                    return new TerminDTOForm(terminRepository.save(termin));
                })
                .orElseThrow(() -> new RuntimeException("Termin not found"));
    }

    public void deleteTermin(Long tnr) {
        terminRepository.deleteById(tnr);
    }

    // ########################################################################
//    // both methods here are just only used for controller for testing purposes
//    public List<TerminDTOForm> getAllFutureTermine() {
//        LocalDate currentDate = LocalDate.now(ZoneId.of("Europe/Berlin"));
//        LocalTime fixedTime = LocalTime.of(0, 1);
//        // Combine the current date and the fixed time
//        LocalDateTime now = LocalDateTime.of(currentDate, fixedTime);
//
//        List<Termin> futureTermine = terminRepository.findAllFutureTermine(now);
//        return futureTermine.stream()
//                .map(TerminDTOForm::new)
//                .collect(Collectors.toList());
//    }
//
//    // If you need the projected results:
//    public List<TerminProjectionSelection> getAllFutureTermineProjected() {
//        LocalDate currentDate = LocalDate.now(ZoneId.of("Europe/Berlin"));
//        LocalTime fixedTime = LocalTime.of(0, 1);
//        // Combine the current date and the fixed time
//        LocalDateTime now = LocalDateTime.of(currentDate, fixedTime);
//        return terminRepository.findAllFutureTermineProjected(now);
//    }
    // ########################################################################

}


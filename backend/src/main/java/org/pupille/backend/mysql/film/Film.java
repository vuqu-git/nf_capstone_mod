package org.pupille.backend.mysql.film;

import jakarta.persistence.*;
import lombok.Data;
import org.pupille.backend.mysql.terminverknuepfung.Terminverknuepfung;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "film")
public class Film {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fnr;

    private String titel;
    private String originaltitel;
    private Boolean originaltitelAnzeigen; // Maps to `originaltitel_anzeigen`

    @Column(columnDefinition = "TEXT")
    private String text;

    @Column(columnDefinition = "TEXT")
    private String kurztext;

    private String besonderheit;
    private String land;
    private Integer jahr; // Maps to `jahr`

    private String farbe;
    private Integer laufzeit; // Maps to `laufzeit`

    private String sprache;
    private String untertitel;
    private String format;

    @Convert(converter = FskConverter.class) // Explicitly specify the converter
    private Fsk fsk;

    @Column(columnDefinition = "TEXT")
    private String stab;

    private String bild;

    private Integer sonderfarbeTitel; // Maps to `sonderfarbe_titel`

    private Integer sonderfarbe;

    public enum Fsk {
        _0, _6, _12, _16, _18, UNGEPRUEFT
    }

    //    ###########################################
    @OneToMany(mappedBy = "film", cascade = CascadeType.ALL)
    private List<Terminverknuepfung> terminConnections = new ArrayList<>();
    //    ###########################################
}


import TerminDTOFormWithFilmsDTOFormPlus from "../types/TerminDTOFormWithFilmsDTOFormPlus.ts";
import TerminFilmDetailsCard from "./termine/TerminFilmDetailsCard.tsx";
import {formatDateTime} from "../utils/DateTimeFormatForGallery.ts";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function ScreeningDetails() {

    const { tnr } = useParams();
    const [screeningDetails, setScreeningDetails] = useState<TerminDTOFormWithFilmsDTOFormPlus | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`/api/screenings/${tnr}`)
            .then(response => {
                setScreeningDetails(response.data);
            })
            .catch(err => {
                setError(err.response?.data?.message || "Error loading screening details");
            })
            .finally(() => setLoading(false));
    }, [tnr]);

    // if (loading) return <div className="text-warning">&#127902; Loading screening...</div>;
    if (error) return <div className="text-danger">{error}</div>;
    // if (!screeningDetails) return <div>No screening found</div>;

    const screeningDateObj = screeningDetails && screeningDetails.termin.termin
        ? formatDateTime(screeningDetails.termin.termin)
        : undefined;

    return (
        screeningDetails && (
            <TerminFilmDetailsCard
                tnr={tnr}

                screeningWeekday={screeningDateObj?.weekday}
                screeningDate={screeningDateObj?.date}
                screeningTime={screeningDateObj?.time}

                screeningterminIso8601={screeningDetails.termin.termin}

                screeningSonderfarbe={1}

                programmtitel={screeningDetails.termin.titel} // d.h. der titel in der Tabelle Termin
                programmtext={screeningDetails.termin.text} // d.h. der text in der Tabelle Termin
                programmbesonderheit={screeningDetails.termin.besonderheit} // d.h. die besonderheit in der Tabelle Termin

                mainfilms={screeningDetails.mainfilms}
                vorfilms={screeningDetails.vorfilms}

                screeningTotalDuration={screeningDetails.screeningTotalDuration}
            />
        )
    )
}
// Shared hook (useNewsHandling.ts)
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Film } from '../types/Film.ts';
import { FilmDTO } from '../types/FilmDTO.ts';


const baseURL = "/api/filme";


export const useAllFilms = (shouldFetchDetails: boolean = true) => {

    const emptyFilmForAddingForm: Film = {
        fnr: -1,
        titel: '',
        originaltitel: '',
        originaltitelAnzeigen: false,
        text: '',
        kurztext: '',
        besonderheit: '',
        land: '',
        jahr: undefined,
        farbe: '',
        laufzeit: undefined,
        sprache: '',
        untertitel: '',
        format: '',
        fsk: undefined,
        stab: '',
        bild: '',
        sonderfarbeTitel: undefined,
        sonderfarbe: undefined,
    }

    const [isLoading, setIsLoading] = useState(false);
    const [allFilms, setAllFilms] = useState<FilmDTO[]>([]);
    const [selectedId, setSelectedId] = useState<string>("");
    const [selectedFilm, setSelectedFilm] = useState<Film | null>(emptyFilmForAddingForm);
    const [error, setError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const getAllFilms = () => {
        setIsLoading(true);
        setError("");

        axios.get(`${baseURL}/allsorted`)
            .then((response) => setAllFilms(response.data))
            .catch((error) => {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                setError(errorMessage);
            })
            .finally(() => setIsLoading(false));
    };

    const getSingleFilm = (id: string) => {
        if (!id || !shouldFetchDetails) return; // Avoid fetching if not needed

        setIsLoading(true);
        setError("");

        axios.get(`${baseURL}/${id}`)
            .then((response) => setSelectedFilm(response.data))
            .catch((error) => {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                setError(errorMessage);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        getAllFilms();
    }, []);

    // useEffect(() => {
    //     getSingleFilm(selectedId);
    // }, [selectedId]);

    useEffect(() => {
        if (selectedId === "") {
            setSelectedFilm(emptyFilmForAddingForm);
        } else {
            getSingleFilm(selectedId);
        }
    }, [selectedId]);

    // this returns an object, here shorthand notation
    return {
        isLoadingAllFilms: isLoading,
        allFilms: allFilms,
        selectedId,
        selectedFilm,
        emptyFilmForAddingForm,
        error,
        successMessage,
        setSelectedId,
        setSelectedFilm,
        setSuccessMessage,
        setError,
        getAllFilms,
    };
};
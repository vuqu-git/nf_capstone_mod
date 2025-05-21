import {Film} from "../types/Film.ts";
import {ReactNode} from "react";

// Define the props type for the function
type Props = {
    f: Film;
    fType: string; // e.g., "Vorfilm:" or "Film:"
    numberOfF: number;
    index: number;
    renderHtmlText: (text: string) => ReactNode;
};


export function getFilmTitleForFilmDetailsCardFilmListing({
                                                              f,
                                                              fType,
                                                              numberOfF,
                                                              index,
                                                              renderHtmlText,
                                                          }: Props): ReactNode {
    // handling that f.titel in NOT undefined
    f.titel = f.titel ?? "[Filmtitel]";

    const titleContentSingleFilm = f.originaltitel ? (
        <>
            {renderHtmlText(f.titel)}
            <br />
            ({renderHtmlText(f.originaltitel)})
        </>
    ) : renderHtmlText(f.titel);

    const titleContentMultipleFilms = f.originaltitel ? (
        <>
            {renderHtmlText(f.titel)} ({renderHtmlText(f.originaltitel)})
        </>
    ) : renderHtmlText(f.titel);

    if (numberOfF === 1) {
        // fType is a string with the values "Vorfilm:" or "Film:"
        if (fType === "Vorfilm:") {
            return (
                <>
                    {fType}
                    <br />
                    {titleContentSingleFilm}
                </>
            );
        } else {
            return (
                <>
                    {fType}
                    {titleContentSingleFilm}
                </>
            );
        }
    } else {
        // here numeration
        return (
            <>
                {index + 1}. {fType}
                <br />
                {titleContentMultipleFilms}
            </>
        );
    }
}

import {useLoaderData} from "react-router-dom";
import {useState} from "react";
import TerminDTOWithFilmAndReiheDTOGallery from "../../types/TerminDTOWithFilmAndReiheDTOGallery.ts";
import Preview1 from "./Preview1.tsx";
import Preview1Child from "./Preview1Child.tsx";

const Preview1Parent: React.FC = () => {
    const semesterTermine = useLoaderData<TerminDTOWithFilmAndReiheDTOGallery[]>();

    const [selectedTnrs, setSelectedTnrs] = useState<number[]>([]);
    const [slideDuration, setSlideDuration] = useState<number>(20);
    const [showPreview, setShowPreview] = useState<boolean>(false);

    return (
        <div>
            {!showPreview ? (
                <Preview1
                    semesterTermine={semesterTermine}

                    selectedTnrs={selectedTnrs}
                    setSelectedTnrs={setSelectedTnrs}
                    slideDuration={slideDuration}
                    setSlideDuration={setSlideDuration}
                    setShowPreview={setShowPreview}
                />
            ) : (
                <Preview1Child
                    selectedSemesterTermine={semesterTermine.filter(termin => selectedTnrs.includes(termin.tnr))}

                    slideDuration={slideDuration * 1000}
                    setShowPreview={setShowPreview}
                />
            )}
        </div>
    );
};

export default Preview1Parent;
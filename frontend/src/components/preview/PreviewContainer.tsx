import {useLoaderData} from "react-router-dom";
import {useState} from "react";
import TerminDTOWithFilmDTOGallery from "../../types/TerminDTOWithFilmDTOGallery.ts";
import PreviewFormWithinContainer from "./PreviewFormWithinContainer.tsx";
import PreviewShow from "./PreviewShow.tsx";

const PreviewContainer: React.FC = () => {
    const semesterTermine = useLoaderData<TerminDTOWithFilmDTOGallery[]>();

    const [selectedTnrs, setSelectedTnrs] = useState<number[]>([]);
    const [slideDuration, setSlideDuration] = useState<number>(20);
    const [showPreview, setShowPreview] = useState<boolean>(false);

    return (
        <div>
            {!showPreview ? (
                <PreviewFormWithinContainer
                    semesterTermine={semesterTermine}

                    selectedTnrs={selectedTnrs}
                    setSelectedTnrs={setSelectedTnrs}
                    slideDuration={slideDuration}
                    setSlideDuration={setSlideDuration}
                    setShowPreview={setShowPreview}
                />
            ) : (
                <PreviewShow
                    selectedSemesterTermine={semesterTermine.filter(termin => selectedTnrs.includes(termin.tnr))}

                    slideDuration={slideDuration * 1000}
                    setShowPreview={setShowPreview}
                />
            )}
        </div>
    );
};

export default PreviewContainer;
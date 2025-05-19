import Preview1 from "./Preview1.tsx";
import Preview1Child from "./Preview1Child.tsx";
import {useState} from "react";
import {useLoaderData} from "react-router-dom";
import TerminDTOWithFilmDTOGallery from "../types/TerminDTOWithFilmDTOGallery.ts";




const Preview1Parent: React.FC = () => {

    const semesterTermine = useLoaderData<TerminDTOWithFilmDTOGallery[]>();

    const [submittedObjects, setSubmittedObjects] = useState<TerminDTOWithFilmDTOGallery[] | null>(null);
    const [submittedSlideDuration, setSubmittedSlideDuration]= useState<number>(20);

    const [showPreview, setShowPreview]= useState<boolean>(false);

    return (
        <div>
            {/*{!submittedObjects ? (*/}
            {!showPreview ? (
                <Preview1
                    semesterTermine={semesterTermine}
                    onSubmit={setSubmittedObjects}
                    setSubmittedSlideDuration={setSubmittedSlideDuration}
                    slideDuration={submittedSlideDuration}

                    setShowPreview={setShowPreview}
                />
            ) : (
                <Preview1Child
                    selectedObjects={submittedObjects}
                    slideDuration={submittedSlideDuration*1000}

                    setShowPreview={setShowPreview}
                />
            )}
        </div>
    );
};

export default Preview1Parent;
// import Preview1 from "./Preview1.tsx";
// import Preview1Child from "./Preview1Child.tsx";
// import {useState} from "react";
// import {useLoaderData} from "react-router-dom";
// import TerminDTOWithFilmDTOGallery from "../types/TerminDTOWithFilmDTOGallery.ts";
//
//
//
//
// const Preview1Parent: React.FC = () => {
//
//     const semesterTermine = useLoaderData<TerminDTOWithFilmDTOGallery[]>();
//
//     const [submittedObjects, setSubmittedObjects] = useState<TerminDTOWithFilmDTOGallery[] | null>(null);
//     const [submittedSlideDuration, setSubmittedSlideDuration]= useState<number>(20);
//
//     const [showPreview, setShowPreview]= useState<boolean>(false);
//     const [selectedTnrs, setSelectedTnrs] = useState<number[]>([]);
//
//
//     return (
//         <div>
//             {/*{!submittedObjects ? (*/}
//             {!showPreview ? (
//                 <Preview1
//                     semesterTermine={semesterTermine}
//                     onSubmit={setSubmittedObjects}
//                     setSubmittedSlideDuration={setSubmittedSlideDuration}
//                     slideDuration={submittedSlideDuration}
//
//                     setShowPreview={setShowPreview}
//
//                     selectedTnrs={selectedTnrs}
//                     setSelectedTnrs={setSelectedTnrs}
//                 />
//             ) : (
//                 <Preview1Child
//                     selectedObjects={submittedObjects}
//                     slideDuration={submittedSlideDuration*1000}
//
//                     setShowPreview={setShowPreview}
//                 />
//             )}
//         </div>
//     );
// };
//
// export default Preview1Parent;




// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import {useLoaderData} from "react-router-dom";
import {useState} from "react";
import TerminDTOWithFilmDTOGallery from "../types/TerminDTOWithFilmDTOGallery.ts";
import Preview1 from "./Preview1.tsx";
import Preview1Child from "./Preview1Child.tsx";

const Preview1Parent: React.FC = () => {
    const semesterTermine = useLoaderData<TerminDTOWithFilmDTOGallery[]>();

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
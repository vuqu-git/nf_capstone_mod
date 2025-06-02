import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import PreviewShow from "../preview/PreviewShow.tsx";
import Header2 from "../Header2.tsx";
import {Badge, Stack} from "react-bootstrap";
import PreviewFormWithinSlides from "../preview/PreviewFormWithinSlides.tsx";
import TerminDTOWithFilmDTOGallery from "../../types/TerminDTOWithFilmDTOGallery.ts";
import OverviewAndFormLayout from "../LayoutWrapper/OverviewAndFormLayout.tsx";
import IdentSlideFaintGradient from "./IdentSlideFaintGradient.tsx";
import IdentSlideDotGrid from "./IdentSlideDotGrid.tsx";
import IdentSlideGradient from "./IdentSlideGradient.tsx";
import Button from "react-bootstrap/Button";
import IdentSlideChromaticLogo from "./IdentSlideChromaticLogo.tsx";

export default function Slides() {
    const [mode, setMode] = useState<"menu" | "identSlideFaintGradient" | 'identSlideBlack' | 'identSlideGradient' | 'identSlideChromaticLogo' | "preview">("menu");

    const semesterTermine = useLoaderData<TerminDTOWithFilmDTOGallery[]>();

    const [selectedTnrs, setSelectedTnrs] = useState<number[]>([]);
    const [slideDuration, setSlideDuration] = useState<number>(20);
    const [showPreview, setShowPreview] = useState<boolean>(false);

    // Reset preview state when leaving preview mode
    const handleBack = () => {
        setShowPreview(false);
        setMode("menu");
    };

    switch (mode) {
        case "identSlideGradient":
            return (
                <section>
                    <IdentSlideGradient onBack={handleBack} />
                </section>
            );
        case "identSlideFaintGradient":
            return (
                <section>
                    <IdentSlideFaintGradient onBack={handleBack} />
                </section>
            );
        case "identSlideBlack":
            return (
                <section>
                    <IdentSlideDotGrid onBack={handleBack} />
                </section>
            );
        case "identSlideChromaticLogo":
            return (
                <section>
                    <IdentSlideChromaticLogo onBack={handleBack} />
                </section>
            );
        case "preview":
            // preview menu
            return (
                <section>
                    {!showPreview ? (
                        <PreviewFormWithinSlides
                            semesterTermine={semesterTermine}
                            selectedTnrs={selectedTnrs}
                            setSelectedTnrs={setSelectedTnrs}
                            slideDuration={slideDuration}
                            setSlideDuration={setSlideDuration}
                            setShowPreview={setShowPreview}
                            handleBack={handleBack}
                        />
                    ) : (
                        <PreviewShow
                            selectedSemesterTermine={semesterTermine.filter(termin => selectedTnrs.includes(termin.tnr))}
                            slideDuration={slideDuration * 1000}
                            setShowPreview={setShowPreview}
                        />
                    )}
                </section>
            );
        default:
            // main menu
            return (
                <div className="app-container">
                    <Header2 />
                    <div className="navbar-gradient"></div>

                    <OverviewAndFormLayout>
                        <section>
                            <h1>Holding slides</h1>

                            <h3 className="mt-3">Anmerkungen</h3>
                            <p>Im Edge Browser ist das Aktivieren sowie Deaktivieren der <b>kompletten</b> Vollbildansicht (ohne jegliche Menüs und Leisten) mit der Taste F11 möglich.</p>

                            <Badge bg="danger" className="mt-3">Hinweis:</Badge>
                            <p>Während der Slideshow den Cursor zum oberen Bildrand bewegen für Beendigung.</p>

                            <h3 className="mt-3">Idle screen with Pupille logo</h3>

                            <Stack gap={2} className="mb-3" direction="vertical" style={{ alignItems: "flex-start" }}>
                                <Button
                                    variant="secondary"
                                    className="align-self-start"
                                    onClick={() => setMode("identSlideFaintGradient")}
                                >
                                    Start ident slide (theme: slight gradient yellow/orange)
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="align-self-start"
                                    onClick={() => setMode("identSlideGradient")}
                                >
                                    Start ident slide (theme: sundown + waves)
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="align-self-start"
                                    onClick={() => setMode("identSlideBlack")}
                                >
                                    Start ident slide (theme: luminescent dot grid)
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="align-self-start"
                                    onClick={() => setMode("identSlideChromaticLogo")}
                                >
                                    Start ident slide (theme: chromatic logo)
                                </Button>
                            </Stack>

                            <h3 className="mt-3">Preview of upcoming films</h3>
                            <Button variant="secondary" onClick={() => setMode("preview")}>
                                Setup preview slides
                            </Button>
                        </section>
                    </OverviewAndFormLayout>

                </div>
            );
    }
}

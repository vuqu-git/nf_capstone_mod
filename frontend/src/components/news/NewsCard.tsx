import {useState} from "react";
import Alert from 'react-bootstrap/Alert';
import {renderHtmlText} from "../../utils/renderHtmlText.tsx";

type props = {
    variant: string,
    text?: string,
    imageUrl?: string
}

export default function NewsCard({variant, text, imageUrl}: props) {
    const [show, setShow] = useState(true);

    if (show) {

        if (variant === "free" && text) {
            return renderHtmlText(text)
        } else {
            return (
                <Alert variant={variant} data-bs-theme="dark" onClose={() => setShow(false)} dismissible>
                    {/*<Alert.Heading>Oh snap! You got an error!</Alert.Heading>*/}

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%" }}>
                        {/* Text */}
                        {/********/}
                        { text && (
                            // <div dangerouslySetInnerHTML={{ __html: text }} style={{ textAlign: "left", width: "100%" }} />
                            <div>
                                {renderHtmlText(text)}
                            </div>
                        )}

                        {/* Image */}
                        {/*********/}
                        { imageUrl && (
                                <img
                                    src={imageUrl}
                                    alt="Image should be placed here. Please check image url!"
                                    style={{
                                        width: "100%", // Make the image take up the full width of the Alert
                                        // height: "auto", // Maintain aspect ratio
                                        marginBottom: "10px",
                                        marginTop: "0.5rem",
                                        borderRadius: "0.375rem",
                                    }}
                                />
                            )
                        }
                    </div>
                </Alert>
            );
        }
    }
}


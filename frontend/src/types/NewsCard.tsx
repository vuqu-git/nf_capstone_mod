import {useState} from "react";
import Alert from 'react-bootstrap/Alert';
import Button from "react-bootstrap/Button";

type props = {
    variant: string,
    description: string
}

export default function NewsCard({variant, description}: props) {
    const [show, setShow] = useState(true);

    if (show) {

        if (variant === "free") {
            return <div dangerouslySetInnerHTML={{__html: description}}/>
        } else {
            return (
                <Alert variant={variant} onClose={() => setShow(false)} dismissible>
                    {/*<Alert.Heading>Oh snap! You got an error!</Alert.Heading>*/}
                    <div dangerouslySetInnerHTML={{__html: description}}/>
                </Alert>
            );
        }
    }
    // return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}


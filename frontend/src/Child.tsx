import {Stack} from "react-bootstrap";
import Button from 'react-bootstrap/Button';


export default function Child() {

    return (
        <div>
            <Stack direction="horizontal" gap={2}>
                <Button as="a" variant="primary">
                    Button as link
                </Button>
                <Button as="a" variant="success">
                    Button as link
                </Button>
            </Stack>
        </div>
    )
}
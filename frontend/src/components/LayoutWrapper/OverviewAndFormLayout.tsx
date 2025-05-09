import {
    type Location,
    Outlet,
    ScrollRestoration,
    type useMatches,
    useNavigation
} from "react-router-dom";

import {Col, Container, Row} from "react-bootstrap";

import BackToTopButton from "../BackToTopButton.tsx";
import Header2 from "../Header2.tsx";
import {useCallback} from "react";

export default function OverviewAndFormLayout() {
    const navigation = useNavigation();

    // You can provide a custom implementation of what "key" should be used to
    // cache scroll positions for a given location.  Using the location.key will
    // provide standard browser behavior and only restore on back/forward
    // navigations.  Using location.pathname will provide more aggressive
    // restoration and will also restore on normal link navigations to a
    // previously-accessed path.  Or - go nuts and lump many pages into a
    // single key (i.e., anything /wizard/* uses the same key)!
    const getKey = useCallback(
        (location: Location, matches: ReturnType<typeof useMatches>) => {
            const match = matches.find((m) => (m.handle as any)?.scrollMode);
            if ((match?.handle as any)?.scrollMode === "pathname") {
                return location.pathname;
            }

            return location.key;
        },
        []
    );

    return (

        <div>
                <Container
                    style={{ width: '100%', margin: '0 auto' }}
                    id="container"
                >
                    <Row className="justify-content-center"> {/* Center the content */}

                        <Col md={12} lg={8} xl={7} className="px-0"> {/* Adjust the column widths for different screen sizes */}
                            {/*px-0 sets both horizontal paddings (left and right) to zero for all breakpoints, including extra small screens*/}
                            {/*To set the left and right padding to zero on your <Col> for extra small screens (less than 576px) in React Bootstrap, use the Bootstrap utility class px-0*/}

                        {/*<Col md={12} lg={8} xl={7} className="px-0 px-sm-3">*/}
                            {/*This approach ensures the column has no left/right padding on screens smaller than 576px, but regains standard padding on larger screens*/}
                            <Outlet />
                        </Col>
                    </Row>
                    <BackToTopButton
                        parentId="container"
                        rightPercent={0.10} // !!!!! 5% inside from parent's right edge !!!!!
                    />
                </Container>

            {/*Including this component ScrollRestoration inside a data router component tree is what enables restoration*/}
            <ScrollRestoration getKey={getKey} />
            
        </div>
    );
}
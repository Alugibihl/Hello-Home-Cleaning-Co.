import * as React from 'react';
import { Html } from '@react-email/html';
import { Container, Img, Text } from '@react-email/components';

export function OwnerConfirmation(props) {
    const { firstName } = props;

    return (
        <Html lang="en">
            <Container>
                <Img src="https://res.cloudinary.com/fpalacios153/image/upload/v1699253003/hhlogo_wqqnyk.png" alt="hhlogo" width="500" height="200" />;
                <h2>Hello,</h2>
                <Text>A new booking request has been requested by {firstName}.
                    <br />
                    More information can be about the request can be found on the website.
                </Text>
            </Container>
        </Html>
    );
}

export default OwnerConfirmation;

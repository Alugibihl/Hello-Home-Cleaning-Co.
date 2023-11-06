import * as React from 'react';
import { Html } from '@react-email/html';
import { Container, Img, Text } from '@react-email/components';

export function ApprovedRequest(props) {
    const { firstName } = props;

    return (
        <Html lang="en">
            <Container>
                <Img src="https://res.cloudinary.com/fpalacios153/image/upload/v1699253003/hhlogo_wqqnyk.png" alt="hhlogo" width="500" height="200" />;
                <h1>Hello {firstName},</h1>
                <Text>
                    <p>Your booking request has been <strong>APPROVED</strong>!</p>
                    <h3>BOOKING REQUEST INFO</h3>
                    <h4>Steps Before Cleaning</h4>
                    <ul>
                        <li>Step 1</li>
                        <li>Step 2</li>
                        <li>Step 3</li>
                        <li>Step 4</li>
                    </ul>
                    <p>
                        <strong>Hello Home Cleaning Co.</strong>
                        <br />hellohomecleaningco@gmail.com
                        <br />Perrysburg, Ohio
                        <br />(419) 208-6265
                    </p>
                </Text>
            </Container>
        </Html>
    );
}
export default ApprovedRequest;

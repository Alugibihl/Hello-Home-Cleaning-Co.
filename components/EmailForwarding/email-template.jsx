import * as React from 'react';
import { Html } from '@react-email/html';
import { Container, Img, Text } from '@react-email/components';

export function EmailConfirmation(props) {
  const { firstName } = props;

  return (
    <Html lang="en">
      <Container>
        <Img src="https://res.cloudinary.com/fpalacios153/image/upload/v1699253003/hhlogo_wqqnyk.png" alt="hhlogo" width="500" height="200" />;
        <h1>Hello {firstName},</h1>
        <Text>This is a confirmation that we have recieved your booking request.
          <br />We will get back to you shortly. Thank you.
          <br />

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

export default EmailConfirmation;

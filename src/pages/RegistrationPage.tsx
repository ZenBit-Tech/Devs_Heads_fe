import React, { FC } from 'react';
import { Div1, H1, P, Div2, Div3, Button, Button2 } from './Registration.styles';

const RegistrationPage: FC = () => {
  return (
    <Div1>
      <H1>Complete your registration</H1>
      <P>Please select your role</P>
      <Div2>
        <P>I want to</P>
        <Div3>
          <Button>Work as a freelancer</Button>
          <Button>Hire for a project</Button>
        </Div3>
        <Button2>Create My Account</Button2>
      </Div2>
    </Div1>
  );
}

export default RegistrationPage;
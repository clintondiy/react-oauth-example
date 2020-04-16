import React, { useState, Fragment } from "react";
import { Card } from "reactstrap";
import { Heading, Text } from "rebass";
import {
  Hero,
  CallToAction,
  ScrollDownIndicator,
  Section,
  Checklist
} from "react-landing-page";
import Footer from "../AppFooter";

import Image from "../../Upload/Workshop.jpeg";

const featherCheckmark = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const Landing = () => {
  return (
    <Fragment>
      <Hero color="black" bg="white" backgroundImage={Image}>
        <Heading fontSize={[5, 6, 7, 8]}>Marshmallow</Heading>
        <Text>Welcome to Marshmallow workshop !</Text>
        <CallToAction href="/signIn" mt={3}>
          Let's Register now!
        </CallToAction>
        <ScrollDownIndicator />
      </Hero>

      <Section
        color="white"
        bg="black"
        width={1}
        heading="Why pick this library?"
        subhead="maybe this will help"
      >
        <Checklist
          children={["Open Source", "React best practices", "Practical API"]}
          checkmark={featherCheckmark}
        />
      </Section>
      <Card>
        <Footer></Footer>
      </Card>
    </Fragment>
  );
};

export default Landing;

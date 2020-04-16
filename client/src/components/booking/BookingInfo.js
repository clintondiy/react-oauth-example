import React, { useState } from "react";
import { Card, CardBody, Container, Button, Collapse } from "reactstrap";
import BookingForm from "./BookingForm";

const BookingInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Container>
      <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }}>
        Toggle
      </Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <BookingForm></BookingForm>
          </CardBody>
        </Card>
      </Collapse>
    </Container>
  );
};

export default BookingInfo;

import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const Message = ({ message, variant }) => {
  const [show, setShow] = useState(true);

  return message.data.errors.map(
    (msg) =>
      show && (
        <Alert variant={variant} onClose={(e) => setShow(!show)} dismissible>
          {msg.msg}
        </Alert>
      )
  );
};

export default Message;

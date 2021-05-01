import axios from "axios";
import React, { useEffect, useState, Fragment } from "react";
import Image from "next/image";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Form,
  Button,
  Col,
  Jumbotron,
  Toast,
  Modal,
} from "react-bootstrap";
import { BlockPicker } from "react-color";
import io from "socket.io-client";

export default function Home() {
  const socket = io();
  const [showModal, setShowModal] = useState(true);
  const [chatBox, setChatBox] = useState("");
  const [localMessages, setLocalMessages] = useState([]);
  const [login, setLogin] = useState({
    username: "",
    color: "#007bff",
    bgColor: "hsla(211.05882352941177, 100%, 95%, 0.85)",
  });
  const [admin, setAdmin] = useState({
    email: "",
    username: "",
    password: "",
    color: "#007bff",
    bgColor: "hsla(211.05882352941177, 100%, 95%, 0.85)",
  });
  const colorset = [
    "#007bff",
    "#6f42c1",
    "#e83e8c",
    "#dc3545",
    "#28a745",
    "#17a2b8",
  ];

  useEffect(() => {
    socket.on("message", handleMessages);
  }, []);

  function handleChatSubmit(event) {
    event.preventDefault();
    const { username, color, bgColor, owner } = login;
    const data = {
      username,
      color,
      bgColor,
      owner,
      message: chatBox,
      date: "01/05/21",
    };

    if (chatBox) {
      socket.emit("message", data);

      setChatBox("");
    }
  }

  function handleLoginSubmit() {
    const { username, color } = login;

    if (username && color) {
      setShowModal(false);
      setLocalMessages([
        ...localMessages,
        {
          username: "🔥 Flamewars bot 🔥",
          color: "hsla(208, 7%, 46%, 1)",
          bgColor: "hsla(208, 7%, 95%, 0.85)",
          owner: false,
          message: `${username} has entered the chat`,
          date: "01/05/21",
        },
      ]);
    }
  }

  function handleMessages(data) {
    const container = document.querySelector(".chat__messages");

    setLocalMessages((state) => [...state, data]);

    container.scrollTo(0, container.scrollHeight);
  }

  function handleChange(event, form) {
    const { name, value } = event.target;

    switch (form) {
      case "user":
        setLogin({
          ...login,
          [name]: value,
        });
        break;

      case "admin":
        setAdmin({
          ...login,
          [name]: value,
        });
        break;

      case "message":
        setChatBox(value);
        break;

      default:
        break;
    }
  }

  function handleColor(color, event) {
    const { hsl } = color;

    setLogin({
      ...login,
      color: color.hex,
      bgColor: `hsla(${hsl.h}, ${hsl.s}%, 90%, 0.9)`,
    });
  }

  return (
    <Fragment>
      {/* <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>

            <Form.Control
              name="username"
              type="text"
              placeholder="Enter your username"
              value={login.username}
              onChange={() => handleChange(event, "user")}
            />
          </Form.Group>

          <Form.Group controlId="color">
            <Form.Label>Color</Form.Label>

            <BlockPicker
              color={login.color}
              colors={colorset}
              onChangeComplete={handleColor}
            />

            <Form.Text className="text-muted">
              This will be the color of your message bubbles.
            </Form.Text>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleLoginSubmit}>
            Enter
          </Button>
        </Modal.Footer>
      </Modal> */}

      <section className="chat">
        <h2>Real time chat</h2>

        <Jumbotron>
          <div className="chat__messages">
            {localMessages.map((msg, index) => (
              <Toast
                key={`message-${index}`}
                className={`chat__bubbles ${
                  msg.username === login.username ? "owner" : ""
                }`}
              >
                <Toast.Header
                  style={{ color: msg.color, backgroundColor: msg.bgColor }}
                >
                  <strong className="mr-auto">{msg.username}</strong>

                  <small>{msg.date}</small>
                </Toast.Header>

                <Toast.Body
                  style={{ color: msg.color, backgroundColor: msg.bgColor }}
                >
                  {msg.message}
                </Toast.Body>
              </Toast>
            ))}
          </div>

          <Form onSubmit={handleChatSubmit}>
            <Form.Row>
              <Col xs={10}>
                <Form.Group controlId="message">
                  <Form.Control
                    type="text"
                    placeholder="Start typing here..."
                    value={chatBox}
                    onChange={() => handleChange(event, "message")}
                  />
                </Form.Group>
              </Col>

              <Col xs={2}>
                <Button variant="primary" type="submit">
                  Send
                </Button>
              </Col>
            </Form.Row>
          </Form>

          <Form.Text className="text-muted">
            To start a votation event, type the command{" "}
            <code>/create option1 option2</code>. To vote between any option,
            type <code>#option1</code> or <code>#option2</code>
          </Form.Text>
        </Jumbotron>
      </section>
    </Fragment>
  );
}

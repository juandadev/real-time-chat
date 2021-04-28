import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import "./Layout.scss";

export default function Layout({ children }) {
  return (
    <Container>
      <header className="header">
        <Navbar expand="lg">
          <Link className="navbar-brand" to="/">
            🔥 Flamewars 🔥
          </Link>

          <Navbar.Toggle aria-controls="navbar" />

          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto">
              <Link className="nav-link mr-3" to="/log-in">
                Log In
              </Link>

              <Link to="/sign-in">
                <Button>Sign In</Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
        Made with 💚 by{" "}
        <a href="https://juanda.dev" target="_blank" rel="noreferrer">
          Juan Daniel Martínez
        </a>
      </footer>
    </Container>
  );
}

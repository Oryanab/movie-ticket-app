import React from 'react';
import { Nav } from 'react-bootstrap';

export default function Navbar() {
  return (
    <Nav activeKey="/home" className="navbar navbar-dark bg-dark pb-0">
      <Nav.Item style={{ display: 'flex', marginLeft: '1vw' }}>
        <Nav.Link style={{ backgroundColor: 'white', margin: '0.2vw' }} href="/">
          Homepage
        </Nav.Link>
        <Nav.Link style={{ backgroundColor: 'white', margin: '0.2vw' }} href="/ticket-panel">
          My Tickets
        </Nav.Link>
      </Nav.Item>
      <Nav.Item style={{ color: 'white', marginLeft: '-6vw' }}>
        <h5>Movie Ticket App</h5>
      </Nav.Item>
      <Nav.Item style={{ display: 'flex', marginRight: '4vw' }}>
        <Nav.Link
          style={{ backgroundColor: 'white', margin: '0.2vw' }}
          target="blank"
          href="https://github.com/Oryanab/movie-ticket-app"
        >
          Github
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

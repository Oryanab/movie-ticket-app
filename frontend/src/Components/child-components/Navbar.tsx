import React from 'react';
import { Nav, Container, Row, Col } from 'react-bootstrap';

export default function Navbar() {
  return (
    // <Nav
    //   style={{
    //     backgroundColor: '#ff0000',
    //     backgroundImage: 'linear-gradient(315deg, #d9d9d9 0%, #f6f2f2 74%)',
    //     padding: '2vh',
    //   }}
    //   defaultActiveKey="/home"
    //   as="ul"
    // >
    //   <Container>
    //     <Row>
    //       <Col xs={2} style={{ marginLeft: '-15vw' }}>
    //         <div style={{ display: 'flex' }}>
    //           <Nav.Item
    //             style={{
    //               backgroundColor: 'white',
    //               padding: '0.5vh',
    //               fontSize: '2vh',
    //               fontWeight: 'bold',
    //               border: '0.2vh solid black',
    //               textAlign: 'center',
    //             }}
    //             as="li"
    //           >
    //             <Nav.Link href="/home">Active</Nav.Link>
    //           </Nav.Item>
    //           <Nav.Item
    //             style={{
    //               backgroundColor: 'white',
    //               padding: '0.5vh',
    //               fontSize: '2vh',
    //               fontWeight: 'bold',
    //               border: '0.2vh solid black',
    //               textAlign: 'center',
    //             }}
    //             as="li"
    //           >
    //             <Nav.Link href="/home">Active</Nav.Link>
    //           </Nav.Item>
    //         </div>
    //       </Col>
    //       <Col>
    //         <Nav.Item
    //           style={{
    //             padding: '0.5vh',
    //             fontSize: '2vh',
    //             fontWeight: 'bold',
    //             textAlign: 'center',
    //           }}
    //           as="li"
    //         >
    //           <h1>Movie Ticket App</h1>
    //         </Nav.Item>
    //       </Col>
    //       <Col xs={2} style={{ marginRight: '-20vw' }}>
    //         <Nav.Item
    //           style={{
    //             backgroundColor: 'white',
    //             padding: '0.5vh',
    //             fontSize: '2vh',
    //             fontWeight: 'bold',
    //             border: '0.2vh solid black',
    //             textAlign: 'center',
    //           }}
    //           as="li"
    //         >
    //           <Nav.Link eventKey="link-2">Link</Nav.Link>
    //         </Nav.Item>
    //       </Col>
    //     </Row>
    //   </Container>
    // </Nav>
    // <nav style={{ display: 'flex' }} className="navbar navbar-dark bg-dark pb-0">
    //   <i style={{ display: 'flex' }} className="navbar-brand mx-auto text-center">
    //     <div>Movie Ticket App</div>
    //     <div>Movie Ticket App</div>
    //     <div>Movie Ticket App</div>
    //   </i>
    //   <i className="navbar-brand mx-auto text-center">
    //     <div>Movie Ticket App</div>
    //   </i>
    // </nav>
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

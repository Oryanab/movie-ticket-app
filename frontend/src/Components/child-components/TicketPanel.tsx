// Imports
import React, { useState } from 'react';
import { singleTicket } from '../../Utils/movieUtils';
import { singleMovie } from '../../Utils/movieUtils';
import { Button, Form, Badge } from 'react-bootstrap';

export default function TicketPanel() {
  // Seats
  const [allSeats, setAllSeats] = useState<Array<string>>(
    singleMovie.available_sits.concat(singleMovie.taken_sits).sort()
  );
  const [selectedSeats, setSelectedSeats] = useState<string[]>(singleTicket.seats);

  // Form
  const [userOrderId, setUserOrderId] = useState<string>('');
  const [userAction, setUserAction] = useState<string>('Cancel Ticket');
  //const [userEmail, setUserEmail] = useState<string>(singleTicket.email);
  //   const [userFullName, setUserFullName] = useState<string>(singleTicket.full_name);
  //   const [userVerificationKey, setUserVerificationKey] = useState<string>('');

  // Flags
  const [showSections, setShowSections] = useState<string>('none');
  const [showVerificationSection, setShowVerificationSection] = useState<string>('none');

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div
        id="seats-selection"
        style={{ backgroundColor: 'white', padding: '5vw', margin: '1vw', borderRadius: '1vh', width: '50%' }}
      >
        <h2>Please Enter Your Order ID:</h2>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Order Id:</Form.Label>
            <Form.Control
              onChange={e => setUserOrderId(e.target.value)}
              type="text"
              placeholder="********-****-****-****-************"
            />
            <Button
              onClick={e => {
                if (userOrderId.length !== 36) alert('invalid');
                else setShowSections('block');
              }}
              style={{ marginTop: '2vh' }}
              variant="outline-primary"
            >
              Check Order
            </Button>
          </Form.Group>
        </Form>
        <div style={{ display: showSections }}>
          <h2>Choose Seat</h2>
          <div style={{ display: 'inline-grid', gridTemplateColumns: 'auto auto auto auto auto auto auto auto' }}>
            <>
              {allSeats.map((seat: string) => {
                const taken_sits: Array<string> = singleMovie.taken_sits;
                const user_sits: Array<string> = singleTicket.seats;
                const [cursor, setCursor] = useState(taken_sits.includes(seat) ? 'not-allowed' : 'pointer');
                const [background, setBackground] = useState(
                  user_sits.includes(seat) ? 'orange' : taken_sits.includes(seat) ? 'red' : 'blue'
                );
                const handleClick = (e: React.MouseEvent<HTMLElement>) => {
                  if (taken_sits.includes(seat) && !user_sits.includes(seat)) alert('taken');
                  else {
                    if (background === 'blue' && selectedSeats.length < user_sits.length) {
                      setSelectedSeats([...selectedSeats, seat]);
                      setBackground('green');
                    } else {
                      setSelectedSeats([...selectedSeats.filter(n => n !== seat)]);
                      setBackground('blue');
                    }
                  }
                };
                return (
                  <div
                    style={{
                      cursor: cursor,
                      padding: '0.3vw',
                      margin: '0.2vw',
                      backgroundColor: background,
                      borderRadius: '50%',
                      color: 'white',
                      border: 'solid 0.5vh black',
                    }}
                    onClick={e => {
                      handleClick(e);
                    }}
                    key={seat}
                    id={seat}
                  >
                    {seat}
                  </div>
                );
              })}
            </>
          </div>
          <br />
        </div>
      </div>
      <div style={{ backgroundColor: 'white', padding: '5vw', margin: '1vw', borderRadius: '1vh', width: '50%' }}>
        <h1>Tickets Info:</h1>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              Order Number: <b>{singleTicket.secret_key}</b>
            </Form.Label>{' '}
            <br />
            <Form.Label>
              Date Purchased: <b>{new Date(singleTicket.purchase_date).toLocaleDateString()}</b>
            </Form.Label>
            <br />
            <Form.Label>
              Total Cost: <b>{Number(singleMovie.price) * singleTicket.seats.length}</b>
            </Form.Label>
            <br />
            <Form.Label>
              Selected Seats:{' '}
              <>
                {selectedSeats.map(seat => (
                  <Badge key={seat} bg="secondary">
                    {seat}
                  </Badge>
                ))}
              </>
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <div style={{ display: showSections }}>
              <h5>Select Action:</h5>
              <Form.Select onChange={e => setUserAction(e.target.value)} size="sm">
                <option>Cancel Ticket</option>
                <option>Change Seats</option>
              </Form.Select>
              <br />
              <h5>Verify Email for Updated Receipt:</h5>
              <Form.Label>
                Full Name: <b>{singleTicket.full_name}</b>
              </Form.Label>{' '}
              <br />
              <Form.Label>
                Email Address: <b>{singleTicket.email}</b>
              </Form.Label>{' '}
              <br />
              <Button
                onClick={e => {
                  setShowVerificationSection('block');
                }}
                variant="outline-primary"
              >
                Send Verification Key to {singleTicket.email}
              </Button>
            </div>
            <br />
            <div style={{ display: showVerificationSection }}>
              <Form.Label>
                We have send a Verification code to {singleTicket.email}, please paste the code to verify your email
                address:
              </Form.Label>
              <Form.Control type="text" placeholder="paste your Verification code" />
              <Button variant="outline-primary" style={{ marginTop: '2vh' }}>
                Verify & Complete Action
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

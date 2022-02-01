import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { singleMovie } from '../../Utils/movieUtils';
import { Container, Row, Col, Button, Form, Badge } from 'react-bootstrap';

export default function SingleMoviePage() {
  const link = window.location.pathname.split('/')[2];
  // Seats
  const [allSeats, setAllSeats] = useState<Array<string>>(
    singleMovie.available_sits.concat(singleMovie.taken_sits).sort()
  );
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  // Form
  const [userEmail, setUserEmail] = useState<string>('');
  const [userFullName, setUserFullName] = useState<string>('');
  const [userAge, setUserAge] = useState<number>(0);
  const [userVerificationKey, setUserVerificationKey] = useState<string>('');
  const [userNationalId, setUserNationalId] = useState<string>('');
  const [userCreditCardNumber, setUserCreditCardNumber] = useState<string>('');
  const [userCardExpirationDate, setUserCardExpirationDate] = useState<string>('');
  const [userCcv, setUserCcv] = useState<string>('');

  // Flags
  const [showVerificationSection, setShowVerificationSection] = useState<string>('none');
  const [showPaymentSection, setShowPaymentSection] = useState<string>('none');

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'white', padding: '5vw', margin: '1vw', borderRadius: '1vh', width: '50%' }}>
        <h2>Choose Seat</h2>
        <div style={{ display: 'inline-grid', gridTemplateColumns: 'auto auto auto auto auto auto auto auto' }}>
          <>
            {allSeats.map((seat: string) => {
              const taken_sits: Array<string> = singleMovie.taken_sits;
              const [cursor, setCursor] = useState(taken_sits.includes(seat) ? 'not-allowed' : 'pointer');
              const [background, setBackground] = useState(taken_sits.includes(seat) ? 'red' : 'blue');
              const handleClick = (e: React.MouseEvent<HTMLElement>) => {
                if (taken_sits.includes(seat)) alert('taken');
                else {
                  if (background !== 'green') {
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
      <div style={{ backgroundColor: 'white', padding: '5vw', margin: '1vw', borderRadius: '1vh', width: '50%' }}>
        <h1>Details:</h1>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              <img src={singleMovie.img} height="200vh" alt={singleMovie.img} />
            </Form.Label>{' '}
            <h4>General info:</h4>
            <Form.Label>
              Title: <b>{singleMovie.movie_title}</b>
            </Form.Label>{' '}
            <br />
            <Form.Label>
              Date: <b>{new Date(singleMovie.movie_date).toLocaleDateString()}</b>
            </Form.Label>
            <br />
            <Form.Label>
              Hour: <b>{singleMovie.time_start}</b>
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
            <br />
            <Form.Label>
              Price (1 unit): <b>{singleMovie.price}</b>
            </Form.Label>
            <br />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <div style={{ display: selectedSeats.length > 0 ? 'block' : 'none' }}>
              <h5>Verify Email for Receipt:</h5>
              <Form.Label>Full Name:</Form.Label>
              <Form.Control onChange={e => setUserFullName(e.target.value)} type="text" placeholder="full name" />
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={e => setUserEmail(e.target.value)} type="email" placeholder="name@example.com" />
              <Form.Label>Age (cannot purchase if not over 18:)</Form.Label>
              <Form.Control onChange={e => setUserAge(Number(e.target.value))} type="number" placeholder="your age" />
              <Button
                style={{ marginTop: '2vh' }}
                onClick={e => {
                  e.preventDefault();
                  if (userAge > 18) {
                    alert(`${userEmail} + ${userFullName} +${userAge}`);
                    setShowVerificationSection('block');
                  } else {
                    alert('too young');
                    setShowPaymentSection('none');
                  }
                }}
                variant="outline-primary"
              >
                Send Verification Key to {userEmail}
              </Button>
            </div>
            <br />
            <div style={{ display: showVerificationSection }}>
              <Form.Label>
                We have send a Verification code to {userEmail}, please paste the code to verify your email address:
              </Form.Label>
              <Form.Control
                onChange={e => setUserVerificationKey(e.target.value)}
                type="text"
                placeholder="paste your Verification code"
              />
              <Button
                onClick={e => {
                  userVerificationKey.length > 0 ? setShowPaymentSection('block') : setShowPaymentSection('none');
                }}
                variant="outline-primary"
                style={{ marginTop: '2vh' }}
              >
                Verify
              </Button>
            </div>
            <div style={{ marginTop: '2vh', display: showPaymentSection }}>
              <h5>Purchase Cards:</h5>
              <Form.Label>
                Total Cost: <b>{Number(singleMovie.price) * selectedSeats.length}</b>
              </Form.Label>
              <br />
              <Form.Label>National Id:</Form.Label>
              <Form.Control
                onChange={e => setUserNationalId(e.target.value)}
                type="text"
                placeholder="enter your national id"
              />
              <Form.Label>Credit Card Number:</Form.Label>
              <Form.Control
                onChange={e => setUserCreditCardNumber(e.target.value)}
                type="text"
                placeholder="**** **** **** ****"
              />
              <Form.Label>Card Expiration Date:</Form.Label>
              <Form.Control onChange={e => setUserCardExpirationDate(e.target.value)} type="text" placeholder="**/**" />
              <Form.Label>CCV:</Form.Label>
              <Form.Control onChange={e => setUserCcv(e.target.value)} type="text" placeholder="***" />
              <Button variant="outline-primary" style={{ marginTop: '2vh' }}>
                Complete Purchase
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

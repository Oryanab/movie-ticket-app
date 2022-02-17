// Imports
import React, { useEffect, useState } from 'react';
//import { singleTicket } from '../../Utils/movieUtils';
//import { singleMovie } from '../../Utils/movieUtils';
import { Button, Form, Badge } from 'react-bootstrap';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../Redux/Types/storeTypes';
import { Tickets } from '../../Redux/Types/generalTypes';
import { getSingleMovie } from '../../Redux/Actions/singleMovieReducerActions';
import { getSingleTicket } from '../../Redux/Actions/singleTicketReducerActions';

export default function TicketPanel() {
  const Dispatch = useDispatch();
  const singleTicket = useSelector((state: State) => state.singleTicketR);
  const singleMovie = useSelector((state: State) => state.singleMovieR);
  // Form
  const [userOrderId, setUserOrderId] = useState<string>('');
  const [userAction, setUserAction] = useState<string>('Cancel Ticket');

  // Flags
  const [showSeatSection, setShowSeatSections] = useState<string>('none');
  const [showCancellationSection, setShowCancellationSection] = useState<string>('none');
  const [showVerificationSection, setShowVerificationSection] = useState<string>('none');
  const [showInitialInfo, setShowInitialInfo] = useState<string>('none');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const getTicketDetails = (e: React.MouseEvent<HTMLElement>) => {
    Dispatch(getSingleTicket(userOrderId));
    const response = axios
      .get(`http://localhost:4000/api/tickets/view-ticket-details/${userOrderId}`)
      .then((res: any) => {
        setSelectedSeats(res.data.message.seats);
        Dispatch(getSingleMovie(res.data.message.movie_id));
        setShowInitialInfo('block');
      });
  };

  // Functions

  const sendVerificationEmail = async () => {
    if (
      userAction === 'Change Seats' &&
      selectedSeats.length === singleTicket.seats.length &&
      selectedSeats.sort().toString() == singleTicket.seats.sort().toString()
    ) {
      alert('must select the amount of seats at in in your receipt, at least one must be different!');
      return;
    }
    const sendMail = await axios.post('http://localhost:4000/api/tickets/get-verification', {
      full_name: singleTicket.full_name,
      email: singleTicket.email,
      age: 20,
    });

    alert(sendMail.data.message);
  };

  const [userVerificationKey, setUserVerificationKey] = useState<string>('');
  // const verifyVerificationCode = async () => {
  //   const returnedData = await axios.post(
  //     'http://localhost:4000/api/tickets/verify',
  //     {
  //       full_name: singleTicket.full_name,
  //       email: singleTicket.email,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${userVerificationKey}`,
  //       },
  //     }
  //   );
  //   alert(returnedData.data.message);
  // };

  const commitTicketCancellation = async (authKey: string) => {
    const response = await axios.post(
      'http://localhost:4000/api/tickets/cancel-ticket',
      {
        movieId: singleTicket.movie_id,
        full_name: singleTicket.full_name,
        email: singleTicket.email,
        seats: singleTicket.seats,
        orderId: singleTicket.secret_key,
      },
      {
        headers: {
          Authorization: `Bearer ${authKey}`,
        },
      }
    );
    alert(response.data.message);
  };

  const commitTicketChangeSeat = async (authKey: string) => {
    const response = await axios.put(
      'http://localhost:4000/api/tickets/change-seat',
      {
        movie_id: singleTicket.movie_id,
        full_name: singleTicket.full_name,
        email: singleTicket.email,
        prevSeats: singleTicket.seats,
        seats: selectedSeats,
        orderId: singleTicket.secret_key,
      },
      {
        headers: {
          Authorization: `Bearer ${authKey}`,
        },
      }
    );
    alert(response.data.message);
  };

  const commitUserAction = async (authKey: string) => {
    switch (userAction) {
      case 'Cancel Ticket':
        commitTicketCancellation(authKey);
        break;
      case 'Change Seats':
        commitTicketChangeSeat(authKey);
        break;
      default:
        return;
    }
  };

  // Seats
  const allSeats = [...singleMovie.taken_sits, ...singleMovie.available_sits].sort();
  console.log(Number(singleTicket.price) * singleTicket.seats.length);
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
              onClick={(e: any) => {
                if (userOrderId.length !== 36) alert('invalid');
                else getTicketDetails(e.target.value);
              }}
              style={{ marginTop: '2vh' }}
              variant="outline-primary"
            >
              Check Order
            </Button>
          </Form.Group>
        </Form>
        <div style={{ display: showSeatSection }}>
          <h2>Choose Seat</h2>
          <div style={{ display: 'inline-grid', gridTemplateColumns: 'auto auto auto auto auto auto auto auto' }}>
            <>
              {singleMovie &&
                allSeats.map((seat: string) => {
                  if (seat === 'undefined') return;
                  const taken_sits: Array<string> = singleMovie.taken_sits;
                  const user_sits: Array<string> = singleTicket.seats;
                  const cursor = singleMovie.taken_sits.includes(seat) ? 'not-allowed' : 'pointer';
                  const background = user_sits.includes(seat) ? 'orange' : taken_sits.includes(seat) ? 'red' : 'blue';

                  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
                    if (taken_sits.includes(seat) && !user_sits.includes(seat)) alert('taken');
                    else {
                      if (background === 'blue' && selectedSeats.length < user_sits.length) {
                        setSelectedSeats([...selectedSeats, seat]);
                        document.getElementById(seat)!.style.backgroundColor = 'green';
                      } else {
                        setSelectedSeats([...selectedSeats.filter(n => n !== seat)]);
                        document.getElementById(seat)!.style.backgroundColor = 'blue';
                        document.getElementById(seat)!.style.cursor = 'pointer';
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
      <div
        style={{
          display: showInitialInfo,
          backgroundColor: 'white',
          padding: '5vw',
          margin: '1vw',
          borderRadius: '1vh',
          width: '50%',
        }}
      >
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
              Total Cost: <b>{Number(singleTicket.price) * singleTicket.seats.length}</b>
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
            <h5>Select Action:</h5>
            <Form.Select
              onChange={e => {
                setUserAction(e.target.value);
                switch (e.target.value) {
                  case 'Cancel Ticket':
                    setShowCancellationSection('block');
                    setShowSeatSections('none');
                    break;
                  case 'Change Seats':
                    setShowSeatSections('block');
                    setShowCancellationSection('block');
                    break;
                  default:
                    return;
                }
              }}
              size="sm"
            >
              <option></option>
              <option>Cancel Ticket</option>
              <option>Change Seats</option>
            </Form.Select>
            <br />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <div style={{ display: showCancellationSection }}>
              <h5>Verify Email for Updated Receipt/Cancellation:</h5>
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
                  sendVerificationEmail();
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
              <Form.Control
                onChange={e => setUserVerificationKey(e.target.value)}
                type="text"
                placeholder="paste your Verification code"
              />
              <Button
                onClick={e => commitUserAction(userVerificationKey)}
                variant="outline-primary"
                style={{ marginTop: '2vh' }}
              >
                Verify & Complete Action
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

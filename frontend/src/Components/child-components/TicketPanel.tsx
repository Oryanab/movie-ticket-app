// Imports
import React, { useState } from 'react';
import { Button, Form, Badge } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../Redux/Types/storeTypes';
import { getSingleMovie } from '../../Redux/Actions/singleMovieReducerActions';
import { getSingleTicket } from '../../Redux/Actions/singleTicketReducerActions';
import { useNavigate } from 'react-router';
import { Notyf } from 'notyf';

export default function TicketPanel() {
  const navigate = useNavigate();
  const notyf = new Notyf();
  function navigateToThankYouPage() {
    navigate('/thank-you');
  }
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

  const [selectedSeats, setSelectedSeats] = useState<string[]>(singleTicket && [...singleTicket.seats]);

  const getTicketDetails = (e: React.MouseEvent<HTMLElement>) => {
    Dispatch(getSingleTicket(userOrderId));
    try {
      const response = axios
        .get(`http://localhost:4000/api/tickets/view-ticket-details/${userOrderId}`)
        .then((res: any) => {
          try {
            setSelectedSeats(res.data.message.seats);
            Dispatch(getSingleMovie(res.data.message.movie_id));
            setShowInitialInfo('block');
            notyf.success(`Success, Welcome back ${res.data.message.full_name}`);
          } catch (err) {
            notyf.error('This order id is in invalid');
          }
        });
    } catch (err) {
      notyf.error('This order id is in invalid');
    }
  };

  // Functions

  const sendVerificationEmail = async () => {
    if (
      userAction === 'Change Seats' &&
      selectedSeats.length === singleTicket.seats.length &&
      selectedSeats.sort().toString() == singleTicket.seats.sort().toString()
    ) {
      notyf.error('must select the amount of seats at in in your receipt, at least one must be different!');
      return;
    }
    const sendMail = await axios.post('http://localhost:4000/api/tickets/get-verification', {
      full_name: singleTicket.full_name,
      email: singleTicket.email,
      age: 20,
    });
    setShowVerificationSection('block');
    notyf.success(sendMail.data.message);
  };

  const [userVerificationKey, setUserVerificationKey] = useState<string>('');

  // Functions
  function createCookie(name: string, value: string, minutes: number) {
    let expires;
    if (minutes) {
      const date = new Date();
      date.setTime(date.getTime() + minutes * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    } else {
      expires = '';
    }
    document.cookie = name + '=' + value + expires + ';';
  }

  const commitTicketCancellation = async (authKey: string) => {
    try {
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
      createCookie('tickets', authKey, 10);
      notyf.success(response.data.message);
      navigateToThankYouPage();
    } catch (err) {
      notyf.error('This action is only valid 48 hours in before your movie starts');
      notyf.error('otherwise, make sure you have inserted your verification code correctly');
    }
  };

  const commitTicketChangeSeat = async (authKey: string) => {
    try {
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
      createCookie('tickets', authKey, 10);
      notyf.success(response.data.message);
      navigateToThankYouPage();
    } catch (err) {
      notyf.error('Make sure you have inserted your verification code correctly');
    }
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

  // Seats singleTicket &&
  const allSeats = [...singleMovie.taken_sits, ...singleMovie.available_sits].sort();
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
                if (userOrderId.length !== 36) notyf.error('invalid order ID');
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
                    if (taken_sits.includes(seat) && !user_sits.includes(seat)) notyf.error(`seat ${seat} is taken`);
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
              Order Number: <b>{singleTicket && singleTicket.secret_key}</b>
            </Form.Label>{' '}
            <br />
            <Form.Label>
              Date Purchased: <b>{singleTicket && new Date(singleTicket.purchase_date).toLocaleDateString()}</b>
            </Form.Label>
            <br />
            <Form.Label>
              Total Cost: <b>{singleTicket && Number(singleTicket.price) * singleTicket.seats.length}</b>
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
                Full Name: <b>{singleTicket && singleTicket.full_name}</b>
              </Form.Label>{' '}
              <br />
              <Form.Label>
                Email Address: <b>{singleTicket && singleTicket.email}</b>
              </Form.Label>{' '}
              <br />
              <Button
                onClick={e => {
                  sendVerificationEmail();
                }}
                variant="outline-primary"
              >
                Send Verification Key to {singleTicket && singleTicket.email}
              </Button>
            </div>
            <br />
            <div style={{ display: showVerificationSection }}>
              <Form.Label>
                We have send a Verification code to {singleTicket && singleTicket.email}, please paste the code to
                verify your email address:
              </Form.Label>
              <Form.Control
                onChange={e => setUserVerificationKey(e.target.value)}
                type="text"
                placeholder="paste your Verification code"
              />
              <Button
                onClick={e => {
                  commitUserAction(userVerificationKey);
                }}
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

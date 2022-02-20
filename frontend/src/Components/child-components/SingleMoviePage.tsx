import React, { useState, useEffect } from 'react';
import { Button, Form, Badge } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../Redux/Types/storeTypes';
import { getSingleMovie } from '../../Redux/Actions/singleMovieReducerActions';
import { Movies } from '../../Redux/Types/moviesReducerTypes';
import { useNavigate } from 'react-router';
import { Notyf } from 'notyf';

export default function SingleMoviePage() {
  const link = window.location.pathname.split('/')[2];
  const notyf = new Notyf();
  const navigate = useNavigate();
  function navigateToThankYouPage() {
    navigate('/thank-you');
  }

  //Seats;
  const singleMovie: Movies = useSelector((state: State) => state.singleMovieR);
  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(getSingleMovie(link));
  }, []);

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
  const entireSeatsArray = [...singleMovie.taken_sits, ...singleMovie.available_sits].sort();

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

  function getCookie(cname: string) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  const sendVerificationEmail = async () => {
    if (userEmail.length === 0 || userFullName.length === 0) {
      notyf.error('must insert full name, email and age');
      return;
    }
    const sendMail = await axios.post('http://localhost:4000/api/tickets/get-verification', {
      full_name: userFullName,
      email: userEmail,
      age: userAge,
    });
    notyf.success(sendMail.data.message);
  };

  const verifyVerificationCode = async () => {
    try {
      const returnedData = await axios.post(
        'http://localhost:4000/api/tickets/verify',
        {
          full_name: userFullName,
          email: userEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${userVerificationKey}`,
          },
        }
      );
      notyf.success(returnedData.data.message);
      createCookie('tickets', returnedData.data.process_token, 10);
      setShowPaymentSection('block');
    } catch (err: any) {
      setShowPaymentSection('none');
      notyf.error('invalid verification code');
    }
  };

  const sendPaymentDetails = async () => {
    try {
      const returnedData = await axios.post(
        'http://localhost:4000/api/tickets/purchase-ticket',
        {
          full_name: userFullName,
          movie_id: link,
          email: userEmail,
          movie_title: singleMovie.movie_title,
          seats: selectedSeats,
          price: singleMovie.price,
          movie_date: singleMovie.movie_date,
          time_start: singleMovie.time_start,
          card_number: userCreditCardNumber,
          card_expiration_date: userCardExpirationDate,
          national_id: userNationalId,
          ccv: userCcv,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie('tickets')}`,
          },
        }
      );
      notyf.success(returnedData.data.message);
      navigateToThankYouPage();
    } catch (err) {
      notyf.error('invalid payment details');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'white', padding: '5vw', margin: '1vw', borderRadius: '1vh', width: '50%' }}>
        <h2>Choose Seat</h2>
        <div style={{ display: 'inline-grid', gridTemplateColumns: 'auto auto auto auto auto auto auto auto' }}>
          <>
            {singleMovie
              ? entireSeatsArray.map((seat: string) => {
                  if (seat === 'undefined') return;
                  const taken_sits: Array<string> = singleMovie.taken_sits;
                  const cursor = singleMovie.taken_sits.includes(seat) ? 'not-allowed' : 'pointer';
                  const background = singleMovie.taken_sits.includes(seat) ? 'red' : 'blue';
                  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
                    if (taken_sits.includes(seat)) notyf.error(`seat ${seat} is taken`);
                    else {
                      if (document.getElementById(seat)!.style.backgroundColor !== 'green') {
                        if (!selectedSeats.includes(seat)) setSelectedSeats([...selectedSeats, seat]);
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
                })
              : 'loading...'}
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
              <i>Title:</i> <b>{singleMovie.movie_title}</b>
            </Form.Label>{' '}
            <br />
            <Form.Label>
              <i>Watch Trailer:</i>{' '}
              <a href={singleMovie.trailer} target={'blank'}>
                Trailer
              </a>
            </Form.Label>{' '}
            <br />
            <Form.Label>
              <i>Genre:</i> <b>{singleMovie.genres.toString()}</b>
            </Form.Label>{' '}
            <br />
            <Form.Label>
              <i>Description:</i> <p>{singleMovie.description}</p>
            </Form.Label>{' '}
            <br />
            <Form.Label>
              <i>Date:</i> <b>{new Date(singleMovie.movie_date).toLocaleDateString()}</b>
            </Form.Label>
            <br />
            <Form.Label>
              <i>Starting At:</i> <b>{singleMovie.time_start}</b>
            </Form.Label>
            <br />
            <Form.Label>
              <i>Selected Seats:</i>{' '}
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
              <i>Price (1 unit):</i> <b>{singleMovie.price} ILS</b>
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
                    sendVerificationEmail();

                    setShowVerificationSection('block');
                  } else {
                    notyf.error('sorry, must be over 18 to order ticket');
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
                  verifyVerificationCode();
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
                Total Cost: <b>{Number(singleMovie.price) * selectedSeats.length}ILS</b>
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
              <Form.Control onChange={e => setUserCardExpirationDate(e.target.value)} type="text" placeholder="MM/YY" />
              <Form.Label>CCV:</Form.Label>
              <Form.Control onChange={e => setUserCcv(e.target.value)} type="text" placeholder="***" />
              <Button
                onClick={e => {
                  sendPaymentDetails();
                }}
                variant="outline-primary"
                style={{ marginTop: '2vh' }}
              >
                Complete Purchase
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

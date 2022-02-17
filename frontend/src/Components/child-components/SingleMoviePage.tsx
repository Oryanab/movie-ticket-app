import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
//import { singleMovie } from '../../Utils/movieUtils';
import { Container, Row, Col, Button, Form, Badge } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../Redux/Types/storeTypes';
import { getSingleMovie } from '../../Redux/Actions/singleMovieReducerActions';
import { Movies } from '../../Redux/Types/moviesReducerTypes';

export default function SingleMoviePage() {
  const link = window.location.pathname.split('/')[2];

  //Seats;
  const singleMovie: Movies = useSelector((state: State) => state.singleMovieR);
  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(getSingleMovie(link));
    //setAllSeats(prevState => [...prevState, ...singleMovie.taken_sits, ...singleMovie.available_sits]);
  }, []);

  ///setAllSeats(singleMovie.available_sits.concat(singleMovie.taken_sits).sort());
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
  const arr = [...singleMovie.taken_sits, ...singleMovie.available_sits].sort();

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
      alert('must insert full name, email and age');
      return;
    }
    const sendMail = await axios.post('http://localhost:4000/api/tickets/get-verification', {
      full_name: userFullName,
      email: userEmail,
      age: userAge,
    });
    alert(sendMail.data.message);
  };

  const verifyVerificationCode = async () => {
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
    alert(returnedData.data.message);
    createCookie('tickets', returnedData.data.process_token, 10);
  };

  const sendPaymentDetails = async () => {
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
    alert(returnedData.data.message);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'white', padding: '5vw', margin: '1vw', borderRadius: '1vh', width: '50%' }}>
        <h2>Choose Seat</h2>
        <div style={{ display: 'inline-grid', gridTemplateColumns: 'auto auto auto auto auto auto auto auto' }}>
          <>
            {singleMovie
              ? arr.map((seat: string) => {
                  if (seat === 'undefined') return;
                  const taken_sits: Array<string> = singleMovie.taken_sits;
                  const cursor = singleMovie.taken_sits.includes(seat) ? 'not-allowed' : 'pointer';
                  const background = singleMovie.taken_sits.includes(seat) ? 'red' : 'blue';
                  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
                    if (taken_sits.includes(seat)) alert('taken');
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
                    sendVerificationEmail();

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

import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { singleMovie } from '../../Utils/movieUtils';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function SingleMoviePage() {
  const link = window.location.pathname.split('/')[2];
  const [allSeats, setAllSeats] = useState<Array<string>>(
    singleMovie.available_sits.concat(singleMovie.taken_sits).sort()
  );
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  console.log(selectedSeats);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'white', padding: '5vw', margin: '1vw', borderRadius: '1vh', width: '50%' }}>
        <h1>Choose Seat</h1>
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
        <h1>Form</h1>
      </div>
    </div>
  );
}

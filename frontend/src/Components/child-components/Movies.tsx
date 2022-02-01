import React, { useState } from 'react';
import { Card, ListGroupItem, ListGroup, Form, Button } from 'react-bootstrap';
import { Movies } from '../../Redux/Types/generalTypes';
import { movies, createUniqueMovieItemArray, createUniqueMovieDateArray } from '../../Utils/movieUtils';
interface TimeObject {
  time_start: string;
  movieId: string;
}

export default function Movie() {
  const [selectedDate, setSelectedDate] = useState({});
  const [availableHours, setAvailableHours] = useState({});
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <>
        {createUniqueMovieItemArray(movies).map(movie => (
          <>
            <Card key={movie.data!.movieId} style={{ width: '18rem', margin: '3vw' }}>
              <Card.Img variant="top" height={'250px'} src={movie.data!.img} />
              <Card.Body>
                <Card.Title>{movie.data!.movie_title}</Card.Title>
                <Card.Text>
                  {movie.data!.description.substr(1, 100)}...
                  <>
                    <a href=""> Continue Reading</a>
                  </>
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <a href={movie.data!.trailer} target={'blank'}>
                    Trailer
                  </a>
                </ListGroupItem>
                <ListGroupItem>Genre: {movie.data!.genres.toString()}</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <p style={{ marginTop: '-1vh' }}>Choose date/time:</p>
                <Form.Control
                  style={{ marginTop: '-1vh' }}
                  onChange={e => {
                    setSelectedDate(new Date(e.target.value).toLocaleDateString());
                  }}
                  size="sm"
                  type="date"
                  placeholder="Small text"
                />
                <Form.Select style={{ marginTop: '1vh' }} size="sm">
                  <>
                    {createUniqueMovieDateArray(movie).forEach(item => {
                      if (new Date(item.key).toLocaleDateString() === selectedDate) {
                        item.value.map((time: TimeObject) => {
                          console.log(time.time_start);
                          return <option key={time.movieId}>{time.time_start}</option>;
                        });
                      }
                    })}
                  </>
                </Form.Select>
                <Button style={{ marginTop: '1vh', fontSize: '1.6vh' }} variant="primary">
                  Get Tickets
                </Button>
              </Card.Body>
            </Card>
          </>
        ))}
      </>
    </div>
  );
}

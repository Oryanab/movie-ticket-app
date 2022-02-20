import { AnyRecord } from 'dns';
import React, { useState, useEffect } from 'react';
import { Card, ListGroupItem, ListGroup, Form, Button } from 'react-bootstrap';
import { Movies, TimeObject, DateItem } from '../../Redux/Types/generalTypes';
import { createUniqueMovieItemArray, createUniqueMovieDateArray } from '../../Utils/movieUtils';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../Redux/Types/storeTypes';
import { getMoviesList } from '../../Redux/Actions/moviesReducerActions';
//import { movies } from '../../Utils/movieUtils';

// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { State } from '../../Redux/Types/storeTypes';
// const Dispatch = useDispatch();
// const students = useSelector((state: State) => state.students);

export default function Movie() {
  // Reducer States:
  const Dispatch = useDispatch();
  const movies = useSelector((state: State) => state.moviesList);
  useEffect(() => {
    Dispatch(getMoviesList());
  }, []);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toLocaleDateString());
  const initialAvailableHours = [{ time_start: '', movieId: 'undefined' }];
  const [availableHours, setAvailableHours] = useState<Array<TimeObject>>(initialAvailableHours);
  const [movieId, setMovieId] = useState<string>('');
  console.log(movies);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <>
        {createUniqueMovieItemArray(movies).map(movie => (
          <>
            <Card id={movie.data!.movie_title} key={movie.data!.movie_title} style={{ width: '18rem', margin: '3vw' }}>
              <Card.Img variant="top" height={'250px'} src={movie.data!.img} />
              <Card.Body>
                <Card.Title>{movie.data!.movie_title}</Card.Title>
                <Card.Text>{movie.data!.description.substr(1, 150)}...</Card.Text>
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
                {/* <Form.Control
                  id={movie.data!.movie_title}
                  style={{ marginTop: '-1vh' }}
                  onChange={e => {
                    const chosenDate = e.target.value;
                    setSelectedDate(new Date(chosenDate).toLocaleDateString());
                    if (movie.data!.movie_date.toLocaleDateString() === selectedDate) {
                      setAvailableHours(
                        createUniqueMovieDateArray(movie).find(
                          item => new Date(item.key).toLocaleDateString() === selectedDate
                        )?.value
                      );
                    }
                  }}
                  size="sm"
                  type="date"
                  placeholder="Small text"
                /> */}
                <Form.Select
                  onChange={(e: any) => {
                    const chosenDate = e.target.value;
                    setSelectedDate(new Date(chosenDate).toLocaleDateString());

                    if (chosenDate === 'Please Select Date') {
                      setAvailableHours(initialAvailableHours);
                    } else {
                      setAvailableHours(
                        createUniqueMovieDateArray(movie).find(
                          item => new Date(item.key).toLocaleDateString() === chosenDate
                        )?.value
                      );
                    }
                  }}
                  style={{ marginTop: '1vh' }}
                  size="sm"
                >
                  <>
                    <option key="default">Please Select Date</option>
                    {createUniqueMovieDateArray(movie).map((dateItem: DateItem) => (
                      <option key={dateItem.key}>{new Date(dateItem.key).toLocaleDateString()}</option>
                    ))}
                  </>
                </Form.Select>
                <Form.Select
                  onChange={e => {
                    setMovieId(e.currentTarget.options[e.currentTarget.options.selectedIndex].id);
                  }}
                  style={{ marginTop: '1vh' }}
                  size="sm"
                >
                  <>
                    <option key="default">Please Select Time</option>
                    {availableHours.map((time: TimeObject) => (
                      <option id={time.movieId} key={time.movieId}>
                        {time.time_start}
                      </option>
                    ))}
                  </>
                </Form.Select>
                <Button
                  href={movieId.length > 0 ? `http://localhost:3000/tickets/${movieId}` : `http://localhost:3000/`}
                  style={{ marginTop: '1vh', fontSize: '1.6vh' }}
                  variant="primary"
                >
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

import React from 'react';
import { Card, ListGroupItem, ListGroup, Accordion } from 'react-bootstrap';
import { Movies } from '../../Redux/Types/generalTypes';
import { movies } from '../../Utils/movieUtils';

export default function Movie() {
  //   const output: any = {};
  //   movies.forEach(val => {
  //     const key = val.movie_title;
  //     const value = val.movie_date;
  //     const value2 = val.time_start;
  //     const value3 = val.movieId;
  //     output[key] = output[key] || [];
  //     output[key] = output[key].concat({ movie_date: value, time_start: value2, movieId: value3 });
  //   });
  //   console.log(output);

  //   const finalOutput = Object.keys(output).map(val => {
  //     return {
  //       key: val,
  //       value: output[val],
  //       data: movies.find(movie => movie.movie_title === val),
  //     };
  //   });
  //   console.log(finalOutput);

  //   interface Output {
  //     movie_date: string;
  //     time_start: string;
  //     movieId: string;
  //   }

  //   const secondOutput: any = {};
  //   finalOutput[0].value.forEach((val: Output) => {
  //     const key = val.movie_date;
  //     const value = val.time_start;
  //     const value2 = val.movieId;
  //     secondOutput[key] = secondOutput[key] || [];
  //     secondOutput[key] = secondOutput[key].concat({ time_start: value, movieId: value2 });
  //   });

  //   console.log(secondOutput);

  //   const finalOutput2 = Object.keys(secondOutput).map(val => {
  //     return {
  //       key: val,
  //       value: secondOutput[val],
  //     };
  //   });

  //   console.log(finalOutput2);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <>
        {movies.map(movie => (
          <>
            <Card key={movie.movieId} style={{ width: '18rem', margin: '3vw' }}>
              <Card.Img variant="top" height={'250px'} src={movie.img} />
              <Card.Body>
                <Card.Title>{movie.movie_title}</Card.Title>
                <Card.Text>
                  {movie.description.substr(1, 100)}...
                  <>
                    <a href=""> Continue Reading</a>
                  </>
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <a href={movie.trailer} target={'blank'}>
                    Trailer
                  </a>
                </ListGroupItem>
                <ListGroupItem>Genre: {movie.genres.toString()}</ListGroupItem>
                <ListGroupItem>
                  {movie.available_sits.length > 0 ? <p>Available Tickets</p> : <p>sold out</p>}
                </ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Card.Link href="#">Get Tickets</Card.Link>
              </Card.Body>
            </Card>
          </>
        ))}
      </>
    </div>
  );
}

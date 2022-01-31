import React from 'react';
import { Movies } from '../../Redux/Types/generalTypes';
import { returnAvailableSeats } from '../../Utils/movieUtils';
import { Card, ListGroupItem, ListGroup, Accordion } from 'react-bootstrap';

export default function Movie() {
  const movies: Array<Movies> = [
    {
      movieId: 'njdsfdhdf',
      movie_title: 'movie_title',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrdPsGJEBxBev7gKo_EMp0Pgk7Q7su_xTUxf3vo8dE9S_CiG2Z',
      trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
      genres: ['comedy', 'fantasy'],
      description:
        "For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero's identity is revealed, bringing his Super Hero responsibilities into conflict with his normal life and putting those he cares about most at risk. When he enlists Doctor Strange’s help to restore his secret, the spell tears a hole in their world, releasing the most powerful villains who’ve ever fought a Spider-Man in any universe. Now, Peter will have to overcome his greatest challenge yet, which will not only forever alter his own future but the future of the Multiverse.",
      price: 45,
      movie_date: new Date('01/12/22'),
      time_start: '18:00',
      available_sits: returnAvailableSeats(),
      taken_sits: [],
    },
    {
      movieId: 'njsfdhdf',
      movie_title: 'movie_title',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrdPsGJEBxBev7gKo_EMp0Pgk7Q7su_xTUxf3vo8dE9S_CiG2Z',
      trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
      genres: ['comedy', 'fantasy'],
      description:
        "For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero's identity is revealed, bringing his Super Hero responsibilities into conflict with his normal life and putting those he cares about most at risk. When he enlists Doctor Strange’s help to restore his secret, the spell tears a hole in their world, releasing the most powerful villains who’ve ever fought a Spider-Man in any universe. Now, Peter will have to overcome his greatest challenge yet, which will not only forever alter his own future but the future of the Multiverse.",
      price: 45,
      movie_date: new Date('01/12/22'),
      time_start: '18:00',
      available_sits: returnAvailableSeats(),
      taken_sits: [],
    },
    {
      movieId: 'jdfbdhdf',
      movie_title: 'movie_title',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrdPsGJEBxBev7gKo_EMp0Pgk7Q7su_xTUxf3vo8dE9S_CiG2Z',
      trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
      genres: ['comedy', 'fantasy'],
      description:
        "For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero's identity is revealed, bringing his Super Hero responsibilities into conflict with his normal life and putting those he cares about most at risk. When he enlists Doctor Strange’s help to restore his secret, the spell tears a hole in their world, releasing the most powerful villains who’ve ever fought a Spider-Man in any universe. Now, Peter will have to overcome his greatest challenge yet, which will not only forever alter his own future but the future of the Multiverse.",
      price: 45,
      movie_date: new Date('01/12/22'),
      time_start: '18:00',
      available_sits: returnAvailableSeats(),
      taken_sits: [],
    },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <>
        {movies.map(movie => (
          <>
            <Card key={movie.movieId} style={{ width: '18rem' }}>
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
                  <a href={movie.trailer}>Trailer</a>
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

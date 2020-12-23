import React from 'react';
import propTypes from 'prop-types';
import { Button, Card, CardGroup, Container } from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { movie, onClick } = this.props;

    return (
      <CardGroup>
        <Card style={{ width: '15rem' }}>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Button onClick={() => onClick(movie)} variant="link">More</Button>
          </Card.Body>
        </Card>
      </CardGroup>
    );
  }
}

MovieCard.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    ImagePath: propTypes.string.isRequired,
    Genre: propTypes.shape({
      Name: propTypes.string.isRequired,
      Description: propTypes.string.isRequired
    }),
    Director: propTypes.shape({
      Name: propTypes.string.isRequired,
      Bio: propTypes.string.isRequired,
      Birth: propTypes.string.isRequired,
      Death: propTypes.string
    }),
    Featured: propTypes.bool.isRequired
  }).isRequired,
  onClick: propTypes.func.isRequired
};

 /* 
      <Card style={{ width: '20rem' }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button onClick={() => onClick(movie)} variant="link">Open</Button>
        </Card.Footer>
      </Card>
 
 */
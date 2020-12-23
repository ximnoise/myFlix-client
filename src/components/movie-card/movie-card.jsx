import React from 'react';
import propTypes from 'prop-types';

import { Button, Card } from 'react-bootstrap';

import './movie-card.scss';


export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { movie, onClick } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body className="bg-dark">
          <table className="main_div">
            <tbody>
              <tr>
                <td valign="top">
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Description}</Card.Text>
                </td>
              </tr>
              <tr valign="bottom" className="button-wrapper">
                <td>
                  <Button className="more-button" variant="primary" onClick={() => onClick(movie)}>
                    More
                  </Button>
                  <Button className="favorite-button" variant="secondary" type="submit">
                    Add to Favorites!
                  </Button>
                  <Button className="remove-button" variant="outline-danger" type="submit">
                    Remove Favorite
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </Card.Body>
      </Card>
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
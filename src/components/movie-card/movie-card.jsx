import React from 'react';
import PropTypes from 'prop-types';

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
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string
    }),
    Featured: PropTypes.bool.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
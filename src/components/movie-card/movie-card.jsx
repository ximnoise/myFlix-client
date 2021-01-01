import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { Button, Card } from 'react-bootstrap';

import './movie-card.scss';


export class MovieCard extends React.Component {
  constructor(props) {
    super(props);

    let addFavorite = false;
    if (props.addFavorite) {
      addFavorite = true;
    }

    let removeFavorite = false;
    if (props.removeFavorite) {
      removeFavorite = true;
    }

    this.state = {
      movie: this.props.movie,
      username: props.user,
      userToken: props.userToken,
      addFavorite: addFavorite,
      removeFavorite: removeFavorite,
    };
  }

  addToFavorite() {
    this.setState({
      addFavorite: false
    });
    axios.post(`https://primedome.herokuapp.com/users/${this.state.username}/Movies/${this.state.movie._id}`, {
      headers: { Authorization: `Bearer ${this.state.userToken}` }
    })
    .then((response) => {
      console.log(response.data);
      console.log('movie added');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {

    const { movie } = this.props

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body className="bg-dark">
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <div className="button-wrapper">
            <Link to={`/movies/${movie._id}`}>
              <Button className="more-button" variant="primary">More</Button>
            </Link>
            {this.state.addFavorite && (
              <Button 
                className="favorite-button" 
                variant="secondary" 
                type="submit" 
                onClick={this.addToFavorite}
              >
                Add Favorite
              </Button>
            )}
            {this.state.removeFavorite && (
              <Button 
                className="remove-button" 
                variant="outline-danger" 
                type="submit" 
                onClick={this.removeFromFavorite}
              >
                Remove Favorite
              </Button>
            )}
          </div>
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
  }).isRequired
};
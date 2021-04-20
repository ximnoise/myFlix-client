import React from 'react';

import { Link } from 'react-router-dom';

import { Button, Card } from 'react-bootstrap';

import './movie-card.scss';


export class MovieCard extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { movies } = this.props;

    return (
      <Card className="bg-dark">
        <Card.Img variant="top" src={movies.ImagePath} />
        <Card.Body>
          <Card.Title>{movies.Title}</Card.Title>
          <Card.Text>{movies.Description}</Card.Text>
          <div className="button-wrapper">
            <Link to={`/movies/${movies._id}`}>
              <Button 
                className="more-button" 
                variant="primary"
              >
                More
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    );
  }
}
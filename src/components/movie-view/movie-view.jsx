import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';

import './movie-view.scss';


export class MovieView extends React.Component {
  constructor(props) {
    super(props);

    let addFavorite = false;
    if (props.addFavorite) {
      addFavorite = true;
    }

    this.state = {
      movie: this.props.movie,
      username: this.props.user,
      userToken: this.props.userToken,
      addFavorite: addFavorite
    };
  }

  addFavorite = () => {
    this.setState({
      addFavorite: false
    });
    axios({
      method: 'post',
      url: `https://primedome.herokuapp.com/users/${this.state.username}/Movies/${this.state.movie._id}`,
      headers: { Authorization: `Bearer ${this.state.userToken}` },
      data: {},
    })
    .then((response) => {
      console.log('movie added');
    })
    .catch((e) => {
      console.log(e);
      console.log('movie not added');
    });
  };

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <br />
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <br />
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <br />
        <div className="movie-genre">
          <span className="label">Genre:</span>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">{movie.Genre.Name}</Button>
          </Link>
        </div>
        <div className="movie-director">
          <span className="label">Director:</span>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">{movie.Director.Name}</Button>
          </Link>
        </div>
        <Link to={'/'}>
          <Button variant="outline-danger">Back</Button>
        </Link>
        {this.state.addFavorite && (
          <Button 
            variant="secondary" 
            type="submit" 
            onClick={this.addFavorite}
          >
            Add Favorite
          </Button>
        )}
      </div>
    );
  }
}
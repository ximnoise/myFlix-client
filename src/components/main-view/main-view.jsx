import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import { Container, Button, Row, Col } from 'react-bootstrap';

import './main-view.scss';


export class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();

    // Initial state is set to null
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      email: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://primedome.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // When a movie is clicked, this function is invoked and updates
  // the state of the `selectedMovie` property to that movie
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // When back button on movie view clicked, set state to null
  // and go back to movie list 
  goBack() {
    this.setState({
      selectedMovie: null
    });
  }

  // When a user successfully logs in, this function updates
  // the `user` property in state to that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  onRegistration(email) {
    this.setState({
      email
    });
  }

  // This overrides the render() method of the superclass
  // No need to call super() though, as it does nothing by default
  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie, user, email } = this.state;

    if (!email) return <RegistrationView onRegistration={email => this.onRegistration(email)} />;

    // If there is no user, the LoginView is rendered.
    // If there is a user logged in, the user details are passed as a prop to the LoginView
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
      // If the state of `selectedMovie` is not null, that selected movie
      // will be returned otherwise, all movies will be returned
      <Container fluid="md" className="container">
        <Button variant="outline-danger" onClick={this.onLoggedOut}>Log Out</Button>
        <Row className="justify-content-md-center">
          {selectedMovie 
            ? <MovieView movie={selectedMovie} goBack={() => this.goBack()}/>
            : movies.map(movie => (
              <Col xs="auto" key={movie._id}>
                <MovieCard movie={movie} onClick={movie => this.onMovieClick(movie)}/>
              </Col>
            ))
          }
        </Row>
      </Container>
    );
  }
}

/* 

      <Container>
        <div className="main-view">
          {selectedMovie 
            ? <MovieView movie={selectedMovie} goBack={() => this.goBack()}/>
            : movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
            ))
          }
        </div>
      </Container>

*/
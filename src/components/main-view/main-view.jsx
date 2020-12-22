import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


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
    axios.get('https://primedome.herokuapp.com/movies')
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
  onLoggedIn(user) {
    this.setState({
      user
    });
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
      <div className="main-view">
        {selectedMovie 
          ? <MovieView movie={selectedMovie} goBack={() => this.goBack()}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
          ))
        }
      </div>
    );
  }
}
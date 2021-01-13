import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { NavView } from '../nav-view/nav-view';
import { ProfileView } from '../profile-view/profile-view';

import { Container, Row, Col } from 'react-bootstrap';

import './main-view.scss';


export class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();

    // Initial state is set to null
    this.state = {
      movies: [],
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getUserData(accessToken, user);
    }
  }

  // When a user successfully logs in, this function updates
  // the `user` property in state to that particular user
  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getUserData(authData.token, authData.user.Username);
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

  getUserData(userToken, user) {
    axios.get(`https://primedome.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${userToken}` }
    })
    .then((response) => {
      let userData = response.data;
      this.setState({
        user: userData.Username,
        userToken: userToken,
        favoriteMovies: userData.FavoriteMovies,
        email: userData.Email,
        birthday: userData.Birthday
      });
      this.getMovies(this.state.userToken);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // This overrides the render() method of the superclass
  // No need to call super() though, as it does nothing by default
  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, user } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
      <Router>
        <Container fluid="md" className="container">
          <NavView user={user} />
          <Row className="justify-content-md-center">
            <Route exact path="/" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return movies.map((m) => 
              <Col xs="auto" key={m._id}>
                <MovieCard 
                  user={user} 
                  userToken={this.state.userToken} 
                  key={m._id} 
                  movie={m}
                  addFavorite={this.state.favoriteMovies.includes(m._id) ? false : true} 
                />
              </Col>
              )}
            }/>
            <Route path="/register" render={() => <RegistrationView /> }/>
            <Route path="/movies/:movieId" render={({match}) => 
              <MovieView 
                movie={movies.find((m)=> m._id === match.params.movieId)}
                user={user}
                userToken={this.state.userToken}
                addFavorite={this.state.favoriteMovies.includes(match.params.movieId) ? false : true} 
              />
            }/>
            <Route path="/genres/:name" render={({match}) => 
              <GenreView 
                genre={movies.find((m) => m.Genre.Name === match.params.name).Genre}
                movies={movies.filter((m) => m.Genre.Name === match.params.name)} 
              />
            }/>
            <Route path="/directors/:name" render={({ match }) => {
              if (!movies) return <div className="main-view"/>;
              return <DirectorView 
                director={movies.find((m) => m.Director.Name === match.params.name).Director}
                movies={movies.filter((m) => m.Director.Name === match.params.name)} 
              />}
            }/>
            <Route path="/profile" render={() => 
              <ProfileView 
                user={user} 
                userToken={this.state.userToken} 
                movies={movies} 
              /> 
            }/>
          </Row>
        </Container>
      </Router>
    );
  }
}
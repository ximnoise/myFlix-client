import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { NavView } from '../nav-view/nav-view';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';

import { Container } from 'react-bootstrap';

import { setMovies, setUser, setUserToken, setFavoriteMovies } from '../../actions/actions';

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
      this.props.setUser(localStorage.getItem('user'));

      /*this.setState({
        user: localStorage.getItem('user')
      }); */

      this.getUserData(accessToken, user);
    }
  }

  // When a user successfully logs in, this function updates
  // the `user` property in state to that particular user
  onLoggedIn(authData) {
    this.props.setUser(authData.user.Username);

    /*this.setState({
      user: authData.user.Username
    }); */

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getUserData(authData.token, authData.user.Username);
  }

  getMovies(token) {
    axios.get('https://primedome.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      this.props.setMovies(response.data);
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
      this.getMovies(userToken);
      let userData = response.data;
      this.props.setUser(userData.Username);
      this.props.setUserToken(userToken);
      this.props.setFavoriteMovies(userData.FavoriteMovies);
      console.log(userData);


      /*this.setState({
        user: userData.Username,
        userToken: userToken,
        favoriteMovies: userData.FavoriteMovies,
        email: userData.Email,
        birthday: userData.Birthday
      }); */
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
    const { movies, user } = this.props;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
      <Router>
        <Container fluid="md" className="container">
          <NavView user={user} />
          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return <MoviesList movies={movies} />;
          }}/>
          <Route path="/register" render={() => <RegistrationView /> }/>
          <Route path="/movies/:movieId" render={({match}) => 
            <MovieView movie={movies.find((m)=> m._id === match.params.movieId)} />
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
              movies={movies}
              favoriteMovies={this.props.favoriteMovies} 
            /> 
          }/>
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { 
    movies: state.movies,
    user: state.user,
    userToken: state.userToken,
    favoriteMovies: state.favoriteMovies
   }
}

export default connect(mapStateToProps, { setMovies, setUser, setUserToken, setFavoriteMovies })(MainView);

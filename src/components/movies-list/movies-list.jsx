import React from 'react';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import { Row, Col } from 'react-bootstrap';


const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main=view" />;

  return <div className="movies-list">
    <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    <Row className="justify-content-md-center">
    {filteredMovies.map((m) => 
      <Col xs="auto" key={m._id}>
        <MovieCard key={m._id} movie={m} />
      </Col>
    )}
    </Row>
  </div>
}

export default connect(mapStateToProps)(MoviesList);

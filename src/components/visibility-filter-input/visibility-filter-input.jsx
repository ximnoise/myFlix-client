import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Form } from 'react-bootstrap';

import { setFilter } from '../../actions/actions';

import './visibility-filter-input.scss';


function VisibilityFilterInput(props) {
  return <Form.Control
    className="filter-input bg-transparent text-light"
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="Search for movies"
  />;
}

export default connect(null, { setFilter })(VisibilityFilterInput);
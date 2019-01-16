import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { authorize } from '../../actions/auth';
import Header from '../Header';
import Notify from '../Notify';
import Board from '../Board';

class Home extends Component {
 
  componentWillMount() {
    this.props.authorize()
  };

  render() {
    return (
      <Fragment>
        <Header />
        <Notify />
        <Board />
      </Fragment>
    )
  }
}

Home.propTypes = {
  authorize: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  authorize: authToken => dispatch(authorize(authToken))
});

export default connect(null, mapDispatchToProps)(Home);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { red600, cyan600 } from 'material-ui/styles/colors/';

import { hideNotify } from '../../actions/notify';

class Notify extends Component {
  render() {
    const { isShown, message, type, hideNotify } = this.props
    return (
      <Snackbar
        style={{ backgroundColor: 'white' }}
        bodyStyle={{ backgroundColor: type === 'danger' ? 'rgb(244, 67, 54, 0.1)' : 'rgb(0, 188, 212, 0.1)' }}
        contentStyle={{ color: type === 'danger' ? red600 : cyan600 }}
        open={!!isShown}
        message={message ? message : ''}
        autoHideDuration={2000}
        onRequestClose={hideNotify}
      />
    )
  }
};

const mapStateToProps = state => ({
  isShown: state.notify.isShown,
  message: state.notify.message,
  type: state.notify.type
});

Notify.propTypes = {
  hideNotify: PropTypes.func.isRequired,
  isShown: PropTypes.bool.isRequired,
  message: PropTypes.string,
  type: PropTypes.string
}

const mapDispatchToProps = dispatch => ({
  hideNotify: authToken => dispatch(hideNotify(authToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notify);
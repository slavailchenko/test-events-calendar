import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { AppBar, RaisedButton } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import HeadMenu from './headMenu';
import { googleLogin, loginUserFail } from '../../actions/auth';

class Header extends Component {
  
  onGoogleResponse = res => {
    this.props.googleLogin(res.Zi.id_token);
  }

  render() {
    const { user, loginLoading, authLoading, loginUserFail } = this.props;
    console.log(this.props);

    const iconElementRight = user ? (
      <HeadMenu user={user} />
    ) : !authLoading ? (
      <RaisedButton secondary style={{ width: '106px', marginTop: '6px' }} buttonStyle={{ color: 'white' }}>
        <GoogleLogin
          clientId="208617087211-g7gfn9hqpeblg4bme0fk1irrno6tr16f.apps.googleusercontent.com"
          onSuccess={this.onGoogleResponse}
          onFailure={loginUserFail}
          type=""
          style={{}}
          disabled={loginLoading}
          tag="span"
        >
          <FontAwesomeIcon icon={['fab', 'google-plus-g']} />
          <span style={{ marginLeft: '0.6em' }}>Sign in</span>
        </GoogleLogin>
      </RaisedButton>
    ) : null
    return (
      <AppBar
        showMenuIconButton={false}
        title="Event calendar"
        iconElementRight={iconElementRight}
        iconStyleRight={user ? { marginRight: 'auto' } : null}
      />
    )
  }
};

Header.propTypes = {
  user: PropTypes.object,
  authLoading: PropTypes.bool.isRequired,
  loginLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  googleLogin: PropTypes.func.isRequired,
  loginUserFail: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  authLoading: state.auth.authLoading,
  loginLoading: state.auth.loginLoading,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  googleLogin: idToken => dispatch(googleLogin(idToken)),
  loginUserFail: () => dispatch(loginUserFail())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
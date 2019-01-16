import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FlatButton, Popover, Menu, MenuItem, Divider } from 'material-ui';

import { logout } from '../../actions/auth';

class HeadMenu extends Component {
  
  state = {
    open: false
  };

  handleClick = event => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    })
  };

  exportEventsAsJson = () => {
    const { events } = this.props;
    const resData = events.map(event => _.pick(event, ['start', 'duration', 'title']));
    const blob = new Blob([JSON.stringify(resData)], { type: 'application/json' });
    const blobURL = URL.createObjectURL(blob);
    window.open(blobURL);
  }

  render() {
    const { user, logout } = this.props;
    const { open, anchorEl } = this.state;
    console.log(user);
    return (
      <Fragment>
        <FlatButton
          className="acc-button"
          onClick={this.handleClick}
          style={{ minWidth: 'none', borderRadius: '50%', marginTop: '4px', height: 'auto' }}
        >
          <img className="avatar" alt={user.name} src={user.avatar} />
        </FlatButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu menuItemStyle={{ color: '#656c70' }}>
            <MenuItem primaryText={user.name} disabled />
            <MenuItem primaryText={user.email} disabled />
            <Divider />
            <MenuItem
              primaryText="Export events to JSON"
              onClick={this.exportEventsAsJson}
              innerDivStyle={{ color: 'rgba(0, 0, 0, 0.87)' }}
            >
              {}
            </MenuItem>
            <Divider />
            <MenuItem primaryText="Sign out" onClick={logout} innerDivStyle={{ color: 'rgba(0, 0, 0, 0.87)' }} />
          </Menu>
        </Popover>
      </Fragment>
    )
  }
};

HeadMenu.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  events: state.event.events
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(HeadMenu);

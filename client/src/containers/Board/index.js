import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Calendar from './calendar';
import AddEventButton from './createEventButton';
import AddEventDialog from './createEventDialog';
import DeleteEventDialog from './deleteEventDialog';

const beginningHour = 8,
      endHour = 17,
      stepMinute = 15;

class Board extends Component {
  render() {
    const { isAddEventDialogShown, isDeleteEventDialogShown } = this.props
    return (
      <Fragment>
        {isAddEventDialogShown && <AddEventDialog />}
        {isDeleteEventDialogShown && <DeleteEventDialog beginningHour={beginningHour} />}
        <AddEventButton />
        <Calendar beginningHour={beginningHour} endHour={endHour} stepMinute={stepMinute} />
      </Fragment>
    )
  }
};

Board.propTypes = {
  isAddEventDialogShown: PropTypes.bool.isRequired,
  isDeleteEventDialogShown: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAddEventDialogShown: state.addEventDialog.isShown,
  isDeleteEventDialogShown: !!state.deleteEventDialog.event
});

export default connect(mapStateToProps)(Board);
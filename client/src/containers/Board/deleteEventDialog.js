import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dialog, FlatButton } from 'material-ui';

import { deleteEvent } from '../../actions/events';
import { hideDeleteEventDialog } from '../../actions/eventDialog';

const helper = (a) => {
  let sum = a + '';
  return sum.length === 1 ? '0' + sum : sum;
};

class DeleteEventDialog extends Component {
  formatTime = time => {
    const { beginningHour } = this.props;
    const hour = Math.floor(time / 60) + beginningHour;
    const minute = time % 60;
    return `${helper(hour)} : ${helper(minute)}`;
  }

  render() {
    const { loading, hideDeleteEventDialog, deleteEvent, event } = this.props;

    const actions = [
      <FlatButton label="Cancel" onClick={hideDeleteEventDialog} />,
      <FlatButton label="Delete" secondary onClick={() => deleteEvent(event)} disabled={loading} />
    ];

    return (
      <Dialog
        title={this.formatTime(event.start) + ' - ' + this.formatTime(event.start + event.duration)}
        actions={actions}
        open={true}
        onRequestClose={hideDeleteEventDialog}
      >
        {event.title}
      </Dialog>
    )
  }
};

DeleteEventDialog.propTypes = {
  deleteEvent: PropTypes.func.isRequired,
  hideDeleteEventDialog: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  event: PropTypes.object.isRequired,
  beginningHour: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  loading: state.event.loading,
  event: state.deleteEventDialog.event
});

const mapDispatchToProps = dispatch => ({
  deleteEvent: event => dispatch(deleteEvent(event)),
  hideDeleteEventDialog: () => dispatch(hideDeleteEventDialog())
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEventDialog);
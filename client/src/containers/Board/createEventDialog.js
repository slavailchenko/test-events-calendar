import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dialog, FlatButton, TextField, TimePicker } from 'material-ui';

import { addEvent } from '../../actions/events';
import { hideAddEventDialog } from '../../actions/eventDialog';

const dateToMinutes = a => {
  return Math.floor(a / 60000);
};

class AddEventDialog extends Component {

  state = {
    title: null,
    titleValid: false,
    titleErrorText: null,

    startTime: null,
    startTimeValid: false,
    startTimeErrorText: null,

    endTime: null,
    endTimeValid: false,
    endTimeErrorText: null
  }

  validateTitle = value => {
    
    if (value === '') {
      return 'Please input title';
    };

    return null
  };

  validateStartTime = value => {
    if (!(value instanceof Date)) return 'Required';
    const hours = value.getHours();
    const minutes = value.getMinutes();
    if (hours < 8 || hours > 17 || (hours === 17 && minutes > 0)) 
      return 'Must be between 8:00 am and 5:00 pm'
    return null;
  }

  validateEndTime = value => {
    const errorText = this.validateStartTime(value)
    if (errorText) return errorText
    const { startTime } = this.state
    if (startTime && dateToMinutes(value) <= dateToMinutes(startTime)) return 'Must be greater than Start Time'
    return null
  }

  handleInputChange = (name, value) => {

    let errors = {}

    const genErrors = (errorText, fieldName = name) => {
      return { [`${fieldName}ErrorText`]: errorText, [`${fieldName}Valid`]: !errorText }
    }

    switch (name) {
      case 'title':
        errors = genErrors(this.validateTitle(value))
        break

      case 'startTime':
        const { endTime } = this.state;
        errors = genErrors(this.validateStartTime(value));
        if (endTime)
          errors = {
            ...errors,
            ...genErrors(dateToMinutes(value) >= dateToMinutes(endTime) ? 'Must be greater than Start Time' : null, 'endTime')
          }
        break;

      case 'endTime':
        errors = genErrors(this.validateEndTime(value));
        break;

      default:
        break;
    }

    this.setState({
      [name]: value,
      ...errors
    });
  }

  handleSave = () => {
    const { title, startTime, endTime } = this.state;
    const start = Math.max(0, (startTime.getHours() - 8) * 60 + startTime.getMinutes());
    const duration = dateToMinutes(endTime) - dateToMinutes(startTime);
    this.props.addEvent({ title, start, duration });
  };

  render() {
    const { loading, hideAddEventDialog } = this.props;
    const { titleValid, startTimeValid, endTimeValid, titleErrorText, startTimeErrorText, endTimeErrorText } = this.state;
    const isSaveButtonDisabled = loading || !titleValid || !startTimeValid || !endTimeValid;

    const actions = [
      <FlatButton label="Cancel" primary onClick={hideAddEventDialog} />,
      <FlatButton label="Save" primary onClick={this.handleSave} disabled={isSaveButtonDisabled} />
    ];

    return (
      <Dialog title="Add event" actions={actions} open={true} onRequestClose={hideAddEventDialog}>
        <TextField
          floatingLabelText="Title"
          onChange={(_, value) => this.handleInputChange('title', value)}
          errorText={titleErrorText}
          fullWidth
        />
        <TimePicker
          floatingLabelText="Start Time"
          onChange={(_, value) => this.handleInputChange('startTime', value)}
          errorText={startTimeErrorText}
          minutesStep={15}
          fullWidth
          autoOk
        />
        <TimePicker
          floatingLabelText="End Time"
          onChange={(_, value) => this.handleInputChange('endTime', value)}
          errorText={endTimeErrorText}
          minutesStep={15}
          fullWidth
          autoOk
        />
      </Dialog>
    )
  }
};

AddEventDialog.propTypes = {
  addEvent: PropTypes.func.isRequired,
  hideAddEventDialog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.event.loading
});

const mapDispatchToProps = dispatch => ({
  addEvent: payload => dispatch(addEvent(payload)),
  hideAddEventDialog: payload => dispatch(hideAddEventDialog())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEventDialog);

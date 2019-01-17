import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { showRemoveEventDialog } from '../../actions/eventDialog';

import './calendar.scss';

const helper = (a) => {
  let sum = a + '';
  return sum.length === 1 ? '0' + sum : sum;
};

const timeSlotHeigth = 21,
      timeSlotMaxWidth = 200;

class Calendar extends Component {
  
  state = {
    eventsContainerWidth: 0,
    events: []
  }

  timeContainer = React.createRef();

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => this.setState({ eventsContainerWidth: this.timeContainer.current.offsetWidth - 62 })

  componentWillMmount() {
    const { events, endHour, beginningHour, stepMinute } = this.props
    if (events.length) this.extendEventsProp(events, endHour, beginningHour, stepMinute)
  }

  componentWillReceiveProps(nextProps) {
    const { events, endHour, beginningHour, stepMinute } = nextProps
    if (!_.isEqual(events, this.props.events)) this.extendEventsProp(events, endHour, beginningHour, stepMinute)
  }

  extendEventsProp(events, endHour, beginningHour, stepMinute) {
    const extendedEvents = _.cloneDeep(events);
    const timeSlotsNumber = (endHour - beginningHour) * (60 / stepMinute) + 1;
    const slotsEvents = _.times(timeSlotsNumber, () => 
      Array.apply(null, Array(extendedEvents.length)));

    extendedEvents.forEach((el, i) => {
      el.startSlotIndex = Math.floor(el.start / stepMinute);
      el.endSlotIndex = Math.ceil((el.start + el.duration) / stepMinute);
      el.columnsNumber = 1;

      let eventIndex = 0;

      for (let slotIndex = el.startSlotIndex; slotIndex < el.endSlotIndex; slotIndex++) {
        if (slotsEvents[slotIndex][eventIndex] !== undefined)
          eventIndex = slotsEvents[slotIndex].indexOf(undefined, eventIndex)
      }

      for (let slotIndex = el.startSlotIndex; slotIndex < el.endSlotIndex; slotIndex++) {
        slotsEvents[slotIndex][eventIndex] = i;
      }
    });

    slotsEvents.forEach(slot => {
      slot.forEach((el, i) => {
        if (el !== undefined) {
          extendedEvents[el].number = i;
          const slotEventsLength = _.findLastIndex(slot, event => event !== undefined) + 1;
          extendedEvents[el].columnsNumber = Math.max(slotEventsLength, extendedEvents[i].columnsNumber);
        }
      })
    });

    this.setState({ 
      events: extendedEvents 
    });
  }

  render() {
    const { beginningHour, endHour, showRemoveEventDialog } = this.props;
    const { eventsContainerWidth, events } = this.state;

    const timeRange = _.range((endHour - beginningHour) * 2 + 1).map(
      i => helper(beginningHour + Math.floor(i / 2)) + ':' + helper((i % 2) * 30)
    );

    return (
      <div className="container calendar">
        <ul ref={this.timeContainer} className="time-container list">
          {events.map((event, i) => (
            <div
              className="event"
              onClick={() => showRemoveEventDialog(event)}
              style={{
                top: event.startSlotIndex * timeSlotHeigth + 'px',
                left: Math.min(eventsContainerWidth / event.columnsNumber, timeSlotMaxWidth) * event.number + 'px',
                width: eventsContainerWidth / event.columnsNumber + 'px',
                height: (event.endSlotIndex - event.startSlotIndex) * timeSlotHeigth + 'px'
              }}
              key={i}
            >
              {event.title}
            </div>
          ))}
          <div className="time-slot-group">
            {timeRange.map((time, i) => (
              <Fragment key={i}>
                <li className="list-item">
                  <div className="time-slot">
                    <div className="time">{time}</div>
                  </div>
                  <div className="list-item time-slot" />
                </li>
              </Fragment>
            ))}
          </div>
        </ul>
      </div>
    )
  }
};

Calendar.propTypes = {
  events: PropTypes.array.isRequired,
  beginningHour: PropTypes.number.isRequired,
  endHour: PropTypes.number.isRequired,
  stepMinute: PropTypes.number.isRequired,
  showRemoveEventDialog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  events: state.event.events
});

const mapDispatchToProps = dispatch => ({
  showRemoveEventDialog: event => dispatch(showRemoveEventDialog(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
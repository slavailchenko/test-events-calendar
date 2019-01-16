import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { showAddEventDialog } from '../../actions/eventDialog';

const AddEventButton = ({ showAddEventDialog }) => (
  <FloatingActionButton onClick={showAddEventDialog} style={{ 
    position: 'fixed', 
    bottom: '3vh', 
    right: '3vh', 
    zIndex: 2 }}
    >
    <ContentAdd />
  </FloatingActionButton>
)

AddEventButton.propTypes = {
  showAddEventDialog: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  showAddEventDialog: () => dispatch(showAddEventDialog())
});

export default connect(null, mapDispatchToProps)(AddEventButton);
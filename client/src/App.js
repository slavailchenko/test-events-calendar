import React from 'react'

import { Provider } from 'react-redux'
import { Route, Router, Redirect } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { red500 } from 'material-ui/styles/colors';
import './index.scss';
import { store, history } from './store';
import Home from './containers/Home';
import 'bootstrap/scss/bootstrap.scss';

import fontawesome from '@fortawesome/fontawesome';
import faGooglePlusG from '@fortawesome/fontawesome-free-brands/faGooglePlusG';

const customTheme = getMuiTheme({
  palette: {
    accent1Color: red500
  }
});

fontawesome.library.add(faGooglePlusG);

export default () => (
  <MuiThemeProvider muiTheme={customTheme}>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Home} />
        <Redirect from="*" to="/" />
      </Router>
    </Provider>
  </MuiThemeProvider>
)

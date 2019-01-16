import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import App from './App';

axios.defaults.baseURL = 'http://localhost:8081/';

ReactDOM.render(<App />, document.getElementById('root'))
// React
import React from 'react';
import { render } from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppContainer from './AppContainer';
import './index.css';

// Redux
import { createStore, applyMiddleware /*, compose */ } from 'redux'
import pirateHuntingApp from './reducers';
import { Provider } from 'react-redux';

// middleware
import thunkMiddleware from 'redux-thunk';

const store = createStore(
  pirateHuntingApp, applyMiddleware(thunkMiddleware)
);

render(
<Provider store={store}>
  <MuiThemeProvider>
    <AppContainer />
  </MuiThemeProvider>
</Provider >,
document.getElementById('root')
)
import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import './index.css';
import App from './App';
import reducers from './reducers'
import * as serviceWorker from './serviceWorker';
import { userContext } from './ContextApi'
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

const auth = store.getState().auth
console.log(auth)
const userdetail = auth
render(
  <Provider store={store}>
   <userContext.Provider value={userdetail}> 
    <App />
    </userContext.Provider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

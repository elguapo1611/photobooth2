import { Provider } from 'react-redux'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSocketMiddleware from 'redux-ws';
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
var W3CWebSocket = require('websocket').w3cwebsocket;
const client = new W3CWebSocket('ws://localhost:8080/', 'echo-protocol');

const initialState = {
  photos: {
    roll: [],
    currentPhoto: 0
  }
}

client.onopen = function() {
  console.log('WebSocket Client Connected');
  store.dispatch({type: "TAKE_PHOTO"});
};

const photosReducer = (state={}, action) => {
  switch (action.type) {
    case "TAKE_PHOTO":
      if (client.readyState === client.OPEN) {
        var number = Math.round(Math.random() * 0xFFFFFF);
        client.send("takePhoto");
      }
      var newPhotos = state.roll.map((n) => n); 
      newPhotos.push(Math.random(1000))
      state = {...state, roll: newPhotos }
      return state;
      break;
  }
  return state;
};

const reducers = combineReducers({
  photos: photosReducer
});

// const reducer = function(state, action) {
//   switch (action.type) {
//     case "START_GAME":
//       break;
//     case "START_AGE_1":
//       let cards = getAgeCards(1)
//       let players = state.players.map((player) => player.hand)
//       return Object.assign({}, state);
//       break;
//     case "START_AGE_2":
//       return state;
//       break;
//     case "START_AGE_3":
//       return state;
//       break;
//     case "STAGE_ACTION":
//       break;
//     case "PROCESS_ACTIONS":
//       break;
//     case "CALCULATE_POINTS":
//       break;
//   }
//   return state;
// }

const store = createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
  console.log("store changed", store.getState())
})



ReactDOM.render(<App />, document.getElementById('root'));

client.onerror = function() {
  console.log('Connection Error');
};

client.onclose = function() {
  console.log('echo-protocol Client Closed');
};

client.onmessage = function(e) {
  if (typeof e.data === 'string') {
    console.log("Received: '" + e.data + "'");
  }
};

import { combineReducers } from 'redux'
import {
  COUNTDOWN_COMPLETE,
  DECREMENT_COUNTDOWN,
  START_COUNTDOWN,
  RECEIVE_PHOTOS,
  TAKE_PHOTO,
  REQUEST_PHOTOS,
  FETCH_PHOTOS
} from '../actions'

const photosReducer = (state = { }, action) => {
  switch (action.type) {
    case COUNTDOWN_COMPLETE:
      return {
        ...state,
        countdown: action.countdown,
      }
    case DECREMENT_COUNTDOWN:
      return {
        ...state,
        countdown: action.countdown
      }
    case START_COUNTDOWN:
      return {
        ...state,
        countdown: action.countdown,
        isCountingDown: true
      }
    case FETCH_PHOTOS:
      return {
        ...state,
        isFetching: true
      }

    case REQUEST_PHOTOS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_PHOTOS:
      var photos = action.photos.map((photo, idx) => {
        if (idx === 0) {
          return Object.assign({ selected: true}, photo)
        }
        return Object.assign({}, photo)
      })
      return {
        ...state,
        photos: photos,
        countdown: "",
        isFetching: false,
        isCountingDown: false
      }

    default:
      return state
  }
  return state
}

const rootReducer = combineReducers({
  photosReducer
})

export default rootReducer

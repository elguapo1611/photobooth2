import { combineReducers } from 'redux'
import {
  COUNTDOWN_COMPLETE,
  DECREMENT_COUNTDOWN,
  START_COUNTDOWN,
  RECEIVE_PHOTOS,
  TAKE_PHOTO,
  REQUEST_PHOTOS,
  FETCH_PHOTOS,
  SCROLL_RIGHT,
  SCROLL_LEFT
} from '../actions'

var scrollToElement = require('scroll-to-element');
 

const photosReducer = (state = { }, action) => {
  switch (action.type) {
    case SCROLL_RIGHT:
      let rightIndex = state.selectedPhotoIndex ? state.selectedPhotoIndex + 1 : 1
      let finalRightIndex = rightIndex < state.photos.length ? rightIndex : state.photos.length - 1
      scrollToElement('#photo-' + state.photos[finalRightIndex].id)
      return {
        ...state,
        selectedPhotoIndex: finalRightIndex
      }
    case SCROLL_LEFT:
      let leftIndex = state.selectedPhotoIndex ? state.selectedPhotoIndex - 1 : 0
      let finalLeftIndex = leftIndex < 0 ? 0 : leftIndex
      scrollToElement('#photo-' + state.photos[finalLeftIndex].id)
      return {
        ...state,
        selectedPhotoIndex: finalLeftIndex
      }
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
      scrollToElement('#photo-' + state.photos[0].id, {duration: 200})
      return {
        ...state,
        selectedPhotoIndex: 0,
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

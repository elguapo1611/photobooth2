import { combineReducers } from 'redux'
import {
  RECEIVE_PHOTOS, TAKE_PHOTO, REQUEST_PHOTOS, FETCH_PHOTOS
} from '../actions'

const photosReducer = (state = { }, action) => {
  console.log(action.isFetching)
  switch (action.type) {
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
      var photos = action.photos.map((proj) => {
        return proj
      })
      photos[0].selected = true
      return {
        ...state,
        photos: photos,
        isFetching: false
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

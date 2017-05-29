import { combineReducers } from 'redux'
import {
  RECEIVE_PHOTOS, TAKE_PHOTO, REQUEST_PHOTOS, FETCH_PHOTOS
} from '../actions'

// const posts = (state = {
//   isFetching: false,
//   didInvalidate: false,
//   items: []
// }, action) => {
//   console.log(action.type)
//   switch (action.type) {
//     case INVALIDATE_REDDIT:
//       return {
//         ...state,
//         didInvalidate: true
//       }
//     case REQUEST_POSTS:
//       return {
//         ...state,
//         isFetching: true,
//         didInvalidate: false
//       }
//     case RECEIVE_PHOTOS:
//       console.log("wtf")
//       return {
//         ...state,
//         isFetching: false
//       }
//     case RECEIVE_POSTS:
//       return {
//         ...state,
//         isFetching: false,
//         didInvalidate: false,
//         items: action.posts,
//         lastUpdated: action.receivedAt
//       }
//     default:
//       return state
//   }
// }

const photosReducer = (state = { }, action) => {
  switch (action.type) {
    case FETCH_PHOTOS:
      return {
        ...state,
        action
      }
    case REQUEST_PHOTOS:
      return {
        ...state,
        action
      }
    case RECEIVE_PHOTOS:
      return {
        ...state,
        photos: action.photos
      }

  //   case INVALIDATE_REDDIT:
  //   case RECEIVE_POSTS:
  //   case REQUEST_POSTS:
  //     return {
  //       ...state,
  //       [action.reddit]: posts(state[action.reddit], action)
  //     }
    default:
      return state
  }
  return state
}

const rootReducer = combineReducers({
  photosReducer
})

export default rootReducer

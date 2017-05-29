export const TAKE_PHOTO = 'TAKE_PHOTO'
export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS'
export const REQUEST_PHOTOS = 'REQUEST_PHOTOS'
export const FETCH_PHOTOS = 'FETCH_PHOTOS'

var corsOptionsDelegate = function (req, callback) {
  corsOptions = { origin: false } // disable CORS for this request 
  callback(null, corsOptions) // callback expects two parameters: error and options 
}

export const receivedPhotos = (photos) => ({
  type: RECEIVE_PHOTOS,
  isFetching: false,
  photos
})

export const requestPhotos = photos => ({
  type: REQUEST_PHOTOS,
  isFetching: true,
  photos
})

export const takePhoto = photos => dispatch => {
  console.log("take the photo")
  dispatch(requestPhotos(photos))
  return fetch('http://localhost:3001/photos', { method: 'POST'})
    .then(response => response.json())
    .then(json => dispatch(receivePosts(reddit, json)))
}

export const fetchPhotos = photos => dispatch => {
  dispatch(requestPhotos(photos))
  return fetch('http://localhost:3001', { method: 'GET'})
    .then(response => response.json())
    .then(json => dispatch(receivedPhotos(json)))
}

export const onPhotoKeyPress = keys => {
  console.log("photo key press {keys}")
}

// export const REQUEST_POSTS = 'REQUEST_POSTS'
// export const RECEIVE_POSTS = 'RECEIVE_POSTS'
// export const SELECT_REDDIT = 'SELECT_REDDIT'
// export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'




// export const selectReddit = reddit => ({
//   type: SELECT_REDDIT,
//   reddit
// })

// export const invalidateReddit = reddit => ({
//   type: INVALIDATE_REDDIT,
//   reddit
// })

// export const requestPosts = reddit => ({
//   type: REQUEST_POSTS,
//   reddit
// })

// export const receivePosts = (reddit, json) => ({
//   type: RECEIVE_POSTS,
//   reddit,
//   posts: json.data.children.map(child => child.data),
//   receivedAt: Date.now()
// })

// const fetchPosts = reddit => dispatch => {
//   dispatch(requestPosts(reddit))
//   return fetch(`https://www.reddit.com/r/${reddit}.json`)
//     .then(response => response.json())
//     .then(json => dispatch(receivePosts(reddit, json)))
// }

// const shouldFetchPosts = (state, reddit) => {
//   const posts = state.postsByReddit[reddit]
//   if (!posts) {
//     return true
//   }
//   if (posts.isFetching) {
//     return false
//   }
//   return posts.didInvalidate
// }

// export const fetchPostsIfNeeded = reddit => (dispatch, getState) => {
//   if (shouldFetchPosts(getState(), reddit)) {
//     return dispatch(fetchPosts(reddit))
//   }
// }

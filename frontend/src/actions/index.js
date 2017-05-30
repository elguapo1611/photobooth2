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
  dispatch(requestPhotos(photos))
  return fetch('http://localhost:3001/photos', { method: 'POST'})
    .then(response => response.json())
    .then(json => dispatch(receivedPhotos(json)))
}

export const fetchPhotos = photos => dispatch => {
  dispatch(requestPhotos(photos))
  return fetch('http://localhost:3001', { method: 'GET'})
    .then(response => response.json())
    .then(json => dispatch(receivedPhotos(json)))
}

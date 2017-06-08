export const TAKE_PHOTO = 'TAKE_PHOTO'
export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS'
export const REQUEST_PHOTOS = 'REQUEST_PHOTOS'
export const FETCH_PHOTOS = 'FETCH_PHOTOS'
export const START_COUNTDOWN = 'START_COUNTDOWN'
export const DECREMENT_COUNTDOWN = 'DECREMENT_COUNTDOWN'
export const COUNTDOWN_COMPLETE = 'COUNTDOWN_COMPLETE'
export const SCROLL_RIGHT = 'SCROLL_RIGHT'
export const SCROLL_LEFT = 'SCROLL_LEFT'


export const scrolledLeft = () => ({
  type: SCROLL_LEFT,
  isScrolling: true
})

export const scrolledRight = () => ({
  type: SCROLL_RIGHT,
  isScrolling: true
})

var corsOptionsDelegate = function (req, callback) {
  corsOptions = { origin: false } // disable CORS for this request 
  callback(null, corsOptions) // callback expects two parameters: error and options 
}

export const decrementCountdown = count => ({
  type: DECREMENT_COUNTDOWN,
  isCountingDown: true,
  countdown: count
})

export const receivedPhotos = (photos) => ({
  type: RECEIVE_PHOTOS,
  isFetching: false,
  isCountingDown: false,
  countdown: "",
  photos
})

export const requestPhotos = photos => ({
  type: REQUEST_PHOTOS,
  isFetching: true,
  photos
})

export const startCountdown = count => ({
  type: START_COUNTDOWN,
  isCountingDown: true,
  countdown: count
})

export const countDownComplete = count => ({
  type: COUNTDOWN_COMPLETE,
  countdown: "cheese"
})

export const scrollLeft = () => dispatch => {
  console.log("scrolling left")
  dispatch(scrolledLeft())
}

export const scrollRight = () => dispatch => {
  console.log("scrolling right")
  dispatch(scrolledRight())
}

export const takePhoto = photos => dispatch => {
  var count = 3
  dispatch(startCountdown(3 + ""))
  let countDownInterval
  countDownInterval = setInterval(() => {
    if (count === 1) {
      dispatch(countDownComplete())
      clearInterval(countDownInterval)
      setTimeout(() => {
        return fetch('http://localhost:3001/photos', { method: 'POST'})
          .then(response => response.json())
          .then(json => dispatch(receivedPhotos(json)))
      }, 10)
    } else {
      count = count - 1
      dispatch(decrementCountdown(count + ""))
    }
  }, 1000)
}

export const fetchPhotos = photos => dispatch => {
  dispatch(requestPhotos(photos))
  return fetch('http://localhost:3001', { method: 'GET'})
    .then(response => response.json())
    .then(json => dispatch(receivedPhotos(json)))
}

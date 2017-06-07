import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { takePhoto, fetchPhotos, onPhotoKeyPress } from '../actions'
import Photo from '../components/Photo'
import Photos from '../components/Photos'
import Countdown from '../components/Countdown'
require("../../public/main.css")

class App extends Component {
  handleClick = e => {
    const { dispatch, photos, isCountingDown } = this.props
    console.log(isCountingDown)
    if (e.key == "Enter" && !this.props.isFetching && !this.props.isCountingDown) {
      dispatch(takePhoto())
    }
  }

  static propTypes = {
    photos: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, photos } = this.props
    document.addEventListener("keydown", this.handleClick.bind(this));
    dispatch(fetchPhotos())
  }

  render() {
    const { photos, isFetching, countdown } = this.props

    let loading = null;
    if (isFetching) {
      loading = <h1>loading</h1>
    }

    let countdownComponent = null;
    if (countdown) {
      countdownComponent = <Countdown count={countdown} />
    }

    return (
      <div onKeyUp={this.handleClick}>
        {countdownComponent}
        {loading}
        <Photos photos={photos} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  let photos = state.photosReducer.photos ? state.photosReducer.photos : []
  let isFetching = state.photosReducer.isFetching ? state.photosReducer.isFetching : false
  let countdown = state.photosReducer.countdown
  let isCountingDown = state.photosReducer.isCountingDown ? state.photosReducer.isCountingDown : false

  return {
    photos,
    isFetching,
    countdown,
    isCountingDown
  }
}

export default connect(mapStateToProps)(App)

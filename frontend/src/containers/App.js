import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { takePhoto, fetchPhotos, onPhotoKeyPress } from '../actions'
import Photo from '../components/Photo'
import Photos from '../components/Photos'
require("../../public/main.css")

class App extends Component {
  handleClick = e => {
    const { dispatch, photos } = this.props
    if (e.key == "Enter" && !this.props.isFetching) {
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
    const { photos, isFetching } = this.props

    var loading = null;
    if (isFetching) {
      loading = <h1>loading</h1>
    }

    return (
      <div onKeyUp={this.handleClick}>
        {loading}
        <Photos photos={photos} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  var photos = []
  if (state.photosReducer && state.photosReducer.photos) {
    photos = state.photosReducer.photos
  }
  var isFetching = false
  if (state.photosReducer && state.photosReducer.isFetching) {
    isFetching = state.photosReducer.isFetching
  }
  return {
    photos,
    isFetching
  }
}

export default connect(mapStateToProps)(App)

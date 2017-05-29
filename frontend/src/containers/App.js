import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { takePhoto, fetchPhotos, onPhotoKeyPress } from '../actions'
import Photo from '../components/Photo'
import Photos from '../components/Photos'

class App extends Component {
  handleClick = e => {
    const { dispatch, photos } = this.props
    if (e.key == "Enter") {
      console.log(e)
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.photos !== this.props.photos) {
      const { dispatch, selectedReddit } = nextProps
      // dispatch(fetchPhotos())
    }
  }

  // handleRefreshClick = e => {
  //   e.preventDefault()

  //   const { dispatch, selectedReddit } = this.props
  //   dispatch(invalidateReddit(selectedReddit))
  //   dispatch(fetchPostsIfNeeded(selectedReddit))
  // }
  

  render() {

    const { photos, isFetching } = this.props
    return (
      <div tabIndex={0} onKeyUp={this.handleClick}>
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

  const isFetching = false
  
  return {
    photos,
    isFetching
  }
}

export default connect(mapStateToProps)(App)

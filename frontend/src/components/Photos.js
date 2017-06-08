import React from 'react'
import PropTypes from 'prop-types'
import Photo from './Photo'
import { onPhotoKeyPress } from '../actions'

const Photos = ({photos}) => (
  <ul id="photo-list">
    {photos.map((photo, i) =>
        <Photo
          key={photo.id}
          url={photo.url}
          id={photo.id}
          selected={photo.selected}
        />

    )}
  </ul>
)

Photos.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default Photos



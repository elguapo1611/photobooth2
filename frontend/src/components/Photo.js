import React from 'react'
import PropTypes from 'prop-types'

const Photo = ({ url, id, selected }) => (
  <li id="photo-{id}" className="photo">
    <img src={url} width="100" />
  </li>
)

Photo.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}

export default Photo

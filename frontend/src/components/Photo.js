import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind';

const Photo = ({ url, id, selected }) => (
  <li id={"photo-" + id} className={"photo" + (selected ? " selected" : "")}>
    <img src={url} />
  </li>
)

Photo.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}

export default Photo

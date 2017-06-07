import React from 'react'
import PropTypes from 'prop-types'

const Countdown = ({count}) => (
  <h2>{count}</h2>
)

Countdown.propTypes = {
  count: PropTypes.string.isRequired
}

export default Countdown



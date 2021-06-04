import React from 'react'

const Icon = ({ name }) => {
  return (
        <svg viewBox="0 0 1 1">
          <use xlinkHref={`#${name}`}/>
        </svg>
  )
}

export default Icon

import React from 'react'
import { useRouteError } from 'react-router'

function Error() {
      const err = useRouteError();
      // console.log(err);
  return (
    <div className='route_pages'>
      <h1>Oops!!!</h1>
      <h2>Something went wrong!! 😟 😟</h2>
      {/* <h2>{err.status}: {err.statusText}</h2>
      <h2>{err.error.message  }</h2> */}
    </div>
  )
}

export default Error
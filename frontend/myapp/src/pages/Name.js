import React from 'react'
import { useSelector } from 'react-redux'

function Name() {
 const user=useSelector(state=> state.userReducer )

  return (
    <div>  {user.id} </div>
  )
}

export default Name
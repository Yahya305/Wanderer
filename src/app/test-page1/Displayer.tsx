import { useTextState } from '@lib/hooks/useTextState'
import React from 'react'

function Displayer() {
    const {text}=useTextState();
  return (
    <div>
      {text}
    </div>
  )
}

export default Displayer

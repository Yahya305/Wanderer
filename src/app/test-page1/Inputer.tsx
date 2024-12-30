"use client"
import { useTextState } from '@lib/hooks/useTextState';
import React, { useState } from 'react'

function Inputer() {

    const {text,setText}=useTextState("");
    
  return (
    <div>
      <input type="text" value={text} onChange={(e)=>setText(e.target.value)} />
    </div>
  )
}

export default Inputer

'use client'

import { useState } from 'react'

export function Welcome () {
  const [visible, setVisible] = useState(true)

  if (!visible) {
    return null
  }

  return (
    <div className='shadow' onClick={() => setVisible(false)}>
      <div className='frame'>
        <div className='subtitle'>Protect your wheels from</div>
        <div className='heading'>Pedal Pirates</div>
        <img className='vector' alt='Vector' src='vector.svg' />
        <p className='p'>
          Stay one step ahead of bike and scooter theft by knowing when and
          where incidents occur on campus, sourced by UCPD reports and
          crowd-sourced by students.
        </p>
        {/* <Arrow className="arrow-instance" /> */}
        <div className='text-wrapper-2'>Designed for DiamondHacks 2024</div>
      </div>
    </div>
  )
}

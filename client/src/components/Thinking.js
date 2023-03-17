import React from 'react'
import { MdComputer } from 'react-icons/md'
import KatImage from '../assets/kat.png';

const Thinking = () => {
  return (
    <div className='message'>
      <div className='message__wrapper flex'>
        <div className="message__pic">
          <img src={KatImage} alt="Logo de kat bot" className='rounded-full' />
        </div>
        <div className='text-left message__createdAt'>
          <div className="message__thinking">
            Pensando...
          </div>
        </div>
      </div>
    </div>
  )
}

export default Thinking
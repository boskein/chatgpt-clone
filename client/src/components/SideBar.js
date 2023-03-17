import React, { useState, useContext, useEffect } from 'react'
import { MdClose, MdMenu, MdAdd, MdOutlineLogout, MdOutlineQuestionAnswer, MdOutlineCoffee } from 'react-icons/md'
import { ChatContext } from '../context/chatContext'
import bot from '../assets/bot.ico'
import DarkMode from './DarkMode'
import { auth } from '../firebase'

/**
 * A sidebar component that displays a list of nav items and a toggle 
 * for switching between light and dark modes.
 * 
 * @param {Object} props - The properties for the component.
 */
const SideBar = () => {
  const [open, setOpen] = useState(true)
  const [, , clearMessages, limit, setLimit] = useContext(ChatContext)

  function handleResize() {
    window.innerWidth <= 640 ? setOpen(false) : setOpen(true)
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const clearChat = () => clearMessages()
  const SignOut = () => {
    if (auth.currentUser) {
      auth.signOut()
      clearChat()
      setLimit(-1)
      window.sessionStorage.clear()
    }
  }

  return (
    <section className={` ${open ? "w-72" : "w-16"} sidebar`}>
      <div className="sidebar__app-bar">
        <div className={`sidebar__app-logo ${!open && "scale-0 hidden"} `}>
          <span className='w-8 h-8'><img src={'https://firebasestorage.googleapis.com/v0/b/gauler-665ba.appspot.com/o/logos%2Febbiner-logo.png?alt=media&token=2479d59d-f9d2-4f47-9be4-f6ded9c8492b'} alt="Logo de Ebbiner" width={30} height={30} /></span>
        </div>
        <h1 className={`sidebar__app-title ${!open && "scale-0 hidden"}`}>
          Ebbiner - GPT4
        </h1>
        <div className='sidebar__btn-close' onClick={() => setOpen(!open)}>
          {open ? <MdClose className='sidebar__btn-icon' /> : <MdMenu className='sidebar__btn-icon' />}

        </div>
      </div>
      <div className="nav">
        <span className='nav__item  bg-light-white' onClick={clearChat}>
          <div className='nav__icons'>
            <MdAdd />
          </div>
          <h1 className={`${!open && "hidden"}`}>Nuevo chat</h1>
        </span>
      </div>
      {limit >= 0 &&
        <div className={`nav__msg ${!open && "scale-0 hidden"}`}>
          <p className='nav__p'>
            you have {limit} requests left today.

          </p>
        </div>}

      <div className="nav__bottom">
        <DarkMode open={open} />
        <div className="nav">
          <span className="nav__item" onClick={SignOut}>
            <div className="nav__icons">
              <MdOutlineLogout />
            </div>
            <h1 className={`${!open && "hidden"}`}>Salir</h1>
          </span>
        </div>
      </div>
    </section >
  )
}

export default SideBar
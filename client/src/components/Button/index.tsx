import React from 'react'
import { BsFillTicketPerforatedFill } from 'react-icons/bs'
import "./button.css"
type Props = {
  children?: React.ReactNode,
  onClick?:()=>void,
  width?:string
}

const Button = ({children,onClick,width}: Props) => {
  return (
        <button 
        onClick={onClick}
        style={{width:width}}
        className='btn-movie'>
        <span className='btn-movie-icon'>
                <BsFillTicketPerforatedFill />
        </span>
        {children}
        </button>
  )
}
export default Button
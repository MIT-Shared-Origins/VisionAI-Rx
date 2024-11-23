import React from 'react'

function Header() {
  return (
    <div className='flex justify-between items-center shadow-sm p-5'>
        <img src='/logo.svg' alt='logo' width={150} height={130}/>
        <ul className='hidden md:flex gap-16'>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer '></li>
            <li className='font-medium'></li>
            <li></li>
        </ul>
        
    </div>
  )
}

export default Header

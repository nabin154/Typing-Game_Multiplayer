import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FiLogOut, FiMenu } from "react-icons/fi";

const Navbar = () => {

    const [isMenuToggled, setIsMenuToggled] = useState(false);
    const handleToogle = () => {
        setIsMenuToggled(!isMenuToggled);
    }
    return (
        <div className='h-20 md:h-26 py-3  w-full custom-gradient'>
            <header className='px-6 md:px-14 flex items-center justify-between'>
                <div>
                    <NavLink to={'/home'}>
                        <img src="/logo.png" alt="logo" className='h-12 w-12 md:h-16 md:w-16' />
                    </NavLink>
                </div>
                <div className={`text-white hidden md:block `}>
                    <ul className=' md:flex gap-10 font-rubik text-lg font-semibold cursor-pointer'>
                        <li>Challenges</li>
                        <li>Modes</li>
                        <li>Statistics</li>
                    </ul>
                </div>

                <button onClick={handleToogle} className='bg-rightGradientColor text-4xl text-white md:hidden'><FiMenu /></button>
                <button className='hidden md:block bg-rightGradientColor text-4xl text-white'><FiLogOut /></button>


            </header>

            {
                isMenuToggled &&
                <div>
                    <ul className='flex flex-col items-center text-white gap-6 font-rubik text-lg font-semibold cursor-pointer'>
                        <li>Challenges</li>
                        <li>Modes</li>
                        <li>Statistics</li>
                        <li>  <button className=' bg-rightGradientColor text-4xl text-white'><FiLogOut /></button></li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default Navbar

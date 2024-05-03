import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiLogOut, FiMenu } from "react-icons/fi";
import NavList from './NavList';

const Navbar = () => {
    
    const navigate = useNavigate();
    const [isMenuToggled, setIsMenuToggled] = useState(false);
    const handleToogle = () => {
        setIsMenuToggled(!isMenuToggled);
    }
    return (
        <div className='min-h-20 md:h-26 py-3  w-full custom-gradient'>
            <header className='px-6 md:px-14 flex items-center justify-between'>
                <div>
                    <NavLink to={'/home'}>
                        <img src="/logo.png" alt="logo" className=' h-12 w-12 md:h-16 md:w-16' />
                    </NavLink>
                </div>
                <div className={`text-white hidden md:block `}>
                    <NavList className={'md:flex gap-10 font-rubik text-lg font-semibold cursor-pointer'}
                        isMenuToggled={isMenuToggled} />

                </div>

                <button onClick={handleToogle} className='bg-rightGradientColor text-3xl text-white md:hidden'><FiMenu /></button>
                <button
                    onClick={() => navigate('/')}
                    className='hidden md:block bg-rightGradientColor text-4xl text-white hover:text-purple-500'><FiLogOut /></button>


            </header>

            {isMenuToggled &&
                <div>
                    <NavList className={'flex flex-col items-center text-white gap-6 font-rubik text-lg font-semibold cursor-pointer '}
                        isMenuToggled={isMenuToggled} />
                </div>
            }
        </div>
    )
}

export default Navbar

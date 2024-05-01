import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiLogOut, FiMenu } from "react-icons/fi";
import { GiPlayerTime } from "react-icons/gi";
import { BsBarChartFill } from "react-icons/bs";
import { ImStatsDots } from "react-icons/im";

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
                    <ul className=' md:flex gap-10 font-rubik text-lg font-semibold cursor-pointer '>
                        <li className='hover:text-purple-500 flex items-center'> <GiPlayerTime className='mr-2' size={'17px'} />Challenges </li>
                        <li className='hover:text-purple-500 flex items-center'><BsBarChartFill className='mr-2' size={'17px'} />Modes</li>
                        <li className='hover:text-purple-500 flex items-center'><ImStatsDots className='mr-2' size={'17px'} />Stats</li>
                    </ul>
                </div>

                <button onClick={handleToogle} className='bg-rightGradientColor text-3xl text-white md:hidden'><FiMenu /></button>
                <button
                    onClick={() => navigate('/')}
                    className='hidden md:block bg-rightGradientColor text-4xl text-white hover:text-purple-500'><FiLogOut /></button>


            </header>

            {
                isMenuToggled &&
                <div>
                    <ul className='flex flex-col items-center text-white gap-6 font-rubik text-lg font-semibold cursor-pointer '>
                        <li className='hover:text-purple-500 flex items-center'> <GiPlayerTime className='mr-2' size={'17px'} />Challenges </li>
                        <li className='hover:text-purple-500 flex items-center'><BsBarChartFill className='mr-2' size={'17px'} />Modes</li>
                        <li className='hover:text-purple-500 flex items-center'><ImStatsDots className='mr-2' size={'17px'} />Stats</li>
                        <li>  <button className=' bg-rightGradientColor text-4xl text-white'><FiLogOut /></button></li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default Navbar

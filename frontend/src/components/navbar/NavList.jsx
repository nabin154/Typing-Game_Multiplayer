import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiLogOut } from "react-icons/fi";
import { GiPlayerTime } from "react-icons/gi";
import { ImStatsDots } from "react-icons/im";
import ModesModal from '../Modal/ModesModal';


const NavList = ({ className, isMenuToggled, handleLogout }) => {

    return (
        <ul className={className}>
            <li className='hover:text-purple-500 '>
                <NavLink to={'/home'} className={'flex items-center'}> <GiPlayerTime className='mr-2' size={'17px'} />Challenges </NavLink></li>
            <li ><ModesModal /></li>
            <li>
                <NavLink to={'/stats'} className={'hover:text-purple-500 flex items-center'}><ImStatsDots className='mr-2' size={'17px'} />Stats</NavLink></li>
            {isMenuToggled &&
                <button
                    onClick={handleLogout}
                    className=' bg-rightGradientColor text-4xl text-white hover:text-purple-500'><FiLogOut /></button>
            }
        </ul>
    )
}

export default NavList

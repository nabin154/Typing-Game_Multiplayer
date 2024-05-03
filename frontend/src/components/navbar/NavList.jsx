import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiLogOut} from "react-icons/fi";
import { GiPlayerTime } from "react-icons/gi";
import { BsBarChartFill } from "react-icons/bs";
import { ImStatsDots } from "react-icons/im";


const NavList = ({ className, isMenuToggled }) => {

    return (
        <ul className={className}>
            <li className='hover:text-purple-500 '>
                <NavLink to={'/stats'} className={'flex items-center'}> <GiPlayerTime className='mr-2' size={'17px'} />Challenges </NavLink></li>
            <li className='hover:text-purple-500 flex items-center'><BsBarChartFill className='mr-2' size={'17px'} />Modes</li>
            <li className='hover:text-purple-500 flex items-center'><ImStatsDots className='mr-2' size={'17px'} />Stats</li>
            {isMenuToggled &&
                <button
                    onClick={() => navigate('/')}
                    className=' bg-rightGradientColor text-4xl text-white hover:text-purple-500'><FiLogOut /></button>
            }
        </ul>
    )
}

export default NavList

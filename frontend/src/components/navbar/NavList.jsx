import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiLogOut } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { ImStatsDots } from "react-icons/im";
import ModesModal from '../Modal/ModesModal';
import ChallengesModal from '../Modal/ChallengesModal';
import { useTypingData } from '../../Context/DataProvider';


const NavList = ({ className, isMenuToggled, handleLogout }) => {

    const { setTestStarted } = useTypingData();

    return (
        <ul className={className}>
            <li onClick={
                () => setTestStarted(false)
            }>
                <NavLink to={'/home'} className={'hover:text-purple-500 flex items-center'}><AiFillHome className='mr-2' size={'17px'} />Home</NavLink></li>
            <li><ChallengesModal /> </li>
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

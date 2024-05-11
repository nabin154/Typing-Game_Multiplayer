import React, { useEffect, useRef, useState } from 'react';
import { GiPlayerTime } from 'react-icons/gi';
import OnlineUserList from '../UI/OnlineUserList';
import { useUser } from '../../Context/UserProvider';

const ChallengesModal = () => {
    const { onlineUsers } = useUser();
    const [showChallengeModal, setShowChallengeModal] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        const isClickedOutside = (e) => {
            if (showChallengeModal && modalRef.current && !modalRef.current.contains(e.target)) {
                setShowChallengeModal(false);
            }
        };

        document.addEventListener('mousedown', isClickedOutside);

        return () => {
            document.removeEventListener('mousedown', isClickedOutside);
        };
    }, [showChallengeModal]);

    const handleModal = () => {
        setShowChallengeModal(!showChallengeModal);
    };

    const handleClose = () => {
        setShowChallengeModal(false);
    }

    return (
        <div>
            <div onClick={handleModal} className='hover:text-purple-500 flex items-center'>
                <GiPlayerTime className='mr-2' size={'17px'} />Challenges
            </div>

            {showChallengeModal && (
                <div
                    ref={modalRef}
                    className='absolute top-20 border-white border right-[1%] md:right-[34%] z-10 shadow bg-rightGradientColor rounded-2xl h-80 w-96 p-4 overflow-y-auto'
                >
                    {onlineUsers.length > 0 ? (
                        <OnlineUserList />
                    ) : (
                        <p className='text-center text-2xl mt-20'>No users online</p>
                    )}

                    <button
                        onClick={handleClose}
                        className='absolute top-1 right-1 bg-red-500 px-2 text-sm py-1 rounded-md'>X</button>
                </div>
            )}
        </div>
    );
};

export default ChallengesModal;

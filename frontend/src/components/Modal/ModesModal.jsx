import React, { useEffect, useRef, useState } from 'react';
import { BsBarChartFill } from 'react-icons/bs';
import { useTypingData } from '../../Context/DataProvider';

const ModesModal = () => {


    const { difficultyMode, setDifficultyMode } = useTypingData();
    const [showModeModal, setShowModeModal] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        const isClickedOutside = (e) => {
            if (showModeModal && modalRef.current && !modalRef.current.contains(e.target)) {
                setShowModeModal(false);
            }
        };
        document.addEventListener('mousedown', isClickedOutside);
        return () => {
            document.removeEventListener('mousedown', isClickedOutside);
        };
    }, [showModeModal]);

    const handleModal = () => {
        setShowModeModal(!showModeModal);

    };

    const handleChange = (e) => {
        setDifficultyMode(e.target.value);
    };

    const handleClose = () => {
        setShowModeModal(false);
    };
    return (
        <div>
            <div onClick={handleModal} className='hover:text-purple-500 flex items-center'>
                <BsBarChartFill className='mr-2' size={'17px'} />Modes
            </div>

            {showModeModal && (
                <div
                    ref={modalRef}
                    className='absolute top-20 border-white border right-[30%] z-10 shadow bg-rightGradientColor rounded-2xl h-56 w-56 p-4'
                >
                    <div className='flex flex-col items-left px-4'>
                        <div className='flex items-center gap-5 text-xl mt-4 '>
                            <input
                                type='radio'
                                id='easy'
                                name='difficulty'
                                value='easy'
                                checked={difficultyMode == 'easy'}
                                onChange={handleChange}
                                className='appearance-none rounded-full border-2 border-purple-500 checked:bg-purple-500 checked:border-transparent h-5 w-5 cursor-pointer flex-shrink-0'
                            />
                            <label htmlFor='easy' className='cursor-pointer'>Easy</label>
                        </div>
                        <div className='flex items-center gap-5 text-xl mt-4'>
                            <input
                                type='radio'
                                id='medium'
                                name='difficulty'
                                value='medium'
                                checked={difficultyMode == 'medium'}
                                onChange={handleChange}
                                className='appearance-none rounded-full border-2 border-purple-500 checked:bg-purple-500 checked:border-transparent h-5 w-5 cursor-pointer flex-shrink-0'
                            />
                            <label htmlFor='medium' className='cursor-pointer'>Medium</label>
                        </div>
                        <div className='flex items-center gap-5 text-xl mt-4'>
                            <input
                                type='radio'
                                id='difficult'
                                name='difficulty'
                                value='difficult'
                                checked={difficultyMode == 'difficult'}
                                onChange={handleChange}
                                className='appearance-none rounded-full border-2 border-purple-500 checked:bg-purple-500 checked:border-transparent h-5 w-5 cursor-pointer flex-shrink-0'
                            />
                            <label htmlFor='difficult' className='cursor-pointer'>Difficult</label>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className='absolute top-1 right-1 bg-red-500 px-2 text-sm py-1 rounded-md'>X</button>
                </div>
            )}
        </div>
    );
};

export default ModesModal;

import React from 'react';
import { useTypingData } from '../../Context/DataProvider';
import { useUser } from '../../Context/UserProvider';

const RacerChallengerUser = () => {
    const { user , challengerData } = useUser();
    const { margin } = useTypingData();

    return (

        <div className='h-20 w-full border-b-2 border-white border-dotted p-2 relative mt-4'>
            {challengerData && challengerData.user &&
            <div className='absolute top-0 left-0' style={{ marginLeft: `${margin}%` }}>
                    <img src={challengerData.user.image} alt="" className='h-10 w-10 object-cover' style={{ borderRadius: '50%' }} />
                    <h3 className='text-white'>{challengerData.user.name.split(' ')[0]}</h3>
            </div>
}
        </div>
    );
};

export default RacerChallengerUser;

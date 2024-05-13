import React, { useEffect, useState } from 'react';
import { useUser } from '../../Context/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useTypingData } from '../../Context/DataProvider';

const Notification = () => {
    const navigate = useNavigate();
    const { setTestStarted ,setStartTest,setTypedText,setErrorCount} = useTypingData();
    const { challengerData, setChallengerData, socket, user } = useUser();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (challengerData && challengerData.user && user && challengerData.challenger !== user._id) {
            setShowModal(true);
        }
    }, [challengerData.user])

    const handleAccept = () => {
        const data = { challenger: challengerData.user, user: user }
        socket.emit("challenge accepted", data);
        setShowModal(false);
        navigate('/home');
        setTestStarted(true);
        setStartTest(false);
        setTypedText('');
        setErrorCount(0);

    }
    const handleReject = () => {
        socket.emit("challenge rejected", challengerData.user);
        setShowModal(false);
        setChallengerData({ challenger: '', user: '', mode: '', paragraph: null });

    }

    return (
        <>
            {challengerData && challengerData.user && showModal &&
                <div className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white p-8 rounded-lg w-80 flex flex-col items-center custom-table-gradient border">
                        <div className="w-full text-center font-rubik">
                            <h2 className="text-lg font-semibold text-white ">{challengerData.user.name.split(' ')[0]} challenged you !</h2>

                        </div>
                        <img src={challengerData.user.image} alt={challengerData.user.name} className=" shadow-md shadow-white mt-4 w-32 h-32 object-cover mb-4 rounded-full" />
                        <div className="flex justify-between w-full">
                            <button
                                onClick={handleAccept} className="px-4 py-2 bg-green-500 font-semibold text-white rounded-md hover:bg-green-600 mr-2">
                                Accept
                            </button>
                            <button onClick={handleReject}
                                className="px-4 py-2 bg-red-500 font-semibold text-white rounded-md hover:bg-red-600 ml-2">
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Notification;

import React, { useEffect, useState } from 'react';
import RacingBox from './RacingBox';
import { useTypingData } from '../../Context/DataProvider';
import { useToast } from '../../Context/ToastProvider';
import CompletedModal from '../Modal/CompletedModal';
import { addStats } from '../../API/apis';
import { useUser } from '../../Context/UserProvider';
import { paragraphs, timeForModes } from '../../data/paragraph';
import WinnerModal from '../Modal/WinnerModal';



const TypingTest = () => {
    const { user, setOnlineUsers, challengerData, setChallengerData, socket } = useUser();
    const { startTestTime, setStartTestTime, completed,setCompleted, margin, setMargin, paragraph, setParagraph, seconds, setSeconds, setDifficultyMode, difficultyMode } = useTypingData();
    const { showToast } = useToast();
    const [startTest, setStartTest] = useState(false);
    const [startTimer, setStartTimer] = useState(4);
    const [typedText, setTypedText] = useState('');
    const [errorCount, setErrorCount] = useState(0);
    const [classType, setClassType] = useState('bright');
    
    const [wpm, setWpm] = useState(0);
    const [timeTaken, setTimeTaken] = useState();

    useEffect(() => {
        if (challengerData.mode && challengerData.paragraph) {
            setParagraph(challengerData.paragraph);
            setDifficultyMode(challengerData.mode);
            handleStart();
        }
    }, [challengerData.mode, challengerData.paragraph]);


    const getParagraph = () => {
        const paragraphsData = paragraphs[difficultyMode];
        const index = Math.floor(Math.random() * paragraphsData.length);
        return paragraphsData[index];
    }

    useEffect(() => {
        setParagraph(getParagraph());
        setSeconds(timeForModes[difficultyMode]);
    }, [difficultyMode]);




    //CountDown Timer when start button is clicked
    useEffect(() => {
        if (startTest && startTimer > 0) {
            const timer = setTimeout(() => {
                setStartTimer(startTimer - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [startTest, startTimer]);


    const postStats = async () => {
        let data = {
            mode: difficultyMode,
            wpm: Number(wpm),
            errors: Number(errorCount),
            timeTaken: Number(timeTaken)
        };
        try {
            const response = await addStats(data);
            if (response) {
                console.log(response.data.message);
            }

        } catch (error) {
            console.log(error.message);
        }
    };


    //calculating the words per minutes
    const calculateWPM = () => {
        const endTime = new Date();
        const timeInSeconds = (endTime - startTestTime) / 1000;
        const wordsTyped = typedText.split(' ').length;
        const timeInMinutes = timeInSeconds / 60;
        const wpmValue = Math.round(wordsTyped / timeInMinutes);
        setWpm(wpmValue);
        setTimeTaken(Number(timeInSeconds.toFixed(2)));

    };


    // after completion rendering
    useEffect(() => {
        if (completed && !wpm && !timeTaken) {
            calculateWPM();
        }
        if (completed && challengerData && challengerData.user) {
            if (wpm && timeTaken) {
                const data = { wpm: wpm, timeTaken: timeTaken, errors: errorCount, id: challengerData.user._id }
                socket.emit('completed', data);
            }
        }

    }, [completed, challengerData, wpm, timeTaken]);

    //to post the data to the database
    useEffect(() => {
        if ((completed && seconds <= 0) || (completed && typedText.length === paragraph.length)) {
            if (wpm && timeTaken && !challengerData.user) {
                setTimeout(() => {
                    postStats();
                }, 1000);
            }
        }
    }, [calculateWPM]);


    //main function for typing test
    const handleTyping = (event) => {
        if (!startTest || startTimer >= 1 || completed) return;
        if (typedText.length === paragraph.length - 1) setCompleted(true);
        const typedChar = event.key;
        const currentCharIndex = typedText.length;
        const currentChar = paragraph[currentCharIndex];

        if (typedChar === ' ') {
            event.preventDefault();
        }

        if (event.key === currentChar) {
            setTypedText(typedText + typedChar);
            setClassType('bright');
            if (!startTestTime) {
                setStartTestTime(new Date());
            }

        } else {
            setErrorCount(errorCount + 1);
            setClassType('incorrect');
        }

        // To make the racer user to move in racing box
        let length = typedText.split(' ').length;
        if (typedChar === ' ' && (length % 2) === 0 && margin < 90) {
            setMargin(prevMargin => prevMargin + 2);
            if (challengerData && challengerData.user) {
                const data = { id: challengerData.user._id, margin: margin };
                socket.emit("margin", data);
            }
            return;
        }

    };

    // spliting the each letters and adding them to span tag
    const renderParagraph = (text) => {
        return text.split('').map((letter, index) => {
            let className = index === typedText.length ? classType : 'normal';
            if (index < typedText.length) {
                className = letter === typedText[index] ? 'correct' : 'incorrect';
            }
            return <span key={index} className={className}>{letter}</span>;
        });
    };


    //function to start and reset typing
    const handleStart = () => {
        if (challengerData.challenger && challengerData.user && challengerData.challenger !== user._id && !challengerData.mode && !challengerData.paragraph) {
            showToast("Your challenger will start the game!", 'warning', 4000);
            return;
        }
        if (challengerData.user && !challengerData.mode && !challengerData.paragraph) {
            const data = {
                mode: difficultyMode,
                paragraph: paragraph,
                user: challengerData.user,
            };
            socket.emit("game started", data);
        }
        setStartTest(!startTest);
        setCompleted(false);
        if (startTest) {
            setClassType('bright');
            setErrorCount(0);
            setCompleted(true);
            setTypedText('');
            setStartTimer(4);
            setStartTestTime(null);
            setWpm(0);
            setMargin(0);
            setSeconds(timeForModes[difficultyMode]);
            setTimeTaken(null);
        }
    };


    // resetting everything to initial state
    const handleClose = () => {
        setCompleted(false);
        setStartTest(false);
        setClassType('bright');
        setErrorCount(0);
        setTypedText('');
        setStartTimer(4);
        setStartTestTime(null);
        setWpm(0);
        setMargin(0);
        setSeconds(timeForModes[difficultyMode]);
        setTimeTaken(null);
        setChallengerData({ challenger: '', user: '', mode: '', paragraph: null });

    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2' onKeyDown={handleTyping} tabIndex={-1}>
            <section>
                <div className='ml-4 px-10 py-8 flex flex-col items-center text-justify break-words relative'>
                    {startTest && startTimer >= 1 &&
                        <span className='absolute top-[25%] left-[50%] text-red-500 text-6xl font-bold'>{startTimer}</span>
                    }
                    <p className='text-white font-rubik text-xl'>{renderParagraph(paragraph)}</p>
                    <button
                        className='mt-10 px-6 py-2 font-rubik font-semibold flex items-center text-white bg-purple-800 rounded-lg border-none outline-none text-md hover:bg-purple-500'
                        onClick={handleStart}>{!startTest ? 'Start Now' : 'Retry'}</button>
                </div>
                <div className='flex gap-6 px-14 items-center'>
                    <h3 className='text-2xl font-rubik font-semibold text-red-600'>Errors : {errorCount}</h3>
                    <h3 className='text-2xl font-rubik font-semibold text-white'>Wpm : <span className='text-green-500'>
                        {wpm}</span> </h3>
                </div>
            </section>
            <section className='h-full w-full hidden md:block'>
                <RacingBox
                    startTest={startTest}
                    startTimer={startTimer}
                    completed={completed}
                    setCompleted={setCompleted} />
            </section>
            <section>
                {completed && challengerData && challengerData.user ?
                    <WinnerModal 
                        completed={completed}
                        handleClose={handleClose}
                        wpm={wpm}
                        timeTaken={timeTaken}
                        errorCount={errorCount} /> :
                    <CompletedModal
                        completed={completed}
                        handleClose={handleClose}
                        wpm={wpm}
                        timeTaken={timeTaken}
                        errorCount={errorCount} />
                }
            </section>
        </div>
    );
};

export default TypingTest;

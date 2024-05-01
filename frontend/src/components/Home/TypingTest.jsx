import React, { useEffect, useState } from 'react';
import RacingBox from './RacingBox';

const TypingTest = () => {
    const [startTest, setStartTest] = useState(false);
    const [startTimer, setStartTimer] = useState(4);
    const [typedText, setTypedText] = useState('');
    const [errorCount, setErrorCount] = useState(0);
    const [classType , setClassType] = useState('bright');

    let paragraph = 'In the heart of a bustling city, amidst the cacophony of honking horns and hurried footsteps, lies a quaint cafe. Its walls adorned with vintage photographs and the aroma of freshly brewed coffee wafting through the air create a haven of tranquility. Patrons, lost in conversation or buried in books, find solace in its cozy embrace. Here, time slows down, and worries dissolve, as each sip brings a moment of respite from the chaos outside.';

    useEffect(() => {
        if (startTest && startTimer > 0) {
            const timer = setTimeout(() => {
                setStartTimer(startTimer - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [startTest, startTimer]);



    const handleTyping = (event) => {
        if (!startTest || startTimer >= 1) return;
        const typedChar = event.key;
        const currentCharIndex = typedText.length;
        const currentChar = paragraph[currentCharIndex];

        if (typedChar === currentChar) {
            setTypedText(typedText + typedChar);
            setClassType('bright')
        } else {
            setErrorCount(errorCount + 1);
            setClassType('incorrect');
            // setTypedText(typedText + typedChar);
        }
    };

    const renderParagraph = (text) => {
        return text.split('').map((letter, index) => {
            let className = index == typedText.length?classType:'normal'
            if (index < typedText.length) {
                className = letter === typedText[index] ? 'correct' : 'incorrect';
            }
            return <span key={index} className={className}>{letter}</span>;
        });
    };

    const handleStart = () =>{
        setStartTest(!startTest);
        if(startTest && startTimer >0){
            setClassType('bright');
            setErrorCount(0);
            setTypedText('');
            setStartTimer(4);
        }
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2' onKeyDown={handleTyping} tabIndex={-1}>
            <section>
                <div className='ml-4 px-10 py-8 flex flex-col items-center text-justify break-words relative'>
                    {startTest && startTimer >= 1 &&
                        <span className='absolute top-[25%] left-[50%] text-red-500 text-6xl font-bold'>{startTimer}</span>
                    }
                    <p className='text-white font-rubik text-xl'>{renderParagraph(paragraph)}</p>
                    <button className='mt-10 px-6 py-2 font-rubik font-semibold flex items-center text-white bg-purple-800 rounded-lg border-none outline-none text-md hover:bg-purple-500'
                        onClick={handleStart}>{!startTest?'Start Now':'Retry'}</button>
                </div>
            </section>
            <section className='h-full w-full hidden md:block'>
                <RacingBox
                    startTest={startTest}
                    startTimer={startTimer} />
            </section>
        </div>
    );
};

export default TypingTest;

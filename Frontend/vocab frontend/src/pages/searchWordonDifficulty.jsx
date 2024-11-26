


import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchWordonDifficulty = () => {
    const [wordDifficulty, setWordDifficulty] = useState('');
    const location = useLocation();
    const words = location.state?.words || [];
    const user = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
    const [selectedWords, setSelectedWords] = useState([])


    const handleDifficulty = async (e) => {
        const selectedDifficulty = e.target.value;
        setWordDifficulty(selectedDifficulty)
        const token = user.data.token;
        try {
            const res = await fetch('http://localhost:5000/api/word/difficult-word', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            const data = await res.json();
            console.log(data)
            setSelectedWords(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    console.log(selectedWords)

    const filteredWords = selectedWords.filter((word) =>
        word.difficulty.toLowerCase() === wordDifficulty.toLowerCase()
    )
    console.log(filteredWords)

    return (
        <div className="flex flex-col justify-center items-center m-20 relative">
            <div>
                <label
                    htmlFor="questionLimit"
                    className="mr-3 lg:text-3xl sm:text-xl text-black"
                >
                    Select the level of difficulty:
                </label>
                <select
                    id="worddifficulty"
                    value={wordDifficulty}
                    onChange={handleDifficulty}
                    className="border px-3 py-2 hover:cursor-pointer hover:border-blue-500 text-black text-xl"
                >
                    <option value="">Select Difficulty</option>
                    <option className='capitalize' value="Easy">Easy</option>
                    <option className='capitalize' value="Medium">Medium</option>
                    <option className='capitalize' value="Difficult">Hard</option>
                </select>
            </div>

            <div className='text-black p-5 gap-4  absolute left-5 top-24 grid grid-cols-3'>
                {filteredWords.map((word, index) => (
                    <div className='p-5 border gap-2 space-y-2' key={index}>
                        <h1 className='text-xl font-bold text-center capitalize'>{word.word}</h1>
                        <p><span className='font-semibold'>Meaning: </span>{word.meaning}</p>
                        <p><span className='font-semibold'>Sentence: </span>{word.sentence}</p>
                    </div>
                )
                )}
            </div>



        </div>
    );
};


export default SearchWordonDifficulty;

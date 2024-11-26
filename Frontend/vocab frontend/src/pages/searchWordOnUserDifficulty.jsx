import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const SearchWordOnUserDifficulty = () => {
    const [wordDifficulty, setWordDifficulty] = useState('');
    const location = useLocation()
    const words = location.state;

    const handleDifficulty = (e) => {
        setWordDifficulty(e.target.value)
    }

    const filteredWords = words.words.filter(
        (word) => Array.isArray(word.userDifficulty) && word.userDifficulty.length > 0
    );
    console.log(filteredWords)

    const entries = filteredWords.flatMap((word) =>
        word.userDifficulty.filter((entry) => entry.difficulty.toLowerCase() === wordDifficulty.toLowerCase()
        ).map((entry) => ({
            ...entry,
            meaning: word.meaning,
            sentence: word.sentence
        }))
    )
    console.log(entries);

    // const entries = filteredWords.reduce((acc, word) => {
    //     const matches = word.userDifficulty.filter(
    //         (entry) => entry.difficulty.toLowerCase() === wordDifficulty.toLowerCase()
    //     );
    //     return acc.concat(matches); // Add matches to the accumulator
    // }, []);

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
                {entries.map((word, index) => (
                    <div className='p-5 border gap-2 space-y-2' key={index}>
                        <h1 className='text-xl font-bold text-center capitalize'>{word.word}</h1>
                        <p><span className='font-semibold'>Meaning: </span>{word.meaning}</p>
                        <p><span className='font-semibold'>Sentence: </span>{word.sentence}</p>
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default SearchWordOnUserDifficulty

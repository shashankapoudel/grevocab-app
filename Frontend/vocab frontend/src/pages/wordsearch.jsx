// import { useState } from "react";


// const Wordsearch = () => {
//     const [word, setWord] = useState('')
//     const [wordData, setWordData] = useState(null)

//     const handleWordChange = (e) => {
//         setWord(e.target.value)
//     }


//     const fetchWordData = async () => {
//         const res = await fetch(`http://localhost:5000/api/wordic?word=${word}`);
//         const data = await res.json()
//         console.log(data);
//         setWordData(data)

//     }


//     return (
//         <div className="flex flex-col justify-center items-center">
//             <h1 className="text-2xl font-bold mb-4">Search for a Word</h1>
//             <div className="flex gap-5">
//                 <input
//                     type="text"
//                     value={word}
//                     onChange={handleWordChange}
//                     placeholder="Enter a word"
//                     className="border p-2 mb-4"
//                 />
//                 <button onClick={fetchWordData} className="bg-blue-500 text-white  px-4">
//                     Search
//                 </button>
//             </div>

//             <div className="mt-6">
//                 <h2 className="text-xl font-bold">{wordData.word}</h2>
//                 <p><strong>Meaning:</strong>{wordData.meaning} </p>
//                 <p><strong>Example:</strong> {wordData.example}</p>
//             </div>

//         </div>
//     )
// }

// export default Wordsearch



// import { useState } from "react";

// const Wordsearch = () => {
//     const [word, setWord] = useState('');
//     const [wordData, setWordData] = useState(null);

//     const handleWordChange = (e) => {
//         setWord(e.target.value);
//     };

//     const fetchWordData = async () => {
//         try {
//             const res = await fetch(`http://localhost:5000/api/wordic?word=${word}`);
//             if (!res.ok) {
//                 throw new Error('Failed to fetch word data');
//             }
//             const data = await res.json();
//             setWordData(data);
//         } catch (error) {
//             console.error("Error fetching word data:", error);
//         }
//     };

//     return (
//         <div className="flex flex-col justify-center items-center">
//             <h1 className="text-2xl font-bold mb-4">Search for a Word</h1>
//             <div className="flex gap-5">
//                 <input
//                     type="text"
//                     value={word}
//                     onChange={handleWordChange}
//                     placeholder="Enter a word"
//                     className="border p-2 mb-4"
//                 />
//                 <button onClick={fetchWordData} className="bg-blue-500 text-white  px-4">
//                     Search
//                 </button>
//             </div>

//             {/* Conditionally render word data when available */}
//             {wordData && (
//                 <div className="mt-6">
//                     <h2 className="text-xl font-bold">{wordData.word}</h2>
//                     <p><strong>Meaning:</strong> {wordData.meaning}</p>
//                     <p><strong>Example:</strong> {wordData.example}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Wordsearch;



import { useState } from 'react';

const Wordsearch = () => {
    const [word, setWord] = useState('');
    const [wordData, setWordData] = useState(null);
    const [error, setError] = useState(null);


    const handleWordChange = (e) => {
        setWord(e.target.value);
        setWordData(null)
    };


    const fetchWordData = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/wordic?word=${word}`);
            const data = await res.json();

            if (res.ok) {
                setWordData(data);
                setError(null);
            } else {
                setWordData(null);
                setError('Word not found or API issue');
            }

        } catch (err) {
            console.error("Error fetching word data:", err);
            setError('An error occurred while fetching the data.');
        }
    };

    return (
        <div className="flex flex-col  justify-center items-center w-full h-screen bg-[#FAF8FF]">
            <div className='bg-white w-1/2 h-2/3 flex flex-col justify-center items-center p-2'>

                <h1 className="text-2xl font-bold mb-4">Search for a Word</h1>
                <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
                    <input
                        type="text"
                        value={word}
                        onChange={handleWordChange}
                        placeholder="Enter a word"
                        className="border border-gray-400 px-6 py-3 w-full sm:w-96 rounded-lg"
                    />
                    <button
                        onClick={fetchWordData}
                        className="border bg-blue-500 text-white px-7 py-2 rounded-lg hover:bg-white hover:text-black transition-all w-full sm:w-auto hover:border-black"
                    >
                        Search
                    </button>
                </div>

                <div className="mx-4 mt-10 py-2 gap-2">
                    {error && <p className="text-red-500">{error}</p>}
                    {wordData ? (
                        <>
                            <h2 className="text-4xl font-semibold text-center">{wordData.word}</h2>
                            <p className='text-xl'><strong>Meaning:</strong> {wordData.meaning}</p>
                            <p className='text-xl'><strong>Example:</strong> {wordData.example}</p>
                        </>
                    ) : (
                        <p>No word found. Try searching for another word.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Wordsearch;

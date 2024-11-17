import React, { useEffect } from 'react'

const NoteBook = ({ note, setNote, words, currentWordIndex, user, toast, }) => {
    // console.log(words, currentWordIndex);

    const handleSaveNote = async () => {
        const wordToAdd = words[currentWordIndex]
        const wordId = wordToAdd._id;
        const token = user.data.token;
        try {
            const res = await fetch('http://localhost:5000/api/word/note', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ note, wordId, wordToAdd })
            })
            if (res.ok) {

                toast.success("Note saved successfully!");
            } else {
                console.log('Failed to save note');
                toast.error("Failed to save note");
            }
        } catch (error) {
            console.log("Error", error)
        }
    }
    return (
        <div className='flex flex-col w-full mx-auto bg-gray-300 p-6'>
            <textarea
                placeholder='Add your personal note for this word'
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className='w-full p-2 rounded border border-gray-300 text-gray-700 resize-none'
                rows="6"
                cols="34"

            />
            <button
                className='text-black'
                onClick={handleSaveNote}>
                Save Note
            </button>
        </div>
    )
}

export default NoteBook

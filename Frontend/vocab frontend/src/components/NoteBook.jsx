import React, { useEffect } from 'react'

const NoteBook = ({ note, setNote, words, currentWordIndex, user, toast, }) => {
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
        <div className="flex flex-col w-full  mx-auto border bg-white">
            <textarea
                placeholder="Add your personal note for this word"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-1 rounded border  text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                rows="3"
                cols="30"
            />
            <button
                className=" text-black py-2 px-2 rounded hover:bg-blue-200 transition duration-300 text-center"
                onClick={handleSaveNote}
            >
                Save Note
            </button>
        </div>

    )
}

export default NoteBook

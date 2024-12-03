import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";

const Leaderboard = () => {
    const navigate = useNavigate()
    const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    // console.log(user);
    const [leaderboardteam, setLeaderboardteam] = useState([])


    const handleClick = async () => {
        const token = user.data.token;
        // console.log(token);
        try {
            const res = await fetch('http://localhost:5000/api/leaderboard', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            const data = await res.json();
            setLeaderboardteam(data.data)
            // console.log(data.data);
            navigate('/scoretracker/leadertable', { state: { leaderboardteam: data.data } })
        } catch (error) {
            console.log("error", error);

        }
    }

    return (
        <div className='mt-30 flex justify-center items-center  bg-[#0056D10D] text-gray-800 p-10 '>
            <button className='flex hover:translate-x-1 hover:text-blue-700 font-semibold text-2xl' onClick={handleClick}>See Leaderboard
                <FaArrowRight className='ml-1 mt-1' />
            </button>
        </div>
    )
}

export default Leaderboard

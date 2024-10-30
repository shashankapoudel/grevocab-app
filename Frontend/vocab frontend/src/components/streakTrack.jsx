import React, { useState, useEffect } from 'react';

const StreakTracker = () => {
    const [streakCount, setStreakCount] = useState(0);
    const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    // console.log(user);


    const getStreakData = async () => {
        const token = user.data.token;
        try {
            const res = await fetch('http://localhost:5000/api/user/streak', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await res.json();
            // console.log(data);

            setStreakCount(data.data);
        } catch (error) {
            console.error('Error fetching streak:', error);
        }
    };

    useEffect(() => {
        getStreakData();
    }, []);
    // console.log(streakCount);


    return (
        <div className="bg-[#0056D10D] shadow p-5 rounded-lg flex flex-col justify-center items-center mt-32 ">
            <h2 className="text-2xl font-bold mb-3">Current Learning Streak</h2>
            <p className="text-xl ">
                You have a <strong>{streakCount}-day</strong> streak! Keep it up!
            </p>
        </div>
    );
};

export default StreakTracker;

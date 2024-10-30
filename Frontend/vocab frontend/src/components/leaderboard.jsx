import React from 'react'

const Leaderboard = () => {

    const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    console.log(user);
    const [leaderboardteam, setLeaderboardteam] = useState([])


    const handleClick = async () => {
        const token = user.data.token;
        console.log(token);
        try {
            const res = await fetch('http://localhost:5000/api/leaderboard', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            const data = await res.json();
            console.log(data);

        } catch (error) {
            console.log("error", error);

        }

    }
    return (
        <div className='mt-30 flex justify-center items-center  bg-black'>
            <h1 onClick={handleClick}>See Leaderboard</h1>
        </div>
    )
}

export default Leaderboard

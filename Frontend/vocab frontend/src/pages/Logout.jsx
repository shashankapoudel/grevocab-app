import { useNavigate } from "react-router-dom";


const Logout = ({setUser}) => {
    const navigate =useNavigate()
    const handleLogout=()=>{
        console.log(localStorage.getItem('userInfo')); 
        localStorage.removeItem('userInfo')
        setUser(null)
        navigate('/login')
    }
  return (
    <div className="text-right  bg-gray-700">
        <button onClick={handleLogout} className=" px-4 py-1 mt-1 rounded-lg  text-white "
        >Logout</button>
    </div>
  )
}

export default Logout
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";


const Logout = ({ setUser }) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    console.log(localStorage.getItem('userInfo'));
    localStorage.removeItem('userInfo')
    setUser(null)
    navigate('/login')
  }
  return (
    <div className="text-right  bg-gray-800">
      <button onClick={handleLogout} className="border border-gray-800 px-5 mt-1 rounded-lg  text-white hover:border-pink-200"
      >
        <IoIosLogOut className="text-4xl hover:text-pink-200 hover:translate-x-1" />
      </button>

    </div>
  )
}

export default Logout
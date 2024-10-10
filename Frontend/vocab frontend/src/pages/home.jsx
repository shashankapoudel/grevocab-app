
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";

const Home = () => {

    return (

        <div className='grid lg:grid-cols-3 md:grid-cols-2  sm:grid-cols-1 gap-5 p-5 sm:p-8 md:p-10 lg:p-24 min-h-screen bg-gray-900 '>
            <div className='flex justify-center items-center h-60 sm:h-64 md:h-72 bg-gray-700  mt-10 sm:mt-6  p-4 w-full '>
                <Link to="/wordcontainer" className='text-white font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl flex items-center justify-center hover:translate-x-2 hover:text-purple-200'>
                    Word Container
                    <FaArrowRight className='ml-2 mt-1 ' />
                </Link>
            </div>

            <div className='flex justify-center items-center h-60 sm:h-64 md:h-72 bg-gray-700 mt-10 sm:mt-6 p-4 w-full'>
                <Link to="/unknown" className='text-white font-medium text-xl sm:text-2xl md:text-3xl flex items-center justify-center hover:translate-x-2 hover:text-purple-200'>
                    Words You Found Difficult
                    <FaArrowRight className='ml-2 mt-1' />
                </Link>
            </div>

            <div className='flex justify-center items-center h-60 sm:h-64 md:h-72 bg-gray-700  mt-10 sm:mt-6 p-4 w-full'>
                <Link to="/quizstart" className='text-white font-medium text-xl sm:text-2xl md:text-3xl flex items-center hover:translate-x-2 hover:text-purple-200'>
                    Play quiz to test yourself
                    <FaArrowRight className='ml-2 mt-1' />
                </Link>
            </div>

            <div className='flex justify-center items-center h-60 sm:h-64 md:h-72 bg-gray-700 mt-10 sm:mt-6 p-4 w-full'>
                <Link to="/wordsearch" className='text-white font-medium text-xl sm:text-2xl md:text-3xl flex items-center hover:translate-x-2 hover:text-purple-200'>
                    Search for words
                    <FaArrowRight className='ml-2 mt-1' />
                </Link>
            </div>

            <div className='flex justify-center items-center h-60 sm:h-64 md:h-72 bg-gray-700 mt-10 sm:mt-6  p-4 w-full'>
                <Link to="/viewpdf" className='text-white font-medium text-xl sm:text-2xl md:text-3xl flex items-center hover:translate-x-2 hover:text-purple-200'>
                    Study materials
                    <FaArrowRight className='ml-2 mt-1' />
                </Link>
            </div>
            <div className='flex justify-center items-center h-60 sm:h-64 md:h-72 bg-gray-700 mt-10 sm:mt-6  p-4 w-full'>
                <Link to="/scoretracker" className='text-white font-medium text-xl sm:text-2xl md:text-3xl flex items-center hover:translate-x-2 hover:text-purple-200'>
                    Score Tracker
                    <FaArrowRight className='ml-2 mt-1' />
                </Link>
            </div>

        </div>

    );
}

export default Home;
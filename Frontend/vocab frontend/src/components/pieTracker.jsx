import React, { useEffect, useState } from 'react'
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


ChartJS.register(ArcElement, Tooltip, Legend);

const PieTracker = ({ results, setResults }) => {
  const [totalScore, setTotalScore] = useState(0)
  const [totalFullMark, setTotalFullMark] = useState(0)
  const [averageScore, setAverageScore] = useState(0)
  const navigate = useNavigate()


  const calculateTotals = () => {
    const totalScore = results.reduce((acc, curr) => acc + curr.score, 0)
    const totalFullMark = results.reduce((acc, curr) => acc + curr.fullmark, 0)
    const averageScore = (totalScore / totalFullMark) * 10;


    setTotalScore(totalScore)
    setTotalFullMark(totalFullMark)
    setAverageScore(averageScore)
  }

  useEffect(() => {
    calculateTotals()
  }, [results])


  const pieData = {
    labels: ['Score Obtained', 'Score Lost'],
    datasets: [
      {
        label: '# of Points',
        data: [totalScore, totalFullMark - totalScore],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const improveVocab = () => {
    navigate('/improvevocab', { state: { averageScore } })

  }


  return (
    <div className='grid grid-cols-1 md:grid-cols-2  p-5 gap-5'>
      <div className=" p-5 rounded-lg mb-5   ">
        <h2 className="text-xl font-semibold mb-2">Score Analysis</h2>
        <p className='text-xl'><strong>Total Score:</strong> {totalScore}</p>
        <p className='text-xl'><strong>Total Full Marks:</strong> {totalFullMark}</p>
        <p className='text-xl'><strong>Average Score (out of 10):</strong> {averageScore.toFixed(2)}</p>
      </div>

      {/* Pie Chart */}
      <div className="w-full  justify-center mx-auto">
        <div className='w-full max-w-xs  sm:max-w-sm lg:max-w-md'>
          <h2 className="text-xl font-semibold mb-2 text-center">Score Distribution</h2>
          <Pie data={pieData} />
        </div>
      </div>
      <button
        onClick={improveVocab}
        className='border border-green-300 p-5 flex flex-row justify-center items-center text-xl text-green-700 hover:bg-green-100 hover:border-blue-200'>How can i improve my vocabulary from here?
        <FaArrowRight className='ml-2  text-2xl' />
      </button>
    </div>
  )
}

export default PieTracker

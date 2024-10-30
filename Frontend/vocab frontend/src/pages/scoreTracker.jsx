
// import React, { useEffect, useState } from 'react';
// import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
// import PieTracker from '../components/pieTracker';
// import LineChart from '../components/lineChart';
// import StreakTracker from '../components/streakTrack';

// const ScoreTracker = () => {
//     const [results, setResults] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1)
//     const recordsPerPage = 7;
//     const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

//     const getScores = async () => {
//         const token = user.data.token;
//         try {
//             const res = await fetch('http://localhost:5000/api/score/get-score', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             const data = await res.json();
//             setResults(data.data);
//         } catch (error) {
//             console.error('Error fetching scores:', error);
//         }
//     };

//     // Helper function to convert the date to 'YYYY/MM/DD AD' format
//     const convertToAD = (dateString) => {
//         const date = new Date(dateString);
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         const suffix = year >= 0 ? 'AD' : 'BC';
//         return `${year}/${month}/${day}`;
//     };

//     useEffect(() => {
//         getScores();
//     }, []);

//     const indexOfLastRecord = currentPage * recordsPerPage;
//     const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//     const currentRecords = results.slice(indexOfFirstRecord, indexOfLastRecord)

//     const totalPages = Math.ceil(results.length / recordsPerPage);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);


//     return (
//         <div className="m-20 grid grid-cols-1 gap-32">
//             <div>
//                 <TableContainer className='bg-[#FAF8FF]'>
//                     <Table className="table-auto w-full border-separate" style={{ borderSpacing: 0 }}>
//                         <Thead>
//                             <Tr className="bg-[#0056D10D]">
//                                 <Th className="text-black p-4 text-center border-r">S.N</Th>
//                                 <Th className="text-black p-4 text-center border-r">Date when quiz was taken</Th>
//                                 <Th className="text-black p-4 text-center border-r">Score obtained</Th>
//                                 <Th className="text-black p-4 text-center border-r">Full marks</Th>
//                             </Tr>
//                         </Thead>
//                         <Tbody className="space-y-4">
//                             {results.map((result, index) => (
//                                 <Tr className="bg-white shadow-md rounded-lg border-r" key={index}>
//                                     <Td className="p-4 text-center border-r">{index + 1}</Td>
//                                     {/* Use the convertToAD function to display the full date in AD format */}
//                                     <Td className="p-4 text-center border-r">{convertToAD(result.date)}</Td>
//                                     <Td className="p-4 text-center border-r">{result.score}</Td>
//                                     <Td className="p-4 text-center border-r">{result.fullmark}</Td>
//                                 </Tr>
//                             ))}
//                         </Tbody>
//                     </Table>
//                 </TableContainer>
//                 <div className="flex justify-center mt-4">
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
//                         <button
//                             key={pageNumber}
//                             onClick={() => paginate(pageNumber)}
//                             className={`mx-1 px-4 py-2 ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
//                         >
//                             {pageNumber}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             <div className=''>
//                 <StreakTracker />
//                 <LineChart results={results} setResults={setResults} />
//                 <PieTracker results={results} setResults={setResults} />

//             </div>
//         </div>

//     );
// };

// export default ScoreTracker;


import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import PieTracker from '../components/pieTracker';
import LineChart from '../components/lineChart';
import StreakTracker from '../components/streakTrack';
import Leaderboard from '../components/leaderboard';

const ScoreTracker = () => {
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 7;
    const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

    const getScores = async () => {
        const token = user.data.token;
        try {
            const res = await fetch('http://localhost:5000/api/score/get-score', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setResults(data.data);
        } catch (error) {
            console.error('Error fetching scores:', error);
        }
    };

    const convertToAD = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    useEffect(() => {
        getScores();
    }, []);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = results.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(results.length / recordsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="m-20 grid grid-cols-1 gap-32">
            <div>
                <TableContainer className='bg-[#FAF8FF]'>
                    <Table className="table-auto w-full border-separate" style={{ borderSpacing: 0 }}>
                        <Thead>
                            <Tr className="bg-[#0056D10D]">
                                <Th className="text-black p-4 text-center border-r">S.N</Th>
                                <Th className="text-black p-4 text-center border-r">Date when quiz was taken</Th>
                                <Th className="text-black p-4 text-center border-r">Score obtained</Th>
                                <Th className="text-black p-4 text-center border-r">Full marks</Th>
                            </Tr>
                        </Thead>
                        <Tbody className="space-y-4">
                            {currentRecords.map((result, index) => (
                                <Tr className="bg-white shadow-md rounded-lg border-r" key={index}>
                                    <Td className="p-4 text-center border-r">{indexOfFirstRecord + index + 1}</Td>
                                    <Td className="p-4 text-center border-r">{convertToAD(result.date)}</Td>
                                    <Td className="p-4 text-center border-r">{result.score}</Td>
                                    <Td className="p-4 text-center border-r">{result.fullmark}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => paginate(pageNumber)}
                            className={`mx-1 px-2 py-1 ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                        >
                            {pageNumber}
                        </button>
                    ))}
                </div>
            </div>

            <div className='gap-30'>
                <Leaderboard />
                <StreakTracker />
                <LineChart results={results} />
                <PieTracker results={results} />
            </div>
        </div>
    );
};

export default ScoreTracker;


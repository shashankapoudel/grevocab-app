import React, { useEffect, useState, useCallback } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';
import PieTracker from '../components/pieTracker';
import LineChart from '../components/lineChart';
import StreakTracker from '../components/streakTrack';
import Leaderboard from '../components/leaderboard';

const ScoreTracker = () => {
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 4;

    const user = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null;

    const getScores = useCallback(async () => {
        if (!user) return;
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
    }, [user]);

    const convertToAD = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    useEffect(() => {
        getScores();
    }, [getScores]);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = results.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(results.length / recordsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="m-20 grid grid-cols-1 gap-32">
            {results.length === 0 ? (
                <p className="text-center text-red-600 text-xl">
                    You must play a quiz first to track your results.
                </p>
            ) : (
                <div>
                    <div>
                        <TableContainer className="bg-[#FAF8FF]">
                            <Table
                                className="table-auto w-full border-separate"
                                style={{ borderSpacing: 0 }}
                            >
                                <Thead>
                                    <Tr className="bg-[#0056D10D]">
                                        <Th className="text-black p-4 text-center border-r">S.N</Th>
                                        <Th className="text-black p-4 text-center border-r">
                                            Date when quiz was taken
                                        </Th>
                                        <Th className="text-black p-4 text-center border-r">
                                            Score obtained
                                        </Th>
                                        <Th className="text-black p-4 text-center border-r">
                                            Full marks
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {currentRecords.map((result, index) => (
                                        <Tr
                                            className="bg-white shadow-md rounded-lg border-r"
                                            key={index}
                                        >
                                            <Td className="p-4 text-center border-r">
                                                {indexOfFirstRecord + index + 1}
                                            </Td>
                                            <Td className="p-4 text-center border-r">
                                                {convertToAD(result.date)}
                                            </Td>
                                            <Td className="p-4 text-center border-r">{result.score}</Td>
                                            <Td className="p-4 text-center border-r">{result.fullmark}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>

                        {totalPages > 1 && (
                            <div className="flex justify-center mt-4">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                    (pageNumber) => (
                                        <button
                                            key={pageNumber}
                                            onClick={() => paginate(pageNumber)}
                                            className={`mx-1 px-2 py-1 rounded ${currentPage === pageNumber
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-300 text-black'
                                                }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    )
                                )}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
                        <Leaderboard />
                        <StreakTracker />
                        <LineChart results={results} />
                        <PieTracker results={results} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScoreTracker;



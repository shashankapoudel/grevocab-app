import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import PieTracker from './pieTracker';

const ScoreTracker = () => {

    const [results, setResults] = useState([])
    const user = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;


    const getScores = async () => {
        const token = user.data.token;
        try {
            const res = await fetch('http://localhost:5000/api/score/get-score', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await res.json()
            setResults(data.data)


        } catch (error) {

        }
    }

    console.log(results);



    useEffect(() => {
        getScores()
    }, [])


    return (
        <div className='m-20 grid grid-cols-1 gap-40'>
            <div>

                <TableContainer>
                    <Table className="table-auto w-full border-separate" style={{ borderSpacing: 0 }}>
                        <Thead>
                            <Tr className='bg-black'>
                                <Th className='text-white text-center border-r'>S.N</Th>
                                <Th className="text-white text-center border-r">Date when quiz was taken</Th>
                                <Th className="text-white text-center border-r">Score obtained</Th>
                                <Th className="text-white text-center border-r">Full marks</Th>

                                {/* <Th className="text-white text-center">Sentence</Th> */}
                            </Tr>
                        </Thead>
                        <Tbody className="space-y-4">
                            {results.map((result, index) =>


                                <Tr className="bg-white shadow-md rounded-lg border-r" key={index}>
                                    <Td className="p-4 text-center border-r">{index + 1}</Td>
                                    <Td className="p-4 text-center border-r ">{result.date}</Td>
                                    <Td className="p-4 text-center border-r">{result.score}</Td>
                                    <Td className="p-4 text-center border-r">{result.fullmark}

                                    </Td>
                                </Tr>
                            )
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>

            <div>
                <PieTracker results={results} setResults={setResults} />
            </div>
        </div>
    )
}

export default ScoreTracker

import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react'
import { useLocation } from 'react-router-dom'

const LeaderTable = () => {
    const location = useLocation();
    const leaderTeam = location.state.leaderboardteam;
    const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    console.log(leaderTeam);

    return (
        <div className='m-15 p-5'>
            <h1 className='flex justify-center items-center mb-10 font-bold text-43xl'>Leader Board</h1>
            <TableContainer>
                <Table className="table-auto w-full border-separate" style={{ borderSpacing: 0 }}>
                    <Thead>
                        <Tr>
                            <Th className='text-black text-center border-r p-3'>Rank</Th>
                            <Th className='text-black text-center border-r p-3'>Name of user</Th>
                            <Th className='text-black text-center border-r p-3'> Average Score</Th>
                        </Tr>
                    </Thead>
                    <Tbody className="space-y-4">
                        {leaderTeam.map((team, index) =>

                            <Tr className={`bg-white shadow-md rounded-lg ${user.data.user.email === leaderTeam[index].email ? 'bg-green-200' : ""}`} key={index}>
                                <Td className="p-4 text-center border-r">{index + 1}</Td>
                                <Td className="p-4 text-center border-r ">{leaderTeam[index].name}</Td>
                                <Td className="p-4 text-center border-r">{leaderTeam[index].AverageScore}</Td>
                            </Tr>
                        )
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default LeaderTable


import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const UnknownWords = () => {
    const [unknown, setUnknown] = useState([])
    const user = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
    useEffect(() => {
        const fetchUnknownWords = async () => {
            const token = user.data.token;
            try {
                const res = await fetch('http://localhost:5000/api/words/unknown-words', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                console.log(res);

                const data = await res.json()
                console.log(data)
                setUnknown(data)

            } catch (error) {
                console.error("Error fetching unknown words", error)
            }
        }
        fetchUnknownWords()
    }, [])
    console.log(unknown)

    return (
        <div className='m-20'>
            <TableContainer>
                <Table className="table-auto w-full border-separate" style={{ borderSpacing: 0 }}>
                    <Thead>
                        <Tr className='bg-[#0056D10D]'>
                            <Th className='text-black text-center border-r p-3'>S.N</Th>
                            <Th className="text-black text-center border-r p-3">Words</Th>
                            <Th className="text-black text-center border-r p-3">Meaning</Th>
                            <Th className="text-black text-center p-3">Sentence</Th>
                        </Tr>
                    </Thead>
                    <Tbody className="space-y-4">
                        {unknown.map((word, index) =>


                            <Tr className="bg-white shadow-md rounded-lg" key={index}>
                                <Td className="p-4 text-left border-r">{index + 1}</Td>
                                <Td className="p-4 text-left border-r">{word.word}</Td>
                                <Td className="p-4 text-left border-r break-words whitespace-normal leading-relaxed">{word.meaning}</Td>
                                <Td className="p-4 text-left break-words whitespace-normal leading-relaxed">
                                    {word.sentence}
                                </Td>
                            </Tr>
                        )
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UnknownWords;

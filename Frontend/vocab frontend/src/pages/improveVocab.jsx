import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'


const studyMaterialsForLowScore = [
    { title: "List of 100 words that frequently appear in GRE", url: "../public/pdfs/document9.pdf" },
    { title: "GRE verbal notes", url: "../public/pdfs/document5.pdf" },
    { title: "GRE antonyms", url: "../public/pdfs/document6.pdf" },
    { title: "Magoosh GRE Vocab eBook", url: "../public/pdfs/document2.pdf" },
    { title: "500 essential GRE words by Manhattan", url: "../public/pdfs/document11.pdf" },
]

const studyMaterialsForMidScore = [
    { title: "Norman Lewis - Word Power Made Easy", url: "../public/pdfs/document1.pdf" },
    { title: "500 advanced GRE words by Manhattan", url: "../public/pdfs/document12.pdf" },
    { title: "The vocabulary builder workbook", url: "../public/pdfs/document10.pdf" },
    { title: "verbal RC notes", url: "../public/pdfs/document4.pdf" },
]

const studyMaterialsForHighScore = [
    { title: "Learning express Gre vocab flash", url: "../public/pdfs/document8.pdf" },
    { title: "John suter vocab in context of music ,arts and literature", url: "../public/pdfs/document7.pdf" },
    { title: "Eliot Quinley - Vocabulary in Context", url: "../public/pdfs/document3.pdf" },
]

const ImproveVocab = () => {
    const location = useLocation();
    const [recomendedMaterials, setRecomendedMaterials] = useState([])

    useEffect(() => {
        const avg = location.state;
        console.log(avg);

        if (avg.averageScore <= 4) {
            setRecomendedMaterials(studyMaterialsForLowScore)
        } else if (4 < avg.averageScore < 8) {
            setRecomendedMaterials(studyMaterialsForMidScore)
        } else {
            setRecomendedMaterials(studyMaterialsForHighScore)
        }
    })


    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-5">Study Material Suggestions</h1>

            <div className="mt-5">
                <h2 className="text-xl font-semibold">Recommended Study Materials</h2>
                <ul className="list-disc ml-6 mt-2">
                    {recomendedMaterials.map((material, index) => (
                        <li key={index} className="mb-2">
                            <a href={material.link} className="text-blue-500 hover:underline">
                                {material.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ImproveVocab

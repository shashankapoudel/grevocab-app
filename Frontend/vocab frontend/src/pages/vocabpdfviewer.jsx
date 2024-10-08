

import { useState } from "react";
import { VscFilePdf } from "react-icons/vsc";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { IoMdArrowDropdown } from "react-icons/io";

const VocabPdfViewer = () => {
    const pdfs = [
        { title: "Norman Lewis - Word Power Made Easy", url: "../public/pdfs/document1.pdf" },
        { title: "Magoosh GRE Vocab eBook", url: "../public/pdfs/document2.pdf" },
        { title: "Eliot Quinley - Vocabulary in Context", url: "../public/pdfs/document3.pdf" },
        { title: "verbal RC notes", url: "../public/pdfs/document4.pdf" },
        { title: "GRE verbal notes", url: "../public/pdfs/document5.pdf" },
        { title: "GRE antonyms", url: "../public/pdfs/document6.pdf" },
        { title: "John suter vocab in context of music ,arts and literature", url: "../public/pdfs/document7.pdf" },
        { title: "Learning express Gre vocab flash", url: "../public/pdfs/document8.pdf" },
        { title: "List of 100 frequent words that appear in GRE", url: "../public/pdfs/document9.pdf" },
        { title: "The vocabulary builder workbook", url: "../public/pdfs/document10.pdf" },
        { title: "500 essential GRE words by Manhattan", url: "../public/pdfs/document11.pdf" },
        { title: "500 advanced GRE words by Manhattan", url: "../public/pdfs/document12.pdf" },
    ];

    const [selectedPdf, setSelectedPdf] = useState(null);

    const handlePdfSelect = (url) => {
        setSelectedPdf(url);
    };

    return (
        <div className="bg-[#FAF8FF] p-6 sm:p-12 md:p-24">
            <AccordionPrimitive.Root type="single" collapsible className="w-full bg-white  ">
                <AccordionPrimitive.Item value="item-1" className="border-b">
                    <AccordionPrimitive.Header>
                        <AccordionPrimitive.Trigger className="flex w-full items-center justify-between p-4 text-lg font-medium hover:bg-gray-200 ">
                            {!selectedPdf ? (
                                <>
                                    <h1>View Vocabulary PDF Documents </h1>
                                    < IoMdArrowDropdown />
                                </>) : null}

                        </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>
                    <AccordionPrimitive.Content className="p-4 transition-all duration-300 ease-in-out overflow-hidden">
                        {!selectedPdf && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {pdfs.map((pdf, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handlePdfSelect(pdf.url)}
                                            className="bg-white text-gray-700 hover:bg-gray-100 px-7 py-8 rounded-lg shadow-md flex items-center justify-center transition-all duration-300"
                                        >
                                            <div className="flex items-center">
                                                <VscFilePdf className="text-red-500 text-6xl md:text-7xl mr-4" />
                                                <span className="font-medium text-lg md:text-2xl text-center">{pdf.title}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                        {selectedPdf && (
                            <div className="w-full h-full">
                                <iframe
                                    src={selectedPdf}
                                    title="PDF Viewer"
                                    className="w-full h-screen border-none"
                                    style={{ height: "100vh" }}
                                ></iframe>
                            </div>
                        )}
                    </AccordionPrimitive.Content>
                </AccordionPrimitive.Item>
            </AccordionPrimitive.Root>
        </div>
    );
};

export default VocabPdfViewer;


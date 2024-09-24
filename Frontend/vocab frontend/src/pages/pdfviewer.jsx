import { useState } from "react";
import { VscFilePdf } from "react-icons/vsc";


const PdfViewer = () => {

    const pdfs = [
        { title: "Noman Lewis word power made easy", url: "../public/pdfs/document1.pdf" },
        { title: "Maghoosh gre vocab ebook", url: "../public/pdfs/document2.pdf" },
        { title: "Eliot quinley vocablary in context book", url: "../public/pdfs/document3.pdf" },
    ];

    const [selectedPdf, setSelectedPdf] = useState(null);

    const handlePdfSelect = (url) => {
        setSelectedPdf(url);
    };

    return (
        <div className="flex flex-col h-screen  bg-[#FAF8FF] p-24 ">

            {!selectedPdf && (
                <>

                    <h1 className="text-2xl font-bold mb-5">View PDF Documents</h1>

                    <div className=" flex mb-5 gap-5">
                        {pdfs.map((pdf, index) => (
                            <button
                                key={index}
                                onClick={() => handlePdfSelect(pdf.url)}
                                className="bg-white text-gray-700 hover:bg-gray-100 px-10 py-16 mb-4 rounded-lg shadow-md flex items-center justify-center w-80 transition-all duration-300"
                            >
                                <div className="flex items-center">
                                    <VscFilePdf className="text-red-500 text-8xl mr-4" />
                                    <span className="font-medium text-2xl text-center">{pdf.title}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </>
            )}

            {selectedPdf && (
                <div className=" w-full h-full">

                    <iframe
                        src={selectedPdf}
                        title="PDF Viewer"
                        className="w-full h-screen border-none"
                        style={{ height: "100vh" }}
                    // onContextMenu={(e) => e.preventDefault()} 
                    ></iframe>
                </div>
            )
            }
        </div>
    );
};

export default PdfViewer;


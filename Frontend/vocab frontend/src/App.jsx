// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
// import Home from "./pages/home"
// import RegisterUser from "./pages/registerUser"
// import LoginUser from "./pages/loginUser"


// function App() {
//   const user = JSON.parse(localStorage.getItem("userInfo"));
//   console.log(user);


//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/register" element={user ? <RegisterUser /> : <Navigate to='/' />} />
//           <Route path="/login" element={<LoginUser />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   )
// }

// export default App
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import RegisterUser from "./pages/registerUser";
import LoginUser from "./pages/loginUser";
import WordContainer from "./pages/wordContainer";
import UnknownWords from "./pages/unknownWords";
import QuizSection from "./pages/quizSection";
import QuizStartPage from "./pages/quizStartPage";
import Wordsearch from "./pages/wordsearch";
import Pdfviewer from "./pages/pdfviewer";

function App() {
  // Safely parse the user info from localStorage
  const user = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
  console.log(user);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* If user is logged in, show the Home page, otherwise show the Login page */}
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />

          {/* Redirect to home if user is logged in, otherwise show the RegisterUser page */}
          <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterUser />} />
          {/* <Route path="/register" element={<RegisterUser />} /> */}

          {/* If user is not logged in, show the Login page, otherwise redirect to home */}

          <Route path="/login" element={user ? <Navigate to="/" /> : <LoginUser />} />
          {/* <Route path="/login" element={<LoginUser />} /> */}
          <Route path="/wordcontainer" element={<WordContainer />} />
          <Route path="/unknown" element={<UnknownWords />} />
          <Route path="/quiz" element={<QuizSection />} />
          <Route path="/quizstart" element={<QuizStartPage />} />
          <Route path="/wordsearch" element={<Wordsearch />} />
          <Route path="/viewpdf" element={<Pdfviewer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

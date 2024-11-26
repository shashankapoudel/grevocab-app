
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
import Logout from "./pages/Logout";
import { useEffect, useState } from "react";
import ScoreTracker from "./pages/scoreTracker";
import ImproveVocab from "./pages/improveVocab";
import LeaderTable from "./pages/leaderTable";
import SearchWordonDifficulty from "./pages/searchWordonDifficulty";
import SearchWordOnUserDifficulty from "./pages/searchWordOnUserDifficulty";

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {

    const storedUser = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
    if (storedUser) {
      setUser(storedUser)
    }
    console.log(storedUser);
  }, [])

  return (
    <>
      <BrowserRouter>
        <div>

          <Logout setUser={setUser} />
          <Routes>

            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterUser />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <LoginUser setUser={setUser} />} />
            <Route path="/wordcontainer" element={<WordContainer />} />
            <Route path="/unknown" element={<UnknownWords />} />
            <Route path="/quiz" element={<QuizSection />} />
            <Route path="/quizstart" element={<QuizStartPage />} />
            <Route path="/wordsearch" element={<Wordsearch />} />
            <Route path="/viewpdf" element={<Pdfviewer />} />
            <Route path="/scoretracker" element={<ScoreTracker />} />
            <Route path="/improvevocab" element={<ImproveVocab />} />
            <Route path="/scoretracker/leadertable" element={<LeaderTable />} />
            <Route path="/wordcontainer/difficulty" element={<SearchWordonDifficulty />} />
            <Route path="/wordcontainer/users-difficulty" element={<SearchWordOnUserDifficulty />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

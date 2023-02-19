import logo from "./logo.svg";
import "./App.css";
import Home from "./Componensts/home";
import QuestionForm from "./Componensts/Teacher/questionForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentForm from "./Componensts/Student/form";
import QuestionDisplay from "./Componensts/Student/questionDisplay";
import Result from "./Componensts/result";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/teacher" element={<QuestionForm />}></Route>
        <Route path="/student" element={<StudentForm />}></Route>
        <Route path="/question/:id" element={<QuestionDisplay />}></Route>
        <Route path="/poll/result" element={<Result />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

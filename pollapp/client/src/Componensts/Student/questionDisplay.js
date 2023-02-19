import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useNavigate } from "react-router-dom";
const socket = io("https://poll-app-six.vercel.app/");
function QuestionDisplay(props) {
  const [questionObj, setQuestion] = useState(null);
  const [marked, setMarked] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    socket.emit("submit_answer", {
      marked: marked,
      questionObj: questionObj,
    });
  };
  useEffect(() => {
    socket.on("recieved_question", (q) => {
      console.log(q);
      setQuestion(q);
      setTimeout(() => {
        navigate("/poll/result");
      }, 60000);
    });
    socket.emit("get_question");
  }, []);
  return (
    <div className="container">
      {questionObj && (
        <>
          <div
            style={{ height: "50px" }}
            className="mt-5 d-flex justify-content-between"
          >
            <h2>Select Correct Option & Input</h2>
            <CountdownCircleTimer
              isPlaying
              duration={60}
              colors={["#08c922", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[60, 15, 5, 0]}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </div>
          <div className="mt-3">
            <h4>Q. {questionObj.question}</h4>
            <table>
              {questionObj.options.length > 0 ? (
                questionObj.options.map((option, i) => {
                  return (
                    <tr>
                      <td style={{ width: "50px" }}>
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          style={{ border: "1px solid black" }}
                          onChange={() => setMarked(option)}
                        />
                      </td>
                      <td>{option}</td>
                    </tr>
                  );
                })
              ) : (
                <></>
              )}
            </table>
            <Link to="/poll/result" style={{ textDecoration: "none" }}>
              <button className="btn btn-secondary mt-3" onClick={handleSubmit}>
                {" "}
                Submit
              </button>
            </Link>
          </div>
        </>
      )}
      {!questionObj && <h1 className="mt-5"> Wait for the Question....</h1>}
    </div>
  );
}

export default QuestionDisplay;

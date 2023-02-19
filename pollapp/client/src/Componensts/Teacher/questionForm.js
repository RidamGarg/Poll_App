import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
function QuestionForm(props) {
  const [text, setText] = useState("");
  const [opArray, setOpArray] = useState([]);
  const [correct, setCorrect] = useState([]);
  const navigate = useNavigate();
  const handleOptionInput = (e, i) => {
    opArray[i] = e.target.value;
    setOpArray(opArray);
  };
  const handleCheckInput = (e, i) => {
    if (e.target.checked) {
      setCorrect([...correct, i]);
    } else {
      setCorrect(correct.filter((idx) => i !== idx));
    }
  };
  const handleSubmit = () => {
    console.log(opArray + "-->" + correct);
    const socket = io("http://localhost:5000/");
    localStorage.setItem("question", {
      question: text,
      options: opArray,
      correct: correct,
    });
    socket.emit("send_question", {
      question: text,
      options: opArray,
      correct: correct,
    });
    navigate("/poll/result");
  };
  return (
    <div className="container mt-5 px-5">
      <div className="mx-5">
        <h4>Enter Questions & options</h4>
        <div class="form-floating">
          <textarea
            class="form-control mb-3"
            placeholder="Leave a comment here"
            id="floatingTextarea"
            onChange={(e) => setText(e.target.value)}
            rows="3"
          ></textarea>
          <label for="floatingTextarea">Enter...</label>
        </div>
        <table cellPadding={8}>
          <tr>
            <th style={{ width: "150px" }}>Options</th>
            <th>Is Correct?</th>
          </tr>

          {opArray.length > 0 ? (
            opArray.map((d, i) => {
              return (
                <tr key={i}>
                  <td style={{ width: "150px" }}>
                    <input
                      type="text"
                      class="form-control"
                      style={{ border: "1px solid black" }}
                      onChange={(e) => handleOptionInput(e, i)}
                    />
                  </td>
                  <td>
                    <input
                      class="form-check-input ms-4"
                      type="checkbox"
                      value=""
                      style={{ border: "1px solid black" }}
                      onChange={(e) => handleCheckInput(e, i)}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <></>
          )}
        </table>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-secondary"
            onClick={() => setOpArray([...opArray, ""])}
          >
            {" "}
            Add another option
          </button>

          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionForm;

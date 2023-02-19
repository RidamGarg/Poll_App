import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link } from "react-router-dom";
const socket = io("https://poll-app-six.vercel.app/");
function Result(props) {
  const [data, setData] = useState(null);
  useEffect(() => {
    socket.on("recieved_answer", (data) => {
      setData(data);
    });
  }, []);
  return (
    <div className="container">
      <div style={{ height: "50px" }} className="mt-5">
        <h2>Polling Results</h2>
      </div>
      {data ? (
        data.questionObj.options.map((d, i) => {
          return (
            <ProgressBar
              variant={data.questionObj.correct[0] === i ? "success" : "danger"}
              now={Math.max(
                2,
                (100 * data.markedArray[i]) / data.totalSubmision
              )}
              label={`${d}(${Math.max(
                0.5,
                Math.round((100 * data.markedArray[i]) / data.totalSubmision)
              )})%`}
              style={{
                height: "35px",
                textAlign: "center",
                color: "black",
                marginTop: "15px",
              }}
            />
          );
        })
      ) : (
        <div>
          <h4>No Submissions till now...</h4>
        </div>
      )}
      <div className="mt-5">
        <Link to={"/"}>Back To Home</Link>
      </div>
    </div>
  );
}

export default Result;

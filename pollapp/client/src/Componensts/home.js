import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
function Home(props) {
  return (
    <div className="App mt-5">
      <h1>Select what type of user you are?</h1>
      <div
        class="container mt-5"
        style={{ border: "black 1px solid", height: "400px" }}
      >
        <div className="d-flex row">
          <Link
            to="/teacher"
            style={{ textDecoration: "none" }}
            class="col-6 mt-5 align-items-center"
          >
            <div
              style={{
                height: "200px",
                border: "black 1px solid",
                color: "black",
                borderRadius: "50%",
              }}
              className="shadow"
            >
              <h4 style={{ marginTop: "76px" }} s>
                Teacher
              </h4>
            </div>
          </Link>
          <Link
            to="/student"
            style={{ textDecoration: "none" }}
            class="col-6 mt-5 align-items-center"
          >
            <div
              style={{
                height: "200px",
                border: "black 1px solid",
                color: "black",
                borderRadius: "50%",
              }}
              className="shadow"
            >
              <h4 style={{ marginTop: "76px" }}>Student</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

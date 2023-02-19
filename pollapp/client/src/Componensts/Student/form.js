import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUID } from "react-uid";
function StudentForm(props) {
  const [name, setName] = useState("");
  return (
    <div className="container">
      <h2 className="mt-5">Let's Start...</h2>
      <form className="mt-4" style={{ width: "400px" }}>
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter your name..."
            onChange={(e) => setName(e.target.value)}
            style={{ border: "1px solid black" }}
          />
        </div>
        <Link
          to={`/question/${useUID(name)}`}
          style={{ textDecoration: "none" }}
        >
          <button type="submit" class="btn btn-primary">
            Continue...
          </button>
        </Link>
      </form>
    </div>
  );
}

export default StudentForm;

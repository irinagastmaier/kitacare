import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="fcontainer">
      <h1>Choose your Account!</h1>
      <div className="btnform">
      <Link to='/kgregister'>
        <button className="att">Register a Kindergarten</button>
      </Link>
      <Link to='/tregister'>
<<<<<<< HEAD:frontend/src/components/RegisterForms/Register.js
        <button className="att">Register as Teacher</button>
      </Link>
      </div>
=======
        <p>Register as Teacher</p>
      </Link>
>>>>>>> origin/develop:frontend/src/components/Register.js
    </div>
  );
}

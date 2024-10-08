import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import '../css/Login.css';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "./firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpActive, setIsSignUpActive] = useState(true);
  const [jwtToken, setJwtToken] = useState("");
  const [user, setUser] = useState(null); // Track the logged-in user
  
  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive);
  };

  const handleSignUp = () => {
    if (!email || !password) return;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setUser(user); // Update the user state on successful sign-up
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  const handleSignIn = () => {
    if (!email || !password) return;
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        try {
          const response = await axios.post('http://localhost:3031/api/students/get-student-id', {
            email: email
          });
          
          const { token, studentId } = response.data;
          console.log("Received JWT and Student ID:", token, studentId);

          // Store the JWT token in sessionStorage for later use
          sessionStorage.setItem('jwtToken', token);
          console.log(sessionStorage.getItem('jwtToken'));
          setJwtToken(token); // Store in state if needed
        } catch (error) {
          console.log("Error fetching student ID:", error);
        }
        const user = userCredential.user;
        console.log("Firebase User Signed In:", user);
        setUser(user); // Update the user state on successful sign-in

        // Now make a request to your backend to get the MongoDB Object ID
        
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  // Redirect to student-details if user is logged in
  if (user) {
    return <Navigate to="/student-details" />;
  }

  return (
    <section>
      <h2>Homepage</h2>
      <form>
        {isSignUpActive && <legend>Sign Up</legend>}
        {!isSignUpActive && <legend>Sign In</legend>}

        <fieldset>
          <ul>
            <li>
              <label htmlFor="email">Email</label>
              <input type="text" id="email" onChange={handleEmailChange} />
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={handlePasswordChange}
              />
            </li>
          </ul>

          {isSignUpActive && (
            <button type="button" onClick={handleSignUp}>
              Sign Up
            </button>
          )}
          {!isSignUpActive && (
            <button type="button" onClick={handleSignIn}>
              Sign In
            </button>
          )}
        </fieldset>
        {isSignUpActive && <a onClick={handleMethodChange}>Login</a>}
        {!isSignUpActive && (
          <a onClick={handleMethodChange}>Create an account</a>
        )}
      </form>
    </section>
  );
};

export default Login;

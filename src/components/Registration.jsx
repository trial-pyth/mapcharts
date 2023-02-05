import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "../axios/axios";

// Regex syntax for verification
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Registration = () => {
  //to set focus and display error message
  const userRef = useRef();
  const errRef = useRef();

  /*
  username validation, and focus 
  */
  const [user, setUser] = useState("");
  const [isValidName, setIsValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  /*
  password validation, and focus 
  */
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  /*
  username validation,match and focus 
  */
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  //displaying error message content
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // set focus to user input
    userRef.current.focus();
  }, []);

  useEffect(() => {
    /*
  test whether username entered passes regex test and set whether valid
  Runs whenever user state changes
  */
    setIsValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    /*
  test whether password entered passes regex test and set whether valid password and valid matched password
  Runs whenever pwd state changes
  */
    setValidPwd(PWD_REGEX.test(pwd));
    const isMatch = pwd === matchPwd;
    setValidMatch(isMatch);
  }, [pwd, matchPwd]);

  useEffect(() => {
    // set error state to empty string when user changes input
    setError("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(user, pwd);
    // setSuccess(true);

    try {
      const response = await axios.post(
        "/registration",
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));

      setSuccess(true);
    } catch (error) {
      if (!error?.repsponse) {
        setError("No Server Reponse");
      } else if (error.response?.status === 409) {
        setError("Username Already Exists");
      } else {
        setError("Registration Failed");
      }
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You have created an account</h1>
          <p>
            <Link to="/login">Log In</Link>
          </p>
        </section>
      ) : (
        <div className="registration">
          <h1>Register</h1>
          <p className={error ? "errmsg" : "hidden"}>{error}</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <FontAwesomeIcon
                icon={faCheck}
                className={isValidName ? "valid" : "hidden"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={isValidName || !user ? "hidden" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              className={
                userFocus && user && !isValidName ? "instructions" : "hidden"
              }
            >
              <FontAwesomeIcon
                icon={faInfoCircle}
                style={{ marginRight: "0.5rem" }}
              />
              Username must be between 4 and 24 characters long.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores and hyphens allowed.
            </p>

            <label htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "valid" : "hidden"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? "hidden" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              <FontAwesomeIcon
                icon={faInfoCircle}
                style={{ marginRight: "0.5rem" }}
              />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters: <span>! </span>
              <span>@ </span>
              <span># </span>
              <span>$ </span>
              <span>% </span>
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPwd ? "valid" : "hidden"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPwd ? "hidden" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              className={matchFocus && !validMatch ? "instructions" : "hidden"}
            >
              <FontAwesomeIcon
                icon={faInfoCircle}
                style={{ marginRight: "0.5rem" }}
              />
              Must match the first password input field.
            </p>

            <button
              disabled={!isValidName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>
          <p>
            Have an account?
            <br />
            <span className="line">
              <Link to="/login">Sign In</Link>
            </span>
          </p>
        </div>
      )}
    </>
  );
};

export default Registration;

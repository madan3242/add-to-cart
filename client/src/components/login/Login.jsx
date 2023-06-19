import React, { useState } from "react";
import "./Login.css";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { GrClose } from "react-icons/gr";
import { userLogin, userSignup } from "../../services/auth.services";
import { useDispatch } from 'react-redux'

const Login = ({ toggleLogin, setIsLoggedIn }) => {
  const [loginUserData, setLoginUserData] = useState({
    email: "",
    password: "",
  });

  const [signupUserData, setSignupUserData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const dispatch = useDispatch();

  const [login, setLogin] = useState(true);

  const handleLoginChange = (e) => {
    setLoginUserData({
      ...loginUserData,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSignupChange = (e) => {
    setSignupUserData({
      ...signupUserData,
      [e.target.name]: e.target.value
    })
  }

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: loginUserData.email,
        password: loginUserData.password
      }
      dispatch(userLogin(data, setIsLoggedIn, toggleLogin))
    } catch (error) { }
  }

  const signupSubmit = async (e) => {
    e.preventDefault();
    if(signupUserData.password === signupUserData.confirmPassword){
      try {
        const data = {
          email: signupUserData.email,
          password: signupUserData.password
        }
        dispatch(userSignup(data, setIsLoggedIn, toggleLogin))
      } catch (error) {
        alert(JSON.stringify(error))
      }
    } else {
      alert("Password dosen't match")
    }
  }

  return (
    <>
      <div className="login-form">
        <GrClose size={30} className="close-icon" onClick={toggleLogin} />
        {login ? (
          <>
            <Form onSubmit={loginSubmit}>
            <h2 className="mb-4">Login</h2>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control type="email" name="email" placeholder="Email address" onChange={handleLoginChange} />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control type="password" name="password" placeholder="Password" onChange={handleLoginChange} />
            </FloatingLabel>

            <div className="text-center">
              <Button variant="success" className="mb-2" type="submit">
                Login
              </Button>
              <p>
                Don't have an account ?{" "}
                <span
                  className="span-button"
                  onClick={() => setLogin(!login)}
                >
                  Sign up
                </span>{" "}
              </p>
            </div>
            </Form>
          </>
        ) : (
          <>
            <Form onSubmit={signupSubmit}>
            <h2 className="mb-4">Signup</h2>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control type="email" name="email" onChange={handleSignupChange} placeholder="Email address" />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control type="password" name="password" onChange={handleSignupChange} placeholder="Password" />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingConfirmPassword"
              label="Confirm Password"
              className="mb-3"
            >
              <Form.Control type="password"  name="confirmPassword" onChange={handleSignupChange} placeholder="Confirm Password" />
            </FloatingLabel>

            <div className="text-center">
              <Button variant="success" className="mb-2" type="submit">
                Signup
              </Button>
              <p>
                Already have an account ?{" "}
                <span
                  className="span-button"
                  onClick={() => setLogin(!login)}
                >
                  Login
                </span>
              </p>
            </div>
            </Form>
          </>
        )}
      </div>
    </>
  );
};

export default Login;

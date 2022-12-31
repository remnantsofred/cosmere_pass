import './SignupFormPage.css';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupFormPage.css'
import Panels from '../panels';
import Panel from '../panel/Panel';
import Columns from '../columns/Columns';
import Column from '../column/Column';
import Rows from '../rows/Rows'
import Row from '../row/Row'
import hero from './signUphero.png'

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <Panel id='SignupLargePanel'>
      <Panels className="leftPanel">
          <h3>Start your free trial</h3>
          <p id="signupP">
            Search, book and try classes from top-rated studios with your free trial. When you 
            create your ClassPass account, you’ll unlock unlimited access to over 4,000 on-demand workouts.
          </p>
          <img src={hero} id="heroSignUp" />
      </Panels>
      <Panels className="rightPanel">
        <div className='trialCard'>
          YOUR TRIAL INCLUDES
        </div>
        <Row className="signupRow" id="dollars">
          $0
        </Row>
        <Row className="signupRow" id="dollarsSubtitle">
          for 1 month
        </Row>
        <Row className="signupRow">
          Get <strong>20 credits</strong> to book as many as <strong>7 reservations</strong>.
        </Row>
        <Row className="signupRow">
          We’ll remind you <strong>2 days before</strong> your trial ends.
        </Row>
        <Row className="signupRow">
          You’re never locked in. <strong>Cancel anytime.</strong>
        </Row>
        <form onSubmit={handleSubmit}>
          <Row>
            <ul className="signupErrors">
             {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
          </Row>
          <Row>
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="signupInput"
              />
          </Row>
          <Row>
              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="signupInput"
              />
   
          </Row>
          <Row>
              <input
                type="password"
                placeholder="Choose a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="signupInput"
              />

          </Row> 
          <Row>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="signupInput"
              />
           
          </Row>
          <Row>
            <button type="submit" id="signUpSubmit">Try for free</button>
          </Row>
        </form>
      </Panels>
    </Panel>
  );
}

export default SignupFormPage;
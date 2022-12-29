import './SignupFormPage.css';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import Panels from '../panels';
import Panel from '../panel/Panel';
import Columns from '../columns/Columns';
import Column from '../column/Column';
import Rows from '../rows/Rows'
import Row from '../row/Row'

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
    <Panel>
      <Panels>
          <span>Quick recap</span>
          <h2>Free for 1 month</h2>
          <p>
            <span>
              <ul>
                <li>Get 20 credits to book classes <strong>free for 1 month.</strong></li>
                <li>We’ll send you a reminder <strong>2 days before your trial ends.</strong></li>
                <li>You’re never locked in. <strong>Cancel anytime.</strong></li>
                <li><strong>Roll over unused credits</strong> up to the number of credits in your next month’s plan.</li>
              </ul>

            </span>
          </p>
      </Panels>
      <Panels>
        <form onSubmit={handleSubmit}>
          <Row>
            <ul>
             {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
          </Row>
          <Row>
            <label>
              Email
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </Row>
          <Row>
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </Row>
          <Row>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </Row> 
          <Row>
            <label>
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
          </Row>
          <Row>
            <button type="submit">Sign Up</button>
          </Row>
        </form>
      </Panels>
    </Panel>
  );
}

export default SignupFormPage;
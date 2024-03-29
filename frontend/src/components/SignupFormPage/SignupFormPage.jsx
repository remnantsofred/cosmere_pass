import './SignupFormPage.css';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupFormPage.css'
import Panels from '../panels';
import Panel from '../panel/Panel';
import Columns from '../columns/Columns';
import Column from '../column/Column';
import Rows from '../rows/Rows'
import Row from '../row/Row'
import hero from './signUpheroCosmere.png'
import { MagicSwirlIcon, MagicStarIcon, CalendarIcon, UnlockIcon, SpellBookIcon } from '../icon/Icon'

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/search?start_time=0" />;

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

  const handleDemoLogin = (e) => {
    e.preventDefault();
    const credential = 'worldhopper';
    const password = 'password';
    return dispatch(sessionActions.login({ credential, password }))
    .catch(async (res) => {
      let data;
      try {
        // .clone() essentially allows you to read the response body twice
        data = await res.clone().json();
      } catch {
        data = await res.text(); // Will hit this case if the server is down
      }
      
    });
  }

  return (
    <Panel className='SignupLargePanel'>
      <Panels className="signupleftPanel">
          <h3 className="signupH3">Start your free trial</h3>
          <p id="signupP">
            Search, book and try lessons from top-rated areas with your free trial. When you 
            create your CosmerePass account, you’ll unlock unlimited access to all types of investiture lessons.
          </p>
          <img src={hero} id="heroSignUp" />
      </Panels>
      <h2 className='mobile-only-sign-up-title'>Sign up</h2>
      <Panels className="signuprightPanel">
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
          <Column className='iconCol'>
            <SpellBookIcon className='signupIcon'/>
          </Column>
          <Column className='signupCol'>
            Get <strong>20 credits</strong> to book as many as <strong>7 reservations</strong>.
          </Column>
        </Row>
        <Row className="signupRow">
          <Column className='iconCol'>
            <CalendarIcon className='signupIcon'/>
          </Column>
          <Column className='signupCol'>
            We’ll remind you <strong>2 days before</strong> your trial ends.
          </Column>
        </Row>
        <Row className="signupRow">
          <Column className='iconCol'>
            <UnlockIcon className='signupIcon'/>
          </Column>
          <Column className='signupCol'>
            You’re never locked in. <strong>Cancel anytime.</strong>
          </Column>
        </Row>
        <form onSubmit={handleSubmit} className="signupForm">
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
            <button type="submit" className='mobile-only-signup-button'>Sign up</button>
          </Row>
          <Row className="signupRow signUplineBelow" >
          </Row>
          <Row className="signupRow">
              <button onClick={handleDemoLogin} id="demologinButton" className='level1'>Demo Log In</button >
          </Row>
        </form>
      </Panels>
    </Panel>
  );
}

export default SignupFormPage;
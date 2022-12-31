import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import './LoginFormPage.css';
import Panels from '../panels';
import Panel from '../panel/Panel';
import Columns from '../columns/Columns';
import Column from '../column/Column';
import Row from '../row/Row';
import cosmere from './Cosmere_symbol.png';



const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
      return dispatch(sessionActions.login({ credential, password }))
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
  

  const handleDemoLogin = (e) => {
    e.preventDefault();
    const credential = 'daphne';
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
    <Panels className='loginlargePanel'>
      <Panel className="loginForm">
        <Panel className="loginNarrow">
          <form onSubmit={handleSubmit} >
            <Row className="loginRow">
              <h2 id="welcomeBack">Welcome back</h2>
            </Row>
            <Row className="loginRow">
              <ul id="errorMessage" className='level1'>
              {errors.map(error => <li key={error}>{error}</li>)}
              </ul>
            </Row>
            
            <Row className="loginRow">
              <label className='level1'>
                Email address
                <br />
                <input 
                  type="text"
                  value={credential}
                  className='level1'
                  onChange={(e) => setCredential(e.target.value)}
                  required
                />
              </label>
            </Row>
            <Row className="loginRow">
              <label className='level1'>
                Password
                <br />
                <input
                  type="password"
                  value={password}
                  className='level1'
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </Row>
            <Row className="loginRow">
                <button type="submit" id="loginButton" className='button-square'>Log in</button >
            </Row>
            
            <Row className="loginRow" id="lineBelow">
              <NavLink className="NavLink" id="resetPassword" to="/reset-password">Forgot your password?</NavLink>
            </Row>
            <Row className="loginRow">
                <button onClick={handleDemoLogin} id="demologinButton" className='level1'>Demo Log In</button >
            </Row>
          </form>
        </Panel>
      </Panel>
      <Panel className="loginrightBlurb">
        <img src={cosmere} id="cosmere" />
        <h3 className='loginH3'>New to ClassPass?</h3>
        <p className='loginP'>
          Become a member for Cosmere-wide access to hundreds of top-rated institutions.
        </p> 
        <NavLink className="NavLink" id="getStarted" to="/signup">Get started for free</NavLink>          
      </Panel>
    </Panels>
  );
}

export default LoginFormPage;
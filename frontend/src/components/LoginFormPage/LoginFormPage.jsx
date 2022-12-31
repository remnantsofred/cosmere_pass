import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginFormPage.css';
import Panels from '../panels';
import Panel from '../panel/Panel';
import Columns from '../columns/Columns';
import Column from '../column/Column';
import Rows from '../rows/Rows'
import Row from '../row/Row'

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
    <Panels className='largePanel'>
      <Panel>
        <form onSubmit={handleSubmit} >
          <Row>
            <h2>Welcome back</h2>
          </Row>
          <Row>
            <ul id="errorMessage" className='level1'>
            {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
          </Row>
          
          <Row>
            <label className='level1'>
              Username or Email 
              <input 
                type="text"
                value={credential}
                className='level1'
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
          </Row>
          <Row>
            <label className='level1'>
              Password
              <input
                type="password"
                value={password}
                className='level1'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </Row>
          <Row>
              <button type="submit" id="loginButton" className='level1'>Log In</button >
          </Row>
          <Row>
              <button onClick={handleDemoLogin} id="demologinButton" className='level1'>Demo Log In</button >
          </Row>
        </form>
      </Panel>
      <Panel>
          <span></span>
          <h3>New to ClassPass?</h3>
          <p>
            <span>Become a member for worldwide access to hundreds of top-rated institutions</span>
          </p>
      </Panel>
    </Panels>
  );
}

export default LoginFormPage;
import React, { useEffect, useState } from 'react'
import './App.css'
import { jwtDecode } from 'jwt-decode';

const App = () => {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    // console.log('Encoded jwt token: ', response.credential)
    var userObj = jwtDecode(response.credential)
    document.getElementById("signInDiv").hidden = true
    // console.log(userObj)
    setUser(userObj)
  }

  function handleSignOut(e) {
    setUser({})
    document.getElementById("signInDiv").hidden = false
  }

  useEffect(() => {
    // Ensure the global google object is available before initializing
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: '919743523025-lf7ncdr4sqsqdmda2s46pmovnhaka69f.apps.googleusercontent.com',
        callback: handleCallbackResponse
      })

      window.google.accounts.id.renderButton(
        document.getElementById('signInDiv'), {
        theme: 'outline', size: 'large'
      }
      )
    }
    window.google.accounts.id.prompt()
  }, []);

  //if user is logged in then show log out button
  //if user is not logged in then show sign in button

  return (
    <div>
      <div id='signInDiv'></div>
      {
        user &&
        <div>
          <img src={user.picture} />
          <h3>{user.name}</h3>
        </div>
      }
      <br />
      {
        Object.keys(user).length !== 0 &&
        <button onClick={(e) => handleSignOut(e)}>Sign out</button>
      }
    </div>

  )
}

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUser(user);
      fetchProfile(user.id);
    }
  }, []);

  const handleLogin = () => {
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data) {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        fetchProfile(data.id);
        setLoginError('');
      } else {
        setLoginError(data.message);
      }
    });
  };

  const fetchProfile = (userId) => {
    fetch(`https://dummyjson.com/users/${userId}`)
    .then(res => res.json())
    .then(profileData => {
      localStorage.setItem('profile', JSON.stringify(profileData));
      setProfile(profileData);
    });
  };
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="App">
      {!user ? (
        <div id="login" className='login'>
          <div class="login-form">
              <p style={{ color: 'gray' }}>Welcome back! 👋</p>
              <h3>Sign into your Profile</h3>
              <div>
                <label>Your Email</label><br/>
                <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
              </div>
              <div> 
                <label>Password</label><br/>
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <button onClick={handleLogin}>Login</button>
             <div style={{textAlign:'center'}}>
               <p style={{ color: 'red' }}>{loginError}</p>
              <p style={{ color: 'blue', margin:'5px' }}>Forgot Password?</p>
              </div>
             </div>
             <div style={{textAlign:'center',fontSize:"14px"}} > 
             <p>Don't have an account ? <span style={{ color: 'blue' }}> SignUp </span> </p>
             </div>
        </div>
      ) : (
        <div id="profile">
         
          {profile && (
            <div className="user-Profile">
              <p style={{ color: 'gray' }}>Welcome back! 👋</p>
              <h3>Welcome to your Profile</h3>
              <div className='image'>
                <img src={profile.image} alt="profile"/>
              </div>
              <p><strong>FirstName:</strong> {profile.firstName}</p>
              <p><strong>LastName:</strong> {profile.lastName}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Gender:</strong> {profile.gender}</p>
              <button onClick={handleLogout}>Logout</button>
              {/* Add more fields as needed */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

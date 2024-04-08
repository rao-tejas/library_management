import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate  = useNavigate(); // Initialize useHistory hook


  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8080/api/Student/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });
  
      if (response.ok) {
        const data = await response.text();
        if (data === 'Login successful') {
          toast.success('Login Sucessfully..');
          navigate(`/user/${email}`);
        } else {
          // Show error message if login failed
          toast.error('Login Failed..');
        }
      } else {
        // Show error message if response status is not OK
        toast.error('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Show error message for any unexpected errors
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };
  
  

  // Function to handle sign-up link click
  const handleSignUpClick = () => {
    navigate('/signup'); // Navigate to sign-up page
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="login-form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='loginBtn' type="submit">Login</button>
        <p> Do Not have an account? <span className="signup-link" onClick={handleSignUpClick}>Sign up</span></p>
      </form>
    </div>
  );
};

export default Login;

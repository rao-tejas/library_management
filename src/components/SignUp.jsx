import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import toast from 'react-hot-toast';


const SignUp = () => {
  const navigate = useNavigate(); 

  // State variables for form fields
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [branch, setBranch] = useState('');
  const [section, setSection] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    
    // Prepare student data
    const studentData = {
      name,
      email,
      password,
      phoneNumber,
      branch,
      section,
      profilePicturePath: '' // Add profile picture path if needed
    };

    // Make API call to register student
    try {
      const response = await fetch('http://localhost:8080/api/Student/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
      });

      if (response.ok) {
        navigate('/');
        toast.success('Successfully registered');
      }else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        toast.error(errorData.message);
        return;
      }
    } catch (error) {
        // const errorData = await response.json();
        setErrorMessage("Email Address Alredy Exist");
        toast.error("Email Address Alredy Exist"); 
        // Assuming the error message is returned in a 'message' field
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <div className="name-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {passwordMatchError && <p className="error-message">Passwords do not match.</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Mobile Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="branch">Branch:</label>
          <input
            type="text"
            id="branch"
            name="branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="section">Section:</label>
          <input
            type="text"
            id="section"
            name="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required
          />
        </div>
        <button className='signupBtn' type="submit">Sign Up</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>Already have an account? <span className="login-link" onClick={() => navigate('/')}>Login</span></p>
      </form>
    </div>
  );
};

export default SignUp;

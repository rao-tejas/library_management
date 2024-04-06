import { NavLink } from 'react-router-dom';
import  { useState } from 'react';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [showTime, setShowTime] = useState(false);

  // Function to toggle time display
  const toggleTimeDisplay = () => {
    setShowTime(!showTime);
  };

  return (
    <div>
      <nav>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <NavLink to="/" exact activeClassName="active"><li>Home</li></NavLink>
        <NavLink to="/about" activeClassName="active"><li>About</li></NavLink>
        <NavLink to="/timings" onMouseEnter={toggleTimeDisplay} onMouseLeave={toggleTimeDisplay}>
          <li>Timings</li>
          {showTime && <span className="time">10:00 AM - 6:00 PM</span>}
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;

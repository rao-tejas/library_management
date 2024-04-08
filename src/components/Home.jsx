import  { useState, useEffect } from 'react';
import library1 from '../assets/Library.png';
import library2 from '../assets/Library 3.jpg';
import library3 from '../assets/libraryBooks.jpg';
import Login from './Login.jsx';
import './Home.css'; 
// import Link from 'react-router-dom'

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [library1, library2, library3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="grid-container">
        <div className="corosal-grid-item">
          <div className="content">
            <h1>Library Management System</h1>
            <p>Knowledge is free at the library. Just bring your own container.</p>
            {/* Link to the login page */}
            {/* <Link to="/login" className="btn btn-primary">Login</Link> */}
          </div>
          <div>
          <Login />

          </div>
        </div>
        <div className="corosal-grid-item">
          <div className="carousel">
            <div className="carousel-inner" style={{ gridRow: '1/3' }}>
              {images.map((image, index) => (
                <div key={index} className={`carousel-item ${index === currentSlide ? 'active' : ''}`}>
                  <img className="corosal-image" src={image} alt={`Slide ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

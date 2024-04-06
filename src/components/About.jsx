import libraryImage1 from '../assets/Library 3.jpg';
import libraryImage2 from '../assets/Library.png';
import libraryImage3 from '../assets/libraryBooks.jpg';
import './About.css'; // Import your CSS file

const About = () => {
  return (
    <div style={{ height: '76vh', width:'100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2>About Us</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <img src={libraryImage1} alt="Library" style={{ width: '300px', height: '200px', margin: '10px' }} />
        <img src={libraryImage2} alt="Library" style={{ width: '300px', height: '200px', margin: '10px' }} />
        <img src={libraryImage3} alt="Library" style={{ width: '300px', height: '200px', margin: '10px' }} />
      </div>
      <p>Welcome to our Library Management System! We are dedicated to providing a seamless experience for both librarians and patrons.</p>
      <p>Our system allows librarians to efficiently manage books, track borrowing history, and handle library operations effectively.</p>
      <p>For patrons, our system offers easy access to the library catalog, online reservations, and personalized recommendations.</p>
      <p>Feel free to explore our system and don't hesitate to contact us if you have any questions or feedback!</p>
    </div>
  );
};

export default About;

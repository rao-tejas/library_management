import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import About from './components/About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from './components/User';
import SignUp from './components/SignUp';
import BorrowNewBook from './components/BorrowNewBook';
import BorrowedBooks from './components/BorrowedBooks';
import  { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Toaster  position="bottom-center"
        reverseOrder={false} />
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/user/:username" element={<User />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/borrowedBook/:username" element={<BorrowedBooks />} />
          <Route path="/borrowNewBook/:username" element={<BorrowNewBook />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import  { useState, useEffect } from 'react';
// import axios from 'axios';
import './BorrowedBooks.css'; // Import the CSS file for styling
import { useParams } from 'react-router-dom';

const BorrowedBooks = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/transaction/borrowBook/borrowedByEmailAddress?email=${params.username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch borrowed books');
                }
                const data = await response.json();
                setBorrowedBooks(data);
            } catch (error) {
                console.error('Error fetching borrowed books:', error.message);
            }
        };

        fetchData();
    }, [params.username]);

    return (
        <div className="borrowed-books-container">
            <h2>Borrowed Books</h2>
            <div className="grid-container">
                {borrowedBooks.map((borrowedBook) => (
                    <div key={borrowedBook.id} className="grid-item">
                        <img src={`http://localhost:5173/Books/${borrowedBook.book.coverImage}`} alt={borrowedBook.book.bookName} />
                        <div className="book-details">
                            {/* <h3>{borrowedBook.book.bookName}</h3>
                            <p>Author: {borrowedBook.book.author}</p>
                            <p>Department: {borrowedBook.book.department}</p>
                            <p>Position: {borrowedBook.book.position}</p> */}
                            <p>Issued Date: {borrowedBook.issuedDate}</p>
                            <p>Return Date: {borrowedBook.returnDate}</p>
                            <p>Penalty: {borrowedBook.penalty}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BorrowedBooks;

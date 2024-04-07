import { useState, useEffect } from 'react';
import './BorrowNewBooks.css';
import { useParams } from 'react-router-dom';


const BorrowNewBook = () => {
    const [books, setBooks] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [borrowMessage, setBorrowMessage] = useState('');
    const params = useParams();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/Book/all');
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error.message);

            }
        };

        fetchBooks();
    }, []);

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
    };

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/Book/all');
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error.message);
        }
    };
    
    const handleBorrowClick = async (bookId) => {
        try {
            const response = await fetch('http://localhost:8080/api/transaction/borrowBook/borrow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: params.username, 
                    bookId: bookId,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to borrow book');
            }
    
            const data = await response.json();
            if (data.status === 'success') {
                // Borrowing was successful
                setBorrowMessage(data.message);
                alert("Book Borrowed Sucessfully"); 
                fetchBooks();
            } else {
                // Borrowing failed
                setBorrowMessage(data.message);
                alert(data.message); 
            }
        } catch (error) {
            console.error('Error borrowing book:', error.message);
            alert('Error borrowing books:', error.message); 
            setBorrowMessage('An error occurred while borrowing the book.');
        }
    };
    
    
    const filteredBooks = selectedDepartment === 'All' ? books : books.filter(book => book.department === selectedDepartment);

    return (
        <div className="borrow-new-books-container">
            <div className="borrow-message">{borrowMessage}</div>
            <div className="filter-dropdown">
                <label htmlFor="department">Filter by Department:</label>
                <select id="department" value={selectedDepartment} onChange={handleDepartmentChange}>
                    <option value="All">All</option>
                    {/* Map over unique departments to create dropdown options */}
                    {Array.from(new Set(books.map(book => book.department))).map(department => (
                        <option key={department} value={department}>{department}</option>
                    ))}
                </select>
            </div>
            <div className="book-grid">
                {filteredBooks.map(book => (
                    <div key={book.id} className="book-card">
                        <img src={`http://localhost:5173/Books/${book.coverImage}`} alt={book.bookName} />
                        <div className="book-details">
                            <p>Position: {book.position}</p>
                            <p>Count: {book.count}</p>
                        </div>
                        <div className="borrowButton">
                            {book.count > 0 && (
                                <button onClick={() => handleBorrowClick(book.id)}>Borrow</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BorrowNewBook;

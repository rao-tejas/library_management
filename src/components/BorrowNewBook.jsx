import { useState, useEffect } from 'react';
import './BorrowNewBooks.css';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



const BorrowNewBook = () => {
    const navigate = useNavigate(); 
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

    const handleBorrowedBook = async ()=>{
        navigate(`/borrowedBook/${params.username}`); 

    };
    const handleBorrowClick = async (bookId) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "Do you want to borrow this book?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, borrow it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
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

                    const data = await response.json();
                    if (data.status === 'success') {
                        // Borrowing was successful
                        setBorrowMessage(data.message);
                        toast.success("Book Borrowed Successfully");
                        fetchBooks();
                    } else {
                        // Borrowing failed
                        setBorrowMessage(data.message);
                        toast.error(data.message);
                    }
                } catch (error) {
                    console.error('Error borrowing book:', error.message);
                    toast.error('Error borrowing books:', error.message);
                    setBorrowMessage('An error occurred while borrowing the book.');
                }
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    "Cancelled",
                    "Your imaginary file is safe :)",
                    "error"
                );
            }
        });
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
                        <div className="borrow-new-book-details">
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
            <div className="goToBorrowed">
                <button onClick={() => handleBorrowedBook()}>Go To Borrowd Books</button>
            </div>
        </div>
    );
};

export default BorrowNewBook;

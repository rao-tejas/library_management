import { useState, useEffect } from 'react';
// import axios from 'axios';
import './BorrowedBooks.css'; // Import the CSS file for styling
import { useParams } from 'react-router-dom';
// import toast from 'react-hot-toast';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';



const BorrowedBooks = () => {
    const navigate = useNavigate(); 

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

    const handleBorrowNewBook = async ()=>{
        navigate(`/borrowNewBook/${params.username}`); 

    };

    const handleReturnBook = async (bookId, returnDate) => {
        // Calculate penalty if return date is past due
        const dueDate = new Date(returnDate);
        const currentDate = new Date();
        const daysDifference = Math.ceil((currentDate - dueDate) / (1000 * 60 * 60 * 24));
        const penalty = daysDifference > 0 ? daysDifference * 50 : 0;
    
        // Show confirmation popup
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
    
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: `You won't be able to revert this! Penalty: ${penalty} INR`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, return it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch('http://localhost:8080/api/transaction/borrowBook/return', {
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
                        // Return was successful
                        swalWithBootstrapButtons.fire(
                            "Returned!",
                            "The book has been returned.",
                            "success"
                        );
                        fetchData();
                    } else {
                        // Return failed
                        swalWithBootstrapButtons.fire(
                            "Error!",
                            data.message,
                            "error"
                        );
                    }
                } catch (error) {
                    console.error('Error returning book:', error.message);
                    swalWithBootstrapButtons.fire(
                        "Error!",
                        error.message,
                        "error"
                    );
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
    

    return (
        <div className="borrowed-books-container">
            <h2>Borrowed Books</h2>
            <div className="borrowed-grid-container">
                {borrowedBooks.map((borrowedBook) => (
                    <div key={borrowedBook.id} className="borrowed-book-grid-item">
                        <img src={`http://localhost:5173/Books/${borrowedBook.book.coverImage}`} alt={borrowedBook.book.bookName} />
                        <div className="book-details">
                            {/* <h3>{borrowedBook.book.bookName}</h3>
                            <p>Author: {borrowedBook.book.author}</p>
                            <p>Department: {borrowedBook.book.department}</p>
                            <p>Position: {borrowedBook.book.position}</p> */}
                            <p>Issued Date: {new Date(borrowedBook.issuedDate).toLocaleDateString()}</p>
                            <p>Return Date: {new Date(borrowedBook.returnDate).toLocaleDateString()}</p>
                            {/* <p>Penalty: {borrowedBook.penalty}</p> */}
                        </div>
                        <div className="returnButton">

                            <button onClick={() => handleReturnBook(borrowedBook.bookId,borrowedBook.returnDate)}>Return</button>

                        </div>
                    </div>
                ))}
            </div>
            <div className="borrowNewRoute">
                <button onClick={() => handleBorrowNewBook()}>Get New Book</button>
            </div>
        </div>
    );
};

export default BorrowedBooks;

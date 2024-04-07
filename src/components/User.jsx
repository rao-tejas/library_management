import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './User.css';
import user from '../assets/user.png';
import { useNavigate } from 'react-router-dom';


const User = () => {
    const navigate = useNavigate(); 

    const params = useParams();
    const [studentDetails, setStudentDetails] = useState(null);

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/Student/getByEmail/${params.username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch student details');
                }
                const data = await response.json();
                setStudentDetails(data);
            } catch (error) {
                console.error('Error fetching student details:', error.message);
            }
        };

        fetchStudentDetails();
    }, [params.username]);

    const handleBorrowNewBooksClick = () => {
        navigate(`/borrowNewBook/${params.username}`); 
    };

    const handleBorrowedBooksClick = () => {
        navigate(`/borrowedBook/${params.username}`); 
    };

    return (
        <div className="user-profile fullscreen">
            {/* <h2>User Profile</h2> */}
            {studentDetails ? (
                <div className="user-details">
                    <div className="profile-photo">
                        <img src={user} alt="Profile" />
                    </div>
                    <div className="details">
                        <table className="user-details-table">
                            <tbody>
                                <tr>
                                    <td>Full Name:</td>
                                    <td>{studentDetails.firstName} {studentDetails.lastName}</td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>{studentDetails.email}</td>
                                </tr>
                                <tr>
                                    <td>Phone Number:</td>
                                    <td>{studentDetails.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td>Branch:</td>
                                    <td>{studentDetails.branch}</td>
                                </tr>
                                <tr>
                                    <td>Section:</td>
                                    <td>{studentDetails.section}</td>
                                </tr>
                                {/* Add other student details as needed */}
                            </tbody>
                        </table>
                    </div>

                </div>
            ) : (
                <p>Loading...</p>
            )}
             <div className="button-container">
                    <button className="action-button" onClick={() => handleBorrowNewBooksClick()}>Borrow New Books</button>
                    <button className="action-button" onClick={() => handleBorrowedBooksClick()}>Borrowed Books</button>
                </div>
        </div>
    );
};

export default User;

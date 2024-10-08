import React, { useState } from 'react';
import axios from 'axios';

const LeavingForm = () => {
    const [studentName, setStudentName] = useState('');
    const [leavingTime, setLeavingTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [reason, setReason] = useState('');
    const [parentMobile, setParentMobile] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('jwtToken'); // Retrieve JWT token from sessionStorage

        // Config object to include in the request
        const config = {
            headers: {
                Authorization:token, // Make sure to include "Bearer " before the token
            },
        };

        // Request body containing the form data
        const formData = { 
            studentName,
            leavingTime,
            arrivalTime,
            reason,
            parentMobile,
        };

        try {
            const response = await axios.post(
                'http://localhost:3031/api/leaving-forms/submit-leaving-form',
                formData, // Send the form data as the second argument
                config // Pass the config object as the third argument
            );
            alert(response.data.message);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Hostel Leaving Form</h2>
            <input
                type="text"
                placeholder="Student Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
            />
            <input
                type="datetime-local"
                value={leavingTime}
                onChange={(e) => setLeavingTime(e.target.value)}
                required
            />
            <input
                type="datetime-local"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                required
            />
            <textarea
                placeholder="Reason for leaving"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Parent's Mobile Number"
                value={parentMobile}
                onChange={(e) => setParentMobile(e.target.value)}
                required
            />
            <button type="submit">Submit Leaving Form</button>
        </form>
    );
};

export default LeavingForm;

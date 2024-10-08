import React, { useState } from 'react';
import axios from 'axios';

const ComplaintForm = () => {
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Replace 'studentId' with actual logic to get the logged-in student's ID
        const studentId = '12345'; 
        try {
            await axios.post('/api/students/complaint', { studentId, description });
            setDescription('');
            alert('Complaint submitted successfully!');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Submit a Complaint</h2>
            <textarea
                placeholder="Describe your problem"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button type="submit">Submit Complaint</button>
        </form>
    );
};

export default ComplaintForm;

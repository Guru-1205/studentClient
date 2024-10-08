import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentDetails = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch student details when component mounts
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const token = sessionStorage.getItem('jwtToken');
        console.log(token);// Retrieve JWT token from localStorage
        const config = {
          headers: {
            Authorization: token,
          },
        };

        const response = await axios.get('http://localhost:3031/api/students/get-student-details', config);
        setStudent(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch student details');
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!student) {
    return <div>No student details found</div>;
  }

  return (
    <div>
      <h2>Student Details</h2>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Roll No:</strong> {student.rollNo}</p>
      <p><strong>Class/Branch/Section:</strong> {student.classBranchSection}</p>
      <p><strong>Year of Study:</strong> {student.yearOfStudy}</p>
      <p><strong>Father's Name:</strong> {student.fatherName}</p>
      <p><strong>Mother's Name:</strong> {student.motherName}</p>
      <p><strong>Mobile:</strong> {student.studentMobile}</p>
      <p><strong>Email:</strong> {student.studentEmail}</p>
      <p><strong>In Hostel:</strong> {student.inHostel ? 'Yes' : 'No'}</p>
      {/* Add other fields as needed */}
    </div>
  );
};

export default StudentDetails;

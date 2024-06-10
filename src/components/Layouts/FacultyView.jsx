import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

const FacultyView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await Promise.all([fetchUser(), fetchSubjects(), fetchFacultySubjects()]);
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('/subject');
      setSubjects(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/user/${id}`);
      console.log(response?.data?.role?._id,"user");
      setUserData(response.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const fetchFacultySubjects = async () => {
    try {
      const response = await axios.get(`/facultysubject/${id}`);
      const subjects = response.data.flatMap(data => data.subject.map(sub => sub._id));
      setSelectedSubjects(subjects);
      console.log(subjects, "subjects");
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleCheckboxChange = (subjectId) => {
    setSelectedSubjects(prevSelectedSubjects => {
      if (prevSelectedSubjects.includes(subjectId)) {
        return prevSelectedSubjects.filter(id => id !== subjectId);
      } else {
        return [...prevSelectedSubjects, subjectId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(selectedSubjects, "selected subjects");
      const data = {
        userId: id,
        roleId: userData?.role?._id,
        subject: selectedSubjects
      };
      console.log(data, "submit");
      await axios.post(`/facultysubject`, data);
      alert("Subjects assigned successfully");
      // navigate('/some-path'); 
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      {userData && (
        <div>
          <p>Name: {userData.firstname + ' ' + userData.lastname}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <h3>Assign Subjects</h3>
        {subjects.map(subject => (
          <div key={subject._id}>
            <input
              type="checkbox"
              id={subject._id}
              checked={selectedSubjects.includes(subject._id)}
              onChange={() => handleCheckboxChange(subject._id)}
            />
            <label htmlFor={subject._id}>{subject.name}</label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FacultyView;

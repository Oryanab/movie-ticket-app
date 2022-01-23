import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { studentActions } from '../../Redux/CombineActions/studentsActions';
import { State } from '../../Redux/Types/storeTypes';
import { Card, Form, Button } from 'react-bootstrap';
import { Students } from '../../Redux/Types/studentsReducerTypes';

export default function Student() {
  const Dispatch = useDispatch();
  const students = useSelector((state: State) => state.students);

  // use States
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('0');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    Dispatch(studentActions.getAllStudents());
  }, []);

  const handleFormSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const addStudentRequest = axios
      .post('http://localhost:4000/post', {
        name: name,
        gender: gender,
        age: Number(age),
        dateOfBirth: dob,
        address: address,
      })
      .then(response => {
        alert(response.data);
        Dispatch(studentActions.getAllStudents());
        setName('');
        setGender('male');
        setAge('');
        setDob('');
        setAddress('');
      })
      .catch(err => {
        alert(err);
      });
  };
  return (
    <div>
      <h1>Form</h1>
      <>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              type="text"
              placeholder="your name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Choose Gender:</Form.Label>
            <Form.Select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setGender(e.target.value)}>
              <option>male</option>
              <option>female</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Age:</Form.Label>
            <Form.Control
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAge(e.target.value)}
              type="number"
              placeholder="Your Age"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Date Of Birth:</Form.Label>
            <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDob(e.target.value)} type="date" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
              type="text"
              placeholder="your address"
            />
          </Form.Group>
          <Button
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              handleFormSubmit(e);
            }}
            variant="primary"
            type="submit"
          >
            Add Student
          </Button>
        </Form>
      </>
      <h1>All Students:</h1>
      <>
        {students.map((student: Students) => (
          <Card key={student.name} style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Name: {student.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">DOB: {student.dateOfBirth}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">Age: {student.age}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">Gender: {student.gender}</Card.Subtitle>
              <Card.Text>Address: {student.address}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </>
    </div>
  );
}

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FilterStudentList from './FilterStudentList';

const FormFilter = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('all');
  const [type, setType] = useState('all');
  const [formValues, setFormValues] = useState(null);
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setFormValues({ startDate, endDate, status, type });
  };

  return (
    <>
      <div className="w-50">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="startDate">
            <Form.Label>Start Date:</Form.Label>
            <Form.Control type="date" value={startDate} onChange={handleStartDateChange} />
          </Form.Group>
          <Form.Group controlId="endDate">
            <Form.Label>End Date:</Form.Label>
            <Form.Control type="date" value={endDate} onChange={handleEndDateChange} />
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Select Status:</Form.Label>
            <Form.Control as="select" value={status} onChange={handleStatusChange}>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="selectType">
            <Form.Label>Select Type:</Form.Label>
            <Form.Control as="select" value={type} onChange={handleTypeChange}>
              <option value="all">All</option>
              <option value="institutes">Intitutes</option>
              <option value="students">Students</option>
              <option value="teachers">Teachers</option>
            </Form.Control>
          </Form.Group>
          <Button style={{ transform: 'scale(0.7)' }} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>

      <div>{endDate && startDate && <FilterStudentList {...formValues} />}</div>
    </>
  );
};

export default FormFilter;

// TaskForm.js

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { firestore } from '../firebase'; // Import the Firestore instance
import toast from 'react-hot-toast';

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState('');
  const [objective, setObjective] = useState('');
  const [description, setDescription] = useState('');
  const [theoryAndResearch, setTheoryAndResearch] = useState('');
  const [practicalSimulation, setPracticalSimulation] = useState('');
  const [presentation, setPresentation] = useState('');
  const [evaluationCriteria, setEvaluationCriteria] = useState('');
  const [taskExtension, setTaskExtension] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    // Using toast.promise for displaying loading, success, and error states
    const taskPromise = async () => {
      // Add task data to Firestore
      const newTaskRef = await firestore.collection('tasks').add({
        task,
        objective,
        description,
        theoryAndResearch,
        practicalSimulation,
        presentation,
        evaluationCriteria,
        taskExtension
      });

      // Add new task to the local state
      addTask({
        id: newTaskRef.id,
        task,
        objective,
        description,
        theoryAndResearch,
        practicalSimulation,
        presentation,
        evaluationCriteria,
        taskExtension
      });

      // Reset form fields after submission
      setTask('');
      setObjective('');
      setDescription('');
      setTheoryAndResearch('');
      setPracticalSimulation('');
      setPresentation('');
      setEvaluationCriteria('');
      setTaskExtension('');

      // Return the ID of the newly added task
      return newTaskRef.id;
    };

    // Display loading, success, and error states using toast.promise
    toast.promise(taskPromise(), {
      loading: 'Adding task...',
      success: taskId => {
        return <b>Task added successfully</b>;
      },
      error: <b>Error adding task</b>,
    });
  };
  return (
    <Container>
      <Row className="justify-content-center mt-5 pb-5">
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="task">
              <Form.Label className='font-weight-bold'>Task</Form.Label>
              <Form.Control type="text" value={task} onChange={e => setTask(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="objective">
              <Form.Label>Objective</Form.Label>
              <Form.Control type="text" value={objective} onChange={e => setObjective(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Task Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="theoryAndResearch">
              <Form.Label>Theory and Research</Form.Label>
              <Form.Control as="textarea" rows={3} value={theoryAndResearch} onChange={e => setTheoryAndResearch(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="practicalSimulation">
              <Form.Label>Practical Simulation</Form.Label>
              <Form.Control as="textarea" rows={3} value={practicalSimulation} onChange={e => setPracticalSimulation(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="presentation">
              <Form.Label>Presentation</Form.Label>
              <Form.Control as="textarea" rows={3} value={presentation} onChange={e => setPresentation(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="evaluationCriteria">
              <Form.Label>Evaluation Criteria</Form.Label>
              <Form.Control as="textarea" rows={3} value={evaluationCriteria} onChange={e => setEvaluationCriteria(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="taskExtension">
              <Form.Label>Task Extension</Form.Label>
              <Form.Control as="textarea" rows={3} value={taskExtension} onChange={e => setTaskExtension(e.target.value)} required />
            </Form.Group>
            <div className='d-flex justify-content-center'>
              <Button className='mt-5 w-75 ' variant="primary" type="submit">Add Task</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskForm;

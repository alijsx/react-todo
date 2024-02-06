// TaskModal.js

import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { Modal, Button, Form } from 'react-bootstrap';

const TaskModal = ({ show, handleClose, task, setTask }) => {
  const [taskName, setTaskName] = useState('');
  const [objective, setObjective] = useState('');
  const [description, setDescription] = useState('');
  const [evaluationCriteria, setEvaluationCriteria] = useState('');
  const [taskExtension, setTaskExtension] = useState('');

  useEffect(() => {
    if (task) {
      setTaskName(task.name);
      setObjective(task.objective || '');
      setDescription(task.description || '');
      setEvaluationCriteria(task.evaluationCriteria || '');
      setTaskExtension(task.taskExtension || '');
    } else {
      setTaskName('');
      setObjective('');
      setDescription('');
      setEvaluationCriteria('');
      setTaskExtension('');
    }
  }, [task]);

  const handleSave = () => {
    if (task) {
      firestore.collection('tasks').doc(task.id).update({ name: taskName, objective, description, evaluationCriteria, taskExtension });
      setTask(null);
    } else {
      firestore.collection('tasks').add({ name: taskName, objective, description, evaluationCriteria, taskExtension, completed: false });
    }
    setTaskName('');
    setObjective('');
    setDescription('');
    setEvaluationCriteria('');
    setTaskExtension('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{task ? 'Edit Task' : 'Add Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="taskName">
            <Form.Label>Task Name</Form.Label>
            <Form.Control type="text" value={taskName} onChange={e => setTaskName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="objective">
            <Form.Label>Objective</Form.Label>
            <Form.Control type="text" value={objective} onChange={e => setObjective(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Task Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="evaluationCriteria">
            <Form.Label>Evaluation Criteria</Form.Label>
            <Form.Control type="text" value={evaluationCriteria} onChange={e => setEvaluationCriteria(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="taskExtension">
            <Form.Label>Task Extension</Form.Label>
            <Form.Control type="text" value={taskExtension} onChange={e => setTaskExtension(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          {task ? 'Update Task' : 'Save Task'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;

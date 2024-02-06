import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { Container, Card, Button, Modal, Pagination, Form } from 'react-bootstrap';
import toast from 'react-hot-toast'

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(6); // Number of tasks to display per page
  const [editModalShow, setEditModalShow] = useState(false);
  const [editedTask, setEditedTask] = useState('');
  const [editedObjective, setEditedObjective] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedTheoryAndResearch, setEditedTheoryAndResearch] = useState('');
  const [editedPracticalSimulation, setEditedPracticalSimulation] = useState('');
  const [editedPresentation, setEditedPresentation] = useState('');
  const [editedEvaluationCriteria, setEditedEvaluationCriteria] = useState('');
  const [editedTaskExtension, setEditedTaskExtension] = useState('');

  useEffect(() => {
    const unsubscribe = firestore.collection('tasks').onSnapshot(snapshot => {
      const tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, []);

  // Get current tasks for pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleViewDetails = task => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  const handleCompleteTask = (taskId, completed) => {
    firestore.collection('tasks').doc(taskId).update({ completed: !completed });
  };

  const handleEditTask = task => {
    setSelectedTask(task);
    setEditedTask(task.task);
    setEditedObjective(task.objective);
    setEditedDescription(task.description);
    setEditedTheoryAndResearch(task.theoryAndResearch);
    setEditedPracticalSimulation(task.practicalSimulation);
    setEditedPresentation(task.presentation);
    setEditedEvaluationCriteria(task.evaluationCriteria);
    setEditedTaskExtension(task.taskExtension);
    setEditModalShow(true);
  };

  const handleEditModalClose = () => {
    setEditModalShow(false);
    setSelectedTask(null);
  };

  const handleEditSubmit = async e => {
    e.preventDefault();
    const { id } = selectedTask;

    // Using toast.promise for displaying loading, success, and error states
    const editPromise = firestore.collection('tasks').doc(id).update({
      title: editedTask,
      objective: editedObjective,
      description: editedDescription,
      theoryAndResearch: editedTheoryAndResearch,
      practicalSimulation: editedPracticalSimulation,
      presentation: editedPresentation,
      evaluationCriteria: editedEvaluationCriteria,
      taskExtension: editedTaskExtension
    });

    toast.promise(
      editPromise,
      {
        loading: 'Updating task...',
        success: <b>Task updated successfully!</b>,
        error: <b>Error updating task. Please try again later.</b>,
      }
    );

    // Close the edit modal and reset selected task after the operation
    setEditModalShow(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = async taskId => {
    // Using toast.promise for displaying loading, success, and error states
    const deletePromise = async () => {
      await firestore.collection('tasks').doc(taskId).delete();
    };

    // Display loading, success, and error states using toast.promise
    toast.promise(deletePromise(), {
      loading: 'Deleting task...',
      success: <b>Task deleted successfully</b>,
      error: <b>Error deleting task</b>,
    });
  };


  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <div>
        <h1 className="mb-4">Tasks</h1>
        <div className="card-columns">
          {currentTasks.map(task => (
            <Card key={task.id} className={`mb-2 ${task.completed ? 'opacity-50' : ''}`} style={{ width: '24rem' }}>
              <Card.Body>
                <Card.Title>{task.task}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Button variant="primary" onClick={() => handleViewDetails(task)}>Details</Button>
                <Button className="m-1" onClick={() => handleCompleteTask(task.id, task.completed)}>
                  {task.completed ? 'Undo' : 'Complete'}
                </Button>
                <Button className="m-1" onClick={() => handleEditTask(task)}>Edit</Button>
                <Button className="m-1" variant="danger" onClick={() => handleDeleteTask(task.id)}>Delete</Button>
              </Card.Body>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <Pagination className="mt-4 justify-content-center">
          {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }, (_, i) => (
            <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      {/* Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Title: {selectedTask?.task}</h5>
          <p><strong>Objective:</strong> {selectedTask?.objective}</p>
          <p><strong>Description:</strong> {selectedTask?.description}</p>
          <p><strong>Theory and Research:</strong> {selectedTask?.theoryAndResearch}</p>
          <p><strong>Practical Simulation:</strong> {selectedTask?.practicalSimulation}</p>
          <p><strong>Presentation:</strong> {selectedTask?.presentation}</p>
          <p><strong>Evaluation Criteria:</strong> {selectedTask?.evaluationCriteria}</p>
          <p><strong>Task Extension:</strong> {selectedTask?.taskExtension}</p>
          {/* Add more details as needed */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Edit Modal */}
      <Modal show={editModalShow} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="editedTask">
              <Form.Label className='font-weight-bold'>Task</Form.Label>
              <Form.Control type="text" value={editedTask} onChange={e => setEditedTask(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="editedObjective">
              <Form.Label>Objective</Form.Label>
              <Form.Control type="text" value={editedObjective} onChange={e => setEditedObjective(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="editedDescription">
              <Form.Label>Task Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={editedDescription} onChange={e => setEditedDescription(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="editedTheoryAndResearch">
              <Form.Label>Theory and Research</Form.Label>
              <Form.Control as="textarea" rows={3} value={editedTheoryAndResearch} onChange={e => setEditedTheoryAndResearch(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="editedPracticalSimulation">
              <Form.Label>Practical Simulation</Form.Label>
              <Form.Control as="textarea" rows={3} value={editedPracticalSimulation} onChange={e => setEditedPracticalSimulation(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="editedPresentation">
              <Form.Label>Presentation</Form.Label>
              <Form.Control as="textarea" rows={3} value={editedPresentation} onChange={e => setEditedPresentation(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="editedEvaluationCriteria">
              <Form.Label>Evaluation Criteria</Form.Label>
              <Form.Control as="textarea" rows={3} value={editedEvaluationCriteria} onChange={e => setEditedEvaluationCriteria(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="editedTaskExtension">
              <Form.Label>Task Extension</Form.Label>
              <Form.Control as="textarea" rows={3} value={editedTaskExtension} onChange={e => setEditedTaskExtension(e.target.value)} required />
            </Form.Group>
            <div className='d-flex justify-content-center'>
              <Button className='mt-5 w-75 ' variant="primary" type="submit">Update Task</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

    </Container>
  );
};

export default TasksPage;

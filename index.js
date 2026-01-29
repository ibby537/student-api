const express = require('express');
const students = require('./data/students');

const app = express();
const PORT = 3000;

app.use(express.json());


// GET all students
app.get('/api/students', (req, res) => {
  res.json(students);
});


// GET student by id
app.get('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.json(student);
});


// POST new student
app.post('/api/students', (req, res) => {
  const { name, course, year, status } = req.body;

  if (!name || !course) {
    return res.status(400).json({
      message: 'Name and course are required'
    });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    course,
    year,
    status
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
});

app.put('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  const { name, course, year, status } = req.body;

  if (name !== undefined) student.name = name;
  if (course !== undefined) student.course = course;
  if (year !== undefined) student.year = year;
  if (status !== undefined) student.status = status;

  res.json(student);
});


// START SERVER (always last)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});






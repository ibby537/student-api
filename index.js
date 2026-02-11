const express = require('express');
const students = require('./data/students');

const app = express();
const PORT = 3000;

app.use(express.json());


app.get('/api/students', (req, res) => {
  const year = parseInt(req.query.year);

  if (year) {
    const filtered = students.filter(s => s.year === year);
    return res.json(filtered);
  }

  res.json(students);
});



// GET student by id
app.get('/api/students', (req, res) => {
  let result = students;

  const { year, status, name } = req.query;

  if (year) {
    result = result.filter(s => s.year === parseInt(year));
  }

  if (status) {
    result = result.filter(s => s.status === status);
  }

  if (name) {
    result = result.filter(s =>
      s.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  res.json(result);
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
// DELETE student by id
app.delete('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  const deletedStudent = students.splice(index, 1);

  res.json({
    message: 'Student deleted',
    student: deletedStudent[0]
  });
});


// START SERVER (always last)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});






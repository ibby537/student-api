const express = require('express');
const students = require('./data/students');

const app = express();
const PORT = 3000;

app.use(express.json());


app.get('/api/students', (req, res) => {
  res.json(students);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.get('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.json(student);
});

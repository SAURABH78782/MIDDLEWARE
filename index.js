const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'src', 'access.log'), { flags: 'a' });


app.use(morgan(':method :status :res[content-length] - :response-time ms :http-version :url :date[clf]', { stream: accessLogStream }));


app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Homepage!');
});

app.get('/get-users', (req, res) => {
  res.status(200).json({ message: 'Fetching all users...' });
});

app.post('/add-user', (req, res) => {
  res.status(201).json({ message: 'User added successfully!' });
});

app.put('/user/:id', (req, res) => {
  const { id } = req.params;
  res.status(201).json({ message: `User with ID ${id} updated successfully!` });
});

app.delete('/user/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `User with ID ${id} deleted successfully!` });
});


const PORT = process.env.PORT || 3001;  


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

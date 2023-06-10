import express from 'express';
import bodyParser from 'body-parser';

const port = 5000;
const app = express();

app.use(bodyParser.json());

let users = [];
let nextId = 1;

// GET method to retrieve all users
app.get('/users', (req, res) => {
    res.send(users);
});

// POST method to add a new user
app.post('/users', (req, res) => {
    const newUser = req.body;
    const userWithId = {
        id: nextId,
        ...newUser
    };
    users.push(userWithId);
    nextId++;
    res.send(`User with the username ${newUser.name} added to the database.`);
});

// GET method to retrieve a specific user by ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const findUser = users.find((user) => user.id == id);
    if (findUser) {
        res.send(findUser);
    } else {
        res.status(404).send('User not found.');
    }
});

// DELETE method to remove a user by ID
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter((user) => user.id != id);
    res.send(`Deleted the user with the ID ${id} and removed from the database.`);
});

// PATCH method to update a user by ID
app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, nationality, city, age } = req.body;
    const userUpdate = users.find((user) => user.id == id);

    if (!userUpdate) {
        res.status(404).send('User not found.');
        return;
    }

    if (name) userUpdate.name = name;
    if (nationality) userUpdate.nationality = nationality;
    if (city) userUpdate.city = city;
    if (age) userUpdate.age = age;

    res.send(`User with ID ${id} has been updated.`);
});

// GET method for the home page
app.get('/', (req, res) => {
    res.send('Hello, welcome to the Home page');
});

// Start the server
app.listen(port, () =>
    console.log(`The server is running at http://localhost:${port}`)
);

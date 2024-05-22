const express = require('express');
const bodyParser = require('body-parser');
const users = require('./data.json');
const fs = require('fs');
const app = express();
const port = 3000;
const url = 'D:\\2024\\NodeJS\\Code\\buoi3\\src\\data.json';
app.use(bodyParser.json());

app.get('/users', (req, res) => {
    console.log(req.query);
    const { id, name, Age } = req.query;

    let filteredUsers = users;

    if (id) {
        filteredUsers = filteredUsers.filter(user => user.id.toString() === id);
    }
    if (name) {
        filteredUsers = filteredUsers.filter(user => user.name === name);
    }
    if (Age) {
        filteredUsers = filteredUsers.filter(user => user.Age.toString() === Age);
    }

    res.send(filteredUsers);
});

app.get('/users/ngu', (req, res) => {
    res.send('vao day la ngu');
});

app.get('/users/:id', (req, res) => {
    console.log(req.params);
    const user = users.filter(user => user.id === parseInt(req.params.id));
    res.send(user);
});

app.post('/user', (req, res) => {
    console.log(req.body);
    users.push(req.body);

    fs.writeFile(url, JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error('Error writing to data.json:', err);
            return res.send({ message: 'Internal Server Error' });
        }
        console.log('Write complete');
        res.send(users);
    });
});

app.put('/user/:id', (req, res) => {
    console.log(req.body);
    users.forEach(user => {
        if (user.id == parseInt(req.params.id)) {
            user.name = req.body.name;
            user.Age = req.body.Age;
        }
    });
    fs.writeFile(url, JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error('Error writing to data.json:', err);
            return res.send({ message: 'Internal Server Error' });
        }

        res.send(users);
    });
});

app.delete('/user/:id', (req, res) => {
    users.forEach((user, index) => {
        if (user.id === parseInt(req.params.id)) {
            users.splice(index, 1);
            console.log(`Xóa thành công ID: ${req.params.id}`);
        }
    });
    fs.writeFile(url, JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error('Error writing to data.json:', err);
            return res.send({ message: 'Internal Server Error' });
        }
        res.send(users);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

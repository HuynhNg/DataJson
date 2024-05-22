const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

const users = [
    {
        "id": 1,
        "name": "Nguyễn A",
        "Age": 10
      },
      {
        "id": 2,
        "name": "Nguyễn B",
        "Age":20
      },
      {
        "id": 3,
        "name": "Nguyễn C ",
        "Age": 30
      }
]
app.get('/users', (req, res) => {
    console.log(req.query)
    res.send(users)
})
app.get('/users/ngu', (req, res) => {
    res.send('vao day la ngu')
})
app.get('/users', (req, res) => {
    console.log(req.query)
    const { id, name, Age } = req.query

    let filteredUsers = users

    if (id) {
        filteredUsers = filteredUsers.filter(
            (user) => user.id.toString() === id
        )
    }
    if (name) {
        filteredUsers = filteredUsers.filter((user) => user.name === name)
    }
    if (Age) {
        filteredUsers = filteredUsers.filter(
            (user) => user.Age.toString() === Age
        )
    }

    res.send(filteredUsers)
})
app.get('/users/:id', (req, res) => {
    console.log(req.params)
    const user = users.filter((user) => user.id === parseInt(req.params.id))
    res.send(user)
})
app.use(bodyParser.json())
app.post('/user', (req, res) => {
    console.log(req.body)
    users.push(req.body)
    res.send(users)
})

app.put('/user/:id', (req, res) => {
    console.log(req.body)
    users.forEach((user) => {
        if (user.id == parseInt(req.params.id)) {
            user.name = req.body.name;
            user.Age = req.body.Age;
        }
    })
    res.send(users)
})

app.delete('/user/:id', (req, res) => {
    let x = 0
    users.forEach((user) => {
        if (user.id === parseInt(req.params.id)) {
            users.splice(x, 1)
            console.log(`Xóa thành công ID: ${req.params.id}`)
        }
        x++
    })
    res.send(users)
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

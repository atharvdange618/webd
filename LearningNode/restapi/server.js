const express = require('express')
const app = express()
const port = 8000
const fs = require('fs')

app.use(express.urlencoded({ extended: false }))

const users = require('./MOCK_DATA.json')

//routes
app.get('/', (req, res) => res.send("Home page"))

app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    return res.send(html);
});

app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id)
        return res.json(user);
    })
    .patch((req, res) => {
        //TODO: Edit the user with id
        return res.json({ status: "pending" });
    })
    .delete((req, res) => { })

app.get("/api/users/", (req, res) => {
    return res.json(users)
})

app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", id: users.length });
    });
})

app.patch("/api/users/:id",)

app.listen(port, () => console.log(`Server has started on http://localhost:${port}`))

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.use((req, res, next) => {
    console.log("request received")
    next()
})

app.get('/', (req, res) => {
    console.log("request for home page")
    res.send("hello from server")
    console.log("request completed")
})

app.get("/apple", (req, res) => {
    res.send("thanks for visiting apple path")
})

app.get("/orange", (req, res) => {
    res.send("thanks for visiting orange path")
})

//request parameters
app.get("/:username/:id", (req, res) => {
    let { username, id } = req.params
    res.send(`welcome to the page of ${username} who has the id: ${id}`)
})

//query strings
app.get("/search", (req, res) => {
    let { q } = req.query
    res.send(`search results for query: ${q}`)
})

app.post("/", (req, res) => {
    res.send("you sent a post request to the server")
})

//* is used when user enters a path that does match up with above ones
app.get("*", (req, res) => {
    res.send("this page does not exist")
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
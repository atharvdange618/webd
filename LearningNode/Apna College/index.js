const express = require('express')
const app = express()

app.set("view engine", "ejs")
app.use(express.static("public"))

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
app.get("/:username", (req, res) => {
    let { username } = req.params
    res.render("index", { "username": username })
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
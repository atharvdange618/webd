const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    return res.json({ message: "hey i'm node in a container" });
});

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})
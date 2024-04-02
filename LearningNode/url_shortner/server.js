const express = require('express');
const app = express();
const urlRoute = require("./routes/url");
const { connectToDb } = require('./connect');
const URL = require("./models/url");

const port = 8080;

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId: shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        },
        { new: true } // Added this to return the updated document
    );
    if (entry) {
        res.redirect(entry.redirectURL);
    } else {
        res.status(404).json({ error: "URL not found" });
    }
});

connectToDb("mongodb://localhost:27017/url-shortener")
    .then(() => {
        console.log("Connection established");
    })
    .catch((err) => {
        console.log(err.message);
    });

app.listen(port, () => console.log(`Server started on port ${port}`));

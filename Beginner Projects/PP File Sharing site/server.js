const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const File = require("./models/file");

const upload = multer({ dest: "uploads" })
mongoose.connect(process.env.DATABASE_URL);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index");
})

app.post("/upload", upload.single("file"), async (req, res) => {
    const fileData = {
        path: req.file.path,
        originalName: req.file.originalname
    }
    if (req.body.password != null && req.body.password !== "") {
        fileData.password = await bcrypt.hash(req.body.password, 10)
    }
    const file = await File.create(fileData);
    res.render("index", { fileLink: `${req.headers.origin}/file/${file.id}` });
})

app.route('/file/:id')
    .get(handledownload)
    .post(handledownload);

async function handledownload(req, res) {
    const file = await File.findById(req.params.id)

    if (file && file.password != null) {
        if (req.body.password == null) {
            res.render("password");
            return;
        }

        if (!await bcrypt.compare(req.body.password, file.password)) {
            res.render("password", { error: true })
            return;
        }
    }

    if (!file) {
        return res.status(404).send("File not found");
    }

    file.downloadCount++;
    await file.save();
    console.log(file.downloadCount)
    res.download(file.path, file.originalName);
}

app.listen(process.env.PORT);

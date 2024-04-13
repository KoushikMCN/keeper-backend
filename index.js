import express from "express";
import mongoose from "mongoose";
import env from  "dotenv";
import { Note } from "./models/noteModel.js";
import cors from "cors";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors())

env.config();

app.post('/newnote', async (req, res) => {
    const newnote = new Note({
        title: req.body.title,
        content: req.body.content
    })
    const note = await Note.create(newnote);
    console.log(note);
    res.redirect('http://localhost:3000/');
})

app.get("/notes", async (req, res) => {
    const notes = await Note.find();
    console.log(notes);
    res.send({notes})
})

app.get("/notes/:id", async(req,res) => {
    const note = await Note.findById(req.params.id);
    res.send({note})
})

app.patch("/note/edit/:id", async (req,res) => {
    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    console.log(req.body);
    const note = await Note.findByIdAndUpdate(id,req.body);
    console.log(note);
    res.status(200).send(note);
})

app.delete("/note/delete/:id", async(req,res) => {
    const id = req.params.id;
    await Note.findByIdAndDelete(id);
    res.status(204).send("Deleted")
})

mongoose.connect(process.env.MONGODBURL)
    .then(() => {
        app.listen(4000, () => {
            console.log("http://localhost:4000");
        });
    }
).catch((err) => {
    console.error(`Error connecting to database: ${err.message}`);
});



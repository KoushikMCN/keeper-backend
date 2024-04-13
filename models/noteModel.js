import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: { type: String, required: false },
    content: { type: String, required: true },
}, { timestamps: true }
);

export const Note = mongoose.model('Note', noteSchema);

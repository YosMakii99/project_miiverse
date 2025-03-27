const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const PostSchema = new mongoose.Schema({
    user: String,
    content: String,
    date: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", PostSchema);

// Rutas
app.get("/", (req, res) => res.send("Miiverse Clone API"));

app.post("/posts", async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json({ message: "Post saved!" });
});

app.get("/posts", async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

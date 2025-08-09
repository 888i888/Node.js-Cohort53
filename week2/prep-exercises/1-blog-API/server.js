const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const BLOGS_DIR = __dirname;

app.post("/blogs", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send("Title and content are required");
  }
  const filePath = path.join(BLOGS_DIR, title);
  if (fs.existsSync(filePath)) {
    return res.status(409).send("Post already exists!");
  }
  fs.writeFileSync(filePath, content);
  res.send("ok");
});

app.get("/blogs/:title", (req, res) => {
  const title = req.params.title;
  const filePath = path.join(BLOGS_DIR, title);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("This post does not exist!");
  }
  const content = fs.readFileSync(filePath, "utf-8");
  res.send(content);
});

app.put("/blogs/:title", (req, res) => {
  const title = req.params.title;
  const { content } = req.body;
  if (!content) {
    return res.status(400).send("Content is required");
  }
  const filePath = path.join(BLOGS_DIR, title);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("This post does not exist!");
  }
  fs.writeFileSync(filePath, content);
  res.send("ok");
});

app.delete("/blogs/:title", (req, res) => {
  const title = req.params.title;
  const filePath = path.join(BLOGS_DIR, title);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("This post does not exist!");
  }
  fs.unlinkSync(filePath);
  res.send("ok");
});

app.get("/blogs", (req, res) => {
  const files = fs.readdirSync(BLOGS_DIR);
  const blogs = files
    .filter(
      (file) => file !== path.basename(__filename) && file !== "package.json"
    )
    .map((file) => ({ title: file }));
  res.json(blogs);
});

app.listen(3000, () => {
  console.log("Blog API running on http://localhost:3000");
});

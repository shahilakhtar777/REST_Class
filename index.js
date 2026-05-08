

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "Shahil",
    content: "I love coding!",
  },
  {
    id: uuidv4(),
    username: "Faisal",
    content: "I got selected for my 1st internship!",
  },
    {
    id: uuidv4(),
    username: "Faisal",
    content: "I got selected for my 1st internship!",
  },
  {
    id: uuidv4(),
    username: "Rasid darling",
    content: "Server working well!",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;

  let id = uuidv4();

  posts.push({
    id: uuidv4(),
    username,
    content,
  });

  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id",(req,res)=>{
    let{id}= req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.send("patch request Working..!")
});

app.listen(port, () => {
  console.log("Server working on port 8080");
});
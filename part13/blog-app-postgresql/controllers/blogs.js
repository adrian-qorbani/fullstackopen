const express = require("express");
// const Blog = require("../models/blog");
const { Blog } = require("../models");
const router = express.Router();

// GET all blogs
router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  console.log(JSON.stringify(blogs, null, 2));
  res.json(blogs);
});

// CREATE a blog
router.post("/", async (req, res) => {
  const blog = await Blog.create(req.body);
  return res.json(blog);
});

// GET single blog
router.get("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    console.log("BLOG:", blog.toJSON());
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

// DELETE a blog
router.delete("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    await blog.destroy();
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

// UPDATE Blog likes
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { likes } = req.body;

  const blog = await Blog.findByPk(id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found." });
  }

  await blog.update({ likes });

  return res.json(blog);
});

module.exports = router;

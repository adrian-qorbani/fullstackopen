const express = require("express");
const Blog = require("./blog");

const router = express.Router();

// GET ALL Blogs
router.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    console.log(JSON.stringify(notes, null, 2));
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE A Blog
router.post("/api/blogs", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// GET single blog
router.get("/api/blogs/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    console.log("BLOG:", blog.toJSON());
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

// DELETE a blog
router.delete("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
      await blog.destroy();
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

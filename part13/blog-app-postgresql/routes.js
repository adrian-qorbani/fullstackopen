const express = require("express");
const Blog = require("./blog");

const router = express.Router();

// GET ALL Blogs
router.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.findAll();
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

module.exports = router;
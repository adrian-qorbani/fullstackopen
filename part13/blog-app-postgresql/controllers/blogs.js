const express = require("express");
// const Blog = require("../models/blog");
const { Blog, User } = require("../models");
const router = express.Router();

// TEMP: MIDDLEWAREs (will move to its own module soon)
const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};



// GET all blogs
router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  })
  res.json(blogs)
})
// CREATE a blog
router.post("/", tokenExtractor, async (req, res) => {
  // const blog = await Blog.create(req.body);
  // return res.json(blog);
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
    date: new Date(),
  });
  res.json(blog);
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

const express = require("express");
const { Blog, User } = require("../models");
const router = express.Router();

router.post('/api/readinglists', async (req, res) => {
    try {
      const { blogId, userId } = req.body;
  
      // Check if the user and blog exist
      const user = await User.findByPk(userId);
      const blog = await Blog.findByPk(blogId);
  
      if (!user || !blog) {
        return res.status(404).json({ message: 'User or blog not found' });
      }
  
      // Add blog to the user's reading list
      await user.addBlog(blog);
  
      return res.status(200).json({ message: 'Blog added to reading list' });
    } catch (error) {
      console.error('Error adding blog to reading list:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  module.exports = router;

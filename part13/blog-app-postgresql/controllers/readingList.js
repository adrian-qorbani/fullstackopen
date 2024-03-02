const express = require("express");
const { Blog, User, ReadingList } = require("../models");
const router = express.Router();

router.post('/api/readinglists', async (req, res) => {
    try {
      const { blogId, userId } = req.body;
  
      const user = await User.findByPk(userId);
      const blog = await Blog.findByPk(blogId);
  
      if (!user || !blog) {
        return res.status(404).json({ message: 'User or blog not found' });
      }
  
      await user.addBlog(blog);
  
      return res.status(200).json({ message: 'Blog added to reading list' });
    } catch (error) {
      console.error('Error adding blog to reading list:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const readingListId = req.params.id;
      const { read } = req.body;
  
      const readingListEntry = await ReadingList.findByPk(readingListId);
  
      if (!readingListEntry) {
        return res.status(404).json({ message: 'Reading list entry not found' });
      }
  
      readingListEntry.unread = !read; 
      await readingListEntry.save();
  
      res.status(200).json({ message: 'Reading list entry updated successfully' });
    } catch (error) {
      console.error('Error updating reading list entry:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  module.exports = router;

#!/usr/bin/env node
const Blog = require('./blog');
const sequelize = require('./db')

async function printBlogs() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const blogs = await Blog.findAll();

    blogs.forEach(blog => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
    });

    await sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

printBlogs();
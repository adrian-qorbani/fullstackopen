const Blog = require("./blog");
const User = require("./user");
const UserBlogs = require('./user_blogs')

// Blog.sync();
// User.sync();

User.hasMany(Blog)
Blog.belongsTo(User)
// Blog.sync({ alter: true })
// User.sync({ alter: true })

User.belongsToMany(Blog, { through: UserBlogs, as: 'marked_blogs' })
Blog.belongsToMany(User, { through: UserBlogs, as: 'users_marked' })

module.exports = {
  Blog,
  User,
};

const Blog = require("./blog");
const User = require("./user");

Note.sync();
User.sync();

module.exports = {
  Blog,
  User,
};

const Note = require("./blog");
const User = require("./user");

Note.sync();
User.sync();

module.exports = {
  Note,
  User,
};

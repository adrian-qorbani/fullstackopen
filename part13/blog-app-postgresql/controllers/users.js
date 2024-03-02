const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { User, Blog, ReadingList } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { read } = req.query;

    const includeObj = {
      model: ReadingList,
      include: [{
        model: Blog,
      }]
    };

    if (read !== undefined) {
      includeObj.where = { unread: read === 'true' ? false : true };
    }

    const user = await User.findByPk(userId, { include: [includeObj] });

    if (user) {
      const transformedReadingList = user.reading_lists.map(item => ({
        id: item.id,
        unread: item.unread,
        blog: {
          id: item.blog.id,
          title: item.blog.title,
        }
      }));

      res.json({
        id: user.id,
        username: user.username,
        reading_list: transformedReadingList
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user and reading list:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect = body.password === "secret";

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  if (user.disabled) {
    return response.status(401).json({
      error: "account disabled, please contact admin",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user.admin) {
    return res.status(401).json({ error: "operation not allowed" });
  }
  next();
};

router.put("/:username", tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (user) {
    user.disabled = req.body.disabled;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

module.exports = router;

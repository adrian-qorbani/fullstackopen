const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Note,
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
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!passwordCorrect) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);

  res.json({ token });
});

module.exports = router;

const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require("../redis")

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const count = Number((await redis.getAsync("todoCount")) || "0")
  await redis.setAsync("todoCount", count + 1)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  if (!req.todo) {
    return res.sendStatus(404);
  }
  res.json(req.todo);});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body;
  // Ensure that both text and done fields are provided
  if (!text || !done) {
    return res.status(400).json({ error: 'Text and done fields are required' });
  }

  try {
    if (!req.todo || !req.todo._id) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    req.todo.text = text;
    req.todo.done = done;

    const updatedTodo = await req.todo.save();

    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;

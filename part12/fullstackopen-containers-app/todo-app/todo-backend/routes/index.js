const express = require('express');
const router = express.Router();
const redis = require('../redis')
const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

/* GET todos listing. */
// router.get('/', async (_, res) => {
//   const value = await redis.getAsync("added_todos");
//   res.json({
//       added_todos: Number(value) || 0
//   });
// });

router.get("/statistics", async (_, res) => {
  console.log('1', await redis.getAsync("todoCount"))
  const count = Number((await redis.getAsync("todoCount")) || "0")

  res.send({
    added_todos: count,
  })
})

module.exports = router;

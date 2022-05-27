const express = require("express");
const router = express.Router();
const uuid = require("uuid");

let tasks = [
  { title: "Hacer la tarea", isCompleted: false, id: uuid.v4() },
  { title: "Pasear al perruki", isCompleted: false, id: uuid.v4() },
];

router.get("/", (req, res) => {
  res.json(tasks);
});

router.get("/:id", (req, res) => {
  const found = tasks.some((task) => task.id === req.params.id);
  if (found) {
    res.json(tasks.filter((task) => task.id === req.params.id));
  } else {
    res
      .status(400)
      .json({ message: `Task with id: ${req.params.id} not found` });
  }
});

router.post("/", (req, res) => {
  if (req.body.title) {
    const { title } = req.body;
    tasks.push({ title, isCompleted: false, id: uuid.v4() });
    res.json({ msg: "Task successfully added", tasks });
  } else {
    res.status(400).json({ msg: "Failed to create task" });
  }
});

router.put("/:id/changestatus", (req, res) => {
  const found = tasks.some((task) => task.id === req.params.id);
  if (found) {
    tasks.forEach((task) => {
      if (task.id === req.params.id) {
        task.isCompleted = !task.isCompleted;
      }
    });
    res.json(tasks);
  } else {
    res.status(400).json({ msg: `Task with id: ${req.params.id} not found` });
  }
});

router.delete("/:id", (req, res) => {
  const found = tasks.some((task) => task.id === req.params.id);
  if (found) {
    tasks = tasks.filter((task) => task.id !== req.params.id);
    res.json({ message: "Task successfully deleted", tasks: tasks });
  } else {
    res.status(400).json({
      message: `Task with id: ${req.params.id} couldn't be deleted because it doesn't exist`,
    });
  }
});

module.exports = router;

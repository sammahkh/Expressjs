const express = require("express");
const app = express();
const port = 3000;

const listOfTodos = [
  {
    id: 1,
    title: "Buy groceries",
    description: "Get milk, eggs, bread, and cheese",
    completed: false,
  },
  {
    id: 2,
    title: "Finish project",
    description: "Complete the coding and testing for the project",
    completed: false,
  },
  {
    id: 3,
    title: "Clean the house",
    description: "Vacuum, dust, and tidy up the living room and bedrooms",
    completed: true,
  },
];

app.use("/static", express.static("public"));
app.use(express.json());

app.get("/todos", (req, res) => {
  res.status(200).send(listOfTodos);
});

app.delete("/todo", (req, res) => {
  if (listOfTodos.length > 0) {
    const randomIndex = Math.floor(Math.random() * listOfTodos.length);
    const deletedItem = listOfTodos.splice(randomIndex, 1)[0];
    res.status(204).send(deletedItem.title);
  } else {
    res.status(422).send("No objects are available for deletion");
  }
});


const validateId = (req, res, next) => {
  const todoId = parseInt(req.params.id);
  const todo = listOfTodos.find((todo) => todo.id === todoId);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  req.todo = todo;
  next();
};

const validateTitleAndDesc = (req, res, next) => {
  const { title, description } = req.body;

  if (title === "" || !description === "") {
    return res
      .status(400)
      .json({ error: "Task title and description cannot be empty" });
  }

  next();
};

app.get("/todos/:id", validateId, (req, res) => {
  res.status(200).send(req.todo);
});

app.delete("/todos/:id", validateId, (req, res) => {
  listOfTodos.splice(listOfTodos.indexOf(req.todo), 1);
  res.status(204).send(req.todo);
});

app.post("/todos", validateTitleAndDesc, (req, res) => {
  const { title, description, completed } = req.body;
  const newTodo = {
    id: listOfTodos.length + 1,
    title: title,
    description: description,
    completed: completed,
  };
  listOfTodos.push(newTodo);
  res.status(201).send(newTodo);
});

app.put("/todos/:id", validateId, (req, res) => {
  const { title, description, completed } = req.body;
  req.todo.title = title;
  req.todo.description = description;
  req.todo.completed = completed;
  res.status(200).send(req.todo);
});

app.listen(port, () => {
  console.log({port});
});
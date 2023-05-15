const express = require('express')
const app = express()
const port = 3000

const lisOfTodos = [
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

  app.use(express.json());
  app.use(express.static('public'));

app.get('/lisOfTodos', (req, res) => {
  res.status(200).send(lisOfTodos)
})

app.delete('/', (req, res) => {
    if (lisOfTodos.length!=0){
     const randomItem = Math.floor(Math.random() * 3);
     const deletedIem = lisOfTodos.splice(randomItem, 1);
     res.status(204).send(`deleted item is  ${deletedIem}`)

    }
    else
    res.status(422).send("no objects are available for deletion.")
  })

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
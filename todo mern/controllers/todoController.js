import Todo from "../modles/todoModel.js";

export const addTodo = async (req, res) => {
  const todo = req.body;
  try {
    await Todo.insertOne(todo);
    res.redirect("/todos");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "falied Add Request" });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(201).json(todos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "falied fetch request" });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Todo.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "falied delete request" });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const updateTodobody = req.body;
  try {
    const result = await Todo.findByIdAndUpdate(id, updateTodobody);
    if (result.modifiedCount == 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "falied delete request" });
  }
};

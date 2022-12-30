class todoApi {
  todos = [
    {
      id: 1,
      status: 0,
      name: "Learn JS",
    },

    {
      id: 2,
      status: 1,
      name: "Learn JSx",
    },

    {
      id: 3,
      status: 2,
      name: "Học JS",
    },
  ];
  get(id = false) {
    if (!id) {
      return this.todos;
    }
    return this.todos.find((item) => item.id === id);
  }
  save(todo) {
    if (todo.id === undefined) {
      const ids = this.todos.map((todo) => todo.id);
      const lastestID = Math.max(...ids);
      //add id to obj todo
      todo = {
        ...todo,
        id: lastestID + 1,
      };
      this.todos.push(todo);
      return todo;
    } else {
        //find id
        this.todos = this.todos.map((oldTodo) => oldTodo.id === todo.id ? todo : oldTodo);
        return todo;
    }
  }
  delete(id){
    const newTodos = this.todos.filter((oldTodo) =>oldTodo.id !== id );
    this.todos = newTodos;
    return true;
  }
}
export default new todoApi();

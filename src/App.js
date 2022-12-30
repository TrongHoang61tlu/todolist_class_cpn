import { Component } from "react";
import todoApi from "./api/todoApi";
import "./App.css";
import Form from "./components/Form";
import List from "./components/Lists";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSaveTodo = this.handleSaveTodo.bind(this);
    this.handlePrepareEdit = this.handlePrepareEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  initTodo = { id: undefined, name: "", status: undefined };
  state = {
    todos: [this.initTodo],
    todo: this.initTodo,
  };

  renderData(todo) {
    const response = todoApi.get();
    this.setState({
      ...this.state,
      todos: response,
      todo: todo ? todo : this.state.todo,
    });
  }

  componentDidMount() {
    this.renderData();
  }

  handleSaveTodo(todo) {
    let oldTodo = this.state.todo;
    todoApi.save({ ...todo, status: todo.status ?? 0 });
    if(todo.id === undefined) {
      todo = {...this.initTodo};
    }else if (oldTodo.status !== todo.status){
      todo = {...this.initTodo}
    }
    //render
    this.renderData({ ...this.initTodo });
  }

  handlePrepareEdit(todo) {
    this.setState({
      ...this.state,
      todo: todo,
    });
  }
  handleDelete(id){
    todoApi.delete(id);
    this.renderData();
  }
  render() {
    // console.log(this.state.todos);

    return (
      <div className="App">
        <div className="title">
          <h1>Todo List</h1>
        </div>
        <div className="todo-list">
          <Form 
            handleSaveTodo={this.handleSaveTodo} 
            todo={this.state.todo} 
            check = {Math.random()}
          />
          <List
            todos={this.state.todos}
            handlePrepareEdit={this.handlePrepareEdit}
            handleDelete={this.handleDelete}
            handleSaveTodo={this.handleSaveTodo}
          />
        </div>
      </div>
    );
  }
}

export default App;

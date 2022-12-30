import { Component } from "react";
import status from "../../constants/status";
import Item from "./Item";

class List extends Component {
  constructor(props) {
    super(props);
    this.handleShowContextMenu = this.handleShowContextMenu.bind(this);
  }
  state = {
    top: 0,
    left: 0,
    visibility: "hidden",
    todo: {
      id: undefined,
      status: undefined,
      name: "",
    },
  };
  handleShowContextMenu(e, todo) {
    this.setState({
      top: e.clientY,
      left: e.clientX,
      visibility: "visible",
      todo: {
        ...this.state.todo,
        ...todo,
      },
    });
  }

  hanldCloseContexMenu() {
    this.setState({
      ...this.state,
      visibility: "hidden",
      todo: {
        id: undefined,
        status: undefined,
        name: "",
      },
    });
  }

  handleSaveStatusTodo(status) {
    this.setState({
      ...this.state,
      visibility: " hidden",
    });
    this.props.handleSaveTodo({
      ...this.state.todo,
      status: status,
    });
  }
  render() {
    const { todos } = this.props;
    return (
      <>
        <ul>
          {todos.map((todo, key) => {
            return (
              <Item
                todo={todo}
                key={key}
                handlePrepareEdit={this.props.handlePrepareEdit}
                handleDelete={this.props.handleDelete}
                handleShowContextMenu={this.handleShowContextMenu}
              />
            );
          })}
        </ul>

        <div
          className={`status-context-cover ${this.state.visibility} `}
          onClick={(e) => this.hanldCloseContexMenu()}
        ></div>

        <div
          className={`status-context-menu ${this.state.visibility} `}
          style={{
            top: `${this.state.top}px`,
            left: `${this.state.left}px`,
            transform: `${
              window.innerHeight - this.state.top <= 150
                ? "translateY(-100%)"
                : ""
            }`,
          }}
        >
          <button
            onClick={(e) => this.handleSaveStatusTodo(status.TODO)}
            className={`todo-status todo`}
          >
            Todo
          </button>
          <button
            onClick={(e) => this.handleSaveStatusTodo(status.PROCESS)}
            className={`todo-status process`}
          >
            Procepssing
          </button>
          <button
            onClick={(e) => this.handleSaveStatusTodo(status.COMPLETED)}
            className={`todo-status completed`}
          >
            Completed
          </button>
        </div>
      </>
    );
  }
}

export default List;

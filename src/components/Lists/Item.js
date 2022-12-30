import { Component } from "react";
import status from "../../constants/status";

class Item extends Component {

  render() {
    const { todo } = this.props;
    return (
      <li className="todo-item">
        <div className="todo-content">{todo.name}</div>
        <div className={`todo-status ${status.getClass(todo.status)}`}
          onClick={(e)=> this.props.handleShowContextMenu(e, todo)}
        >
          {status.getDisplayName(todo.status)}
        </div>
        <div className="todo-action">
          <button
            onClick={(e) => this.props.handlePrepareEdit(todo)}
            className="todo-edit"
          >
            Edit
          </button>
          <button
            onClick={(e) => this.props.handleDelete(todo.id)}
            className="todo-delete"
          >
            Delete
          </button>
        </div>
      </li>
    );
  }
}

export default Item;

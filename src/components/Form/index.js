import { Component } from "react";

class Form extends Component {
  state = {
    id: undefined,
    name: "",
    status: 0,
  };
  handleChange(e) {
    this.setState({
      ...this.state,
      name: e.target.value,
    });
  }
  componentDidUpdate(preveProps, preState) {
    if (preveProps.check !== this.props.check) {
      this.setState({
        ...this.state,
        id: this.props.todo.id,
        name: this.props.todo.name,
        status: this.props.todo.status,
      });
    }
  }

  handleChangeFormToSave(){
    this.setState({
      id: undefined,
      name: '',
      status: 0
    })
  }
  render() {
    return (
      <div className="todo-form">
        {this.state.id && (
          <button
            className="edit-tag"
            onClick={()=> this.handleChangeFormToSave()}
          >
            EDIT : {this.props.todo.name}
          </button>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.props.handleSaveTodo(this.state);
          }}
        >
          <input
            type="text"
            placeholder=" "
            name="name"
            onChange={(e) => this.handleChange(e)}
            value={this.state.name}
          />
          <button className="todo-save" placeholder="Input todo" type="submit">
            SAVE
          </button>
        </form>
      </div>
    );
  }
}

export default Form;

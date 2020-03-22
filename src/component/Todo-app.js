import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

export class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTodo: "",
      todoItems: [],
      id: uuidv4()
    };
  }

  addtodo = e => {
    if (this.state.newTodo === "") {
      return null;
    }

    let items = {
      id: this.state.id,
      title: this.state.newTodo
    };
    let updated = [items, ...this.state.todoItems];

    this.setState({
      todoItems: updated,
      id: uuidv4(),
      newTodo: ""
    });
  };

  changeHandler = e => {
    this.setState({
      newTodo: e.target.value.trim()
    });
  };

  deleteHandler = item => {
    let filterdItems = this.state.todoItems.filter(x => x.id !== item);
    this.setState({
      todoItems: filterdItems
    });
  };

  editHandler = item => {
    let filterItem = this.state.todoItems.filter(x => x.id === item);
    let filterdItems = this.state.todoItems.filter(x => x.id !== item);
    this.setState({
      todoItems: filterdItems,
      newTodo: filterItem[0].title,
      id: filterItem[0].id
    });
  };

  clearHandler = () => {
    this.setState({
      todoItems: []
    });
  };

  render() {
    return (
      <div className="app-wrapper">
        <div className="todo-container d-flex-column">
          <h3 className="text-courgette text-center">Tasker App</h3>
          <div className="todo-wrapper">
            <div className="todo-input-wrapper d-flex-between">
              <input
                type="text"
                value={this.state.newTodo}
                onChange={this.changeHandler}
                placeholder="Enter Activity"
                className="task-input"
              />
              <button className="btn-circle bg-teal" onClick={this.addtodo}>
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <div className="todo-output-wrapper">
              <h4 className="todo-title text-left text-courgette">
                Activities
              </h4>
              {/* for loop item */}
              {this.state.todoItems.map(item => {
                return (
                  <div className="task d-flex" key={item.id}>
                    <div className="task-note">{item.title} </div>
                    <i
                      className="fas fa-pen-fancy edit"
                      onClick={() => {
                        this.editHandler(item.id);
                      }}
                    ></i>
                    <i
                      className="fas fa-trash-alt thrash"
                      onClick={() => {
                        this.deleteHandler(item.id);
                      }}
                    ></i>
                  </div>
                );
              })}
              {/* end of loop */}
              <button className="btn-teal" onClick={this.clearHandler}>
                Clear Activities
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;

import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    todos: [],
    todo: ""
  };

  saveToState = e => {
    //set the state of todo on every input change and set default value of done: false
    this.setState({
      todo: {
        task: e.target.value,
        done: false
      }
    });
  };

  // when a todo is complete
  onComplete = _todo => {
    // 1. fetch all todos
    let todos = this.state.todos;
    // 2. look for the specific todo
    todos.filter(todo => {
      if (todo.task.includes(_todo)) {
        // 3. change done from false to true
        todo.done = !todo.done;
        return;
      }
    });

    // update state of todos
    this.setState({
      todos
    });
  };

  render() {
    const { todo, todos } = this.state;

    return (
      <div className="App">
        <h2>Add Todo</h2>
        <div className="todo-form">
          <form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              todos.push(todo);
              this.setState({ todo: { task: "", done: false } });
            }}
          >
            <fieldset>
              <label htmlFor="todo">
                Todo
                <input
                  type="text"
                  name="todo"
                  placeholder="Enter Todo"
                  value={todo.task}
                  onChange={this.saveToState}
                />
              </label>

              <button type="submit">Add Todo</button>
            </fieldset>
          </form>
        </div>
        <div>
          <h2>Wangu's Todos</h2>
          <div>
            <ul>
              {todos.map(_todo => (
                <li className="todoTask">
                  <label className="task-label">
                    <input
                      type="checkbox"
                      className="form-check"
                      onChange={() => this.onComplete(_todo.task)}
                    />
                    {/* check if the task is done or not, if done strike through */}
                    {_todo.done ? (
                      <strike>{_todo.task}</strike>
                    ) : (
                      <p>{_todo.task}</p>
                    )}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

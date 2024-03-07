import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newStatus, setNewStatus] = useState("Created");
  const [newDeadline, setNewDeadline] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3001/getTodoList")
      .then((response) => {
        setTodoList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const completeTodo = (e, id) => {
    e.preventDefault();
    console.log("complete todo with id:", id);
    axios
      .post("http://localhost:3001/updateTodoList/" + id, {
        status: "Completed",
      })
      .then((response) => {
        console.log(response.data);
        setTodoList(
          todoList.map((val) => {
            return val._id === id ? { ...val, status: "Completed" } : val;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTask = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/addTodoList", {
        task: newTask,
        status: newStatus,
        deadline: newDeadline,
      })
      .then((response) => {
        console.log(response.data);
        setTodoList([
          ...todoList,
          { task: newTask, status: newStatus, deadline: newDeadline },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-7">
          <h2 className="text-container">Todo List</h2>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Deadline</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {todoList &&
                  todoList.map((val) => {
                    return (
                      <tr>
                        <td>{val.task}</td>
                        <td>{val.status}</td>
                        <td>{new Date(val.deadline).toLocaleString()}</td>
                        <td>
                          {val.status === "Completed" ? (
                            "✅"
                          ) : (
                            <button
                              onClick={(e) => completeTodo(e, val._id)}
                              className="btn btn-success m-2"
                            >
                              done
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-5">
          <h2 className="text-center">Add Todo</h2>
          <form className="bg-light p-4">
            <div className="mb-3">
              <label>Task</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Task"
                onChange={(e) => setNewTask(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Status</label>
              <select
                className="form-control"
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="Created">Created</option>
                <option value="In Progress">In progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Deadline</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => setNewDeadline(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button onClick={addTask} className="btn btn-success btn-block ">
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Todo;

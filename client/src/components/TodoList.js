import React, { useEffect, useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/todo')
      .then(response => response.json())
      .then(data => {
        setTodos(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <h3>{todo.title}</h3>
            <p>{todo.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;



import * as React from "react";
import { observer } from "mobx-react-lite";
import { makeObservable, observable, computed, action } from "mobx";
import { List } from "antd";
class Todo {
  id = Math.random();
  title = "";
  finished = false;

  constructor(title) {
    makeObservable(this, {
      title: observable,
      finished: observable,
      toggle: action,
    });
    this.title = title;
  }

  toggle() {
    this.finished = !this.finished;
  }
}

class TodoList {
  todos = [];
  get unfinishedTodoCount() {
    return this.todos.filter((todo) => !todo.finished).length;
  }
  constructor(todos) {
    makeObservable(this, {
      todos: observable,
      unfinishedTodoCount: computed,
    });
    this.todos = todos;
  }
}

const TodoListView = observer(({ todoList }) => (
  <div>
    <List
     size="small"
      header={<div>TodoList</div>}
      footer={<div> Tasks left: {todoList.unfinishedTodoCount}</div>}
      bordered
      dataSource={todoList.todos}
      renderItem={(todo) => (
        <List.Item>
          <TodoView todo={todo} key={todo.id} />
        </List.Item>
      )}
    />

  </div>
));

const TodoView = observer(({ todo }) => (
  <div>
    <input
      type="checkbox"
      checked={todo.finished}
      onClick={() => todo.toggle()}
    />
    {todo.title}
  </div>
));

const store = new TodoList([
  new Todo("Get Coffee"),
  new Todo("Write simpler code"),
]);
const TodoApp = () => <TodoListView todoList={store} />;
export default TodoApp;

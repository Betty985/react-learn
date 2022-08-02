import React from "react";
import { makeObservable,observable,action,computed, autorun} from "mobx";
import {observer} from 'mobx-react-lite'
class Todo{
    id=Math.random()
    title:string=""
    finished:boolean=false
    constructor(title:string){
        makeObservable(this,{
            title :observable,
            finished:observable,
            toggle :action 
        })
        this.title=title
    }
    toggle(){
        this.finished=!this.finished
    }
}
class TodoList{
    todos=[]
    get unfinishedTodoCount(){
        return this.todos.filter(todo=>!todo.finished).length
    }
    constructor(todos:Array<Todo>){
        makeObservable(this,{
            todos:observable,
            unfinishedTodoCount:computed
        })
        autorun(()=>{
            console.log('Task left:'+todos.unfinishedTodoCount)
        })
        this.todos=todos
    }
}
const TodoListView=observer(({todoList})=>(
    <div>
        <ul>
            {todoList.todos.map(todo=>(
                <TodoView todo={todo} key={todo.id}/>
            ))}
        </ul>
        Tasks left:{todoList.unfinishedTodoCount}
    </div>
))
const TodoView=observable(({todo:Todo})=>{
    <li>
        <input type="checkbox" checked={todo.finished} onClick={()=>todo.toggle()}/>
        {todo.title}
    </li>
})
const store=new TodoList([new Todo('Get Coffee'),new Todo("Write simpler code")])
const TodoApp=<TodoListView todoList={store}/>
export default TodoApp
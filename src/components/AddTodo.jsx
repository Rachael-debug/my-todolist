import { useEffect, useState } from "react";

import CheckList from "./Checklist";
import TodoInput from "./TodoInput"
import Option from "./Option"

export default function AddTodo(){
    const [todoList, setTodoList] = useState([])
    // const [selectedOption, setSelectedOption] = useState('P1 - Urgent & Important');

    // const handleChange = (event) => {
    //     setSelectedOption(event.target.value);
    //     // console.log(event.target.value)
    // };

    function handleSubmit(event) {
        event.preventDefault();
        
        let taskTitle = event.target[0].value;
        let taskPriority = event.target[1].value;
        let taskDueDate = event.target[2].value;

        setTodoList((prevTodos) => [
            { 
              taskTitle, 
              taskPriority, 
              taskDueDate,
              is_completed: false
            },
            ...prevTodos
        ]);

        event.target.reset();
    }

    useEffect(() => {
        console.log(todoList);
    }, [todoList]);

    // useEffect(() => {
    //     const storedPreferences = localStorage.getItem("userPreferences");
    //     if (storedPreferences) {
    //     setSelectedGenres(JSON.parse(storedPreferences));
    //     }
    // }, [])

    
    return(
        <div>
            <ol>
                {todoList && todoList.length > 0 ? (
                    todoList?.map((item, index) => (
                    <CheckList key={index} taskAdded={item.taskTitle} taskPriority={item.taskPriority} taskDue={item.taskDueDate}/>
                    ))
                ) : (
                    <p>Seems lonely in here, what are you up to?</p>
                )}
            </ol>
            <button>Add a Task</button>
            <div>
                <form onSubmit={handleSubmit}>
                    <TodoInput name="addTask" type="text" label="Task" required/>
                    <label htmlFor="priority">Priority</label>
                    <select name="priority" id="priority">
                        <Option value="P1 - Urgent & Important"/>
                        <Option value="P2 - Not Urgent but Important"/>
                        <Option value="P3 - Urgent but Not Important"/>
                        <Option value="P4 - Neither Urgent nor Important"/>
                    </select>
                    <TodoInput name="dueDate" type="date" label="Due Date"/>
                    <TodoInput type="submit" />
                </form>
            </div>
        </div>
    )
}
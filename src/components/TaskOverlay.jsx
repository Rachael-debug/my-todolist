import Option from "./Option";
import TodoInput from "./TodoInput";

export default function TaskOverlay({handleSubmit, cancelCreateTask}){
    return(
        <div className="createTasksWrapper">
            <i className="fa-solid fa-square-xmark close" onClick={cancelCreateTask}></i>
            <h2>Add Tasks</h2>
            <form className="createTasks" onSubmit={handleSubmit}>
                <TodoInput name="addTask" type="text" label="Task" required/>
                <label htmlFor="priority">Priority</label><br/>
                <select name="priority" id="priority">
                    <Option value="P1 - Urgent & Important"/>
                    <Option value="P2 - Not Urgent but Important"/>
                    <Option value="P3 - Urgent but Not Important"/>
                    <Option value="P4 - Neither Urgent nor Important"/>
                </select>
                <TodoInput name="dueDate" type="date" label="Due Date" required/>
                <TodoInput type="submit" name="submit" value="Create Task"/>
            </form>
        </div>
    )
}